package com.islamicai.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.islamicai.app.data.ApiClient
import com.islamicai.app.data.ChatRequest
import com.islamicai.app.ui.theme.*
import kotlinx.coroutines.launch

data class Message(val role: String, val content: String)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen() {
    var messages by remember { mutableStateOf(listOf<Message>()) }
    var input by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()

    LaunchedEffect(messages.size) {
        if (messages.isNotEmpty()) {
            listState.animateScrollToItem(messages.size - 1)
        }
    }

    Column(modifier = Modifier.fillMaxSize().background(Green50)) {
        // Header
        TopAppBar(
            title = {
                Column {
                    Text("Chat AI Keislaman", fontWeight = FontWeight.Bold, color = Green800)
                    Text("Tanya tentang Qur'an & Hadits", fontSize = 12.sp, color = Gray500)
                }
            },
            actions = {
                if (messages.isNotEmpty()) {
                    IconButton(onClick = { messages = emptyList() }) {
                        Icon(Icons.Default.Delete, "Hapus", tint = Red500)
                    }
                }
            },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = White)
        )

        // Messages
        if (messages.isEmpty()) {
            Box(modifier = Modifier.weight(1f), contentAlignment = Alignment.Center) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("\uD83D\uDD4C", fontSize = 48.sp)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Assalamu'alaikum Wr. Wb.", fontWeight = FontWeight.Medium, color = Gray500)
                    Text("Silakan ajukan pertanyaan Anda", fontSize = 13.sp, color = Gray400)
                }
            }
        } else {
            LazyColumn(
                state = listState,
                modifier = Modifier.weight(1f).padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                contentPadding = PaddingValues(vertical = 16.dp)
            ) {
                items(messages) { msg ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = if (msg.role == "user") Arrangement.End else Arrangement.Start
                    ) {
                        Box(
                            modifier = Modifier
                                .widthIn(max = 280.dp)
                                .clip(RoundedCornerShape(16.dp))
                                .background(if (msg.role == "user") Green500 else White)
                                .padding(12.dp)
                        ) {
                            Text(
                                msg.content,
                                color = if (msg.role == "user") White else Gray800,
                                fontSize = 14.sp,
                                lineHeight = 20.sp
                            )
                        }
                    }
                }
            }
        }

        // Loading
        if (loading) {
            Row(
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                CircularProgressIndicator(modifier = Modifier.size(16.dp), strokeWidth = 2.dp, color = Green500)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Berpikir...", fontSize = 13.sp, color = Gray500)
            }
        }

        // Input
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(White)
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = input,
                onValueChange = { input = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text("Ketik pertanyaan...") },
                shape = RoundedCornerShape(20.dp),
                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = Green500),
                maxLines = 3
            )
            Spacer(modifier = Modifier.width(8.dp))
            FilledIconButton(
                onClick = {
                    if (input.isNotBlank() && !loading) {
                        val userMsg = Message("user", input.trim())
                        messages = messages + userMsg
                        val query = input.trim()
                        input = ""
                        loading = true
                        scope.launch {
                            try {
                                val response = ApiClient.api.chat(ChatRequest(query))
                                messages = messages + Message("assistant", response.response)
                            } catch (e: Exception) {
                                messages = messages + Message("assistant", "Error: ${e.message}")
                            }
                            loading = false
                        }
                    }
                },
                enabled = input.isNotBlank() && !loading,
                colors = IconButtonDefaults.filledIconButtonColors(containerColor = Green500)
            ) {
                Icon(Icons.AutoMirrored.Filled.Send, "Kirim", tint = White)
            }
        }
    }
}
