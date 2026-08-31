package com.islamicai.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.islamicai.app.data.ApiClient
import com.islamicai.app.data.IslamicData
import com.islamicai.app.data.QuranVerseRequest
import com.islamicai.app.data.QuranVerseResponse
import com.islamicai.app.ui.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuranScreen() {
    var surah by remember { mutableIntStateOf(1) }
    var ayat by remember { mutableStateOf("1") }
    var result by remember { mutableStateOf<QuranVerseResponse?>(null) }
    var loading by remember { mutableStateOf(false) }
    var showPicker by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    val selectedSurah = IslamicData.surahList.find { it.num == surah }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Green50)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text("Cari Ayat Al-Qur'an", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Green800)
        Text("Pilih surah dan nomor ayat", fontSize = 13.sp, color = Gray500)
        Spacer(modifier = Modifier.height(16.dp))

        // Form Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = White),
            elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Surah", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Gray700)
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = selectedSurah?.let { "${it.num}. ${it.name}" } ?: "",
                    onValueChange = {},
                    modifier = Modifier.fillMaxWidth().clickable { showPicker = true },
                    enabled = false,
                    shape = RoundedCornerShape(12.dp)
                )
                Spacer(modifier = Modifier.height(12.dp))

                Text("Nomor Ayat", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Gray700)
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = ayat,
                    onValueChange = { ayat = it },
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    shape = RoundedCornerShape(12.dp)
                )
                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = {
                        loading = true
                        result = null
                        scope.launch {
                            try {
                                result = ApiClient.api.getQuranVerse(QuranVerseRequest(surah, ayat.toIntOrNull() ?: 1))
                            } catch (e: Exception) {
                                result = QuranVerseResponse("error", "", 0, 0, "", "", "Error: ${e.message}")
                            }
                            loading = false
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = Green500),
                    shape = RoundedCornerShape(12.dp),
                    enabled = !loading
                ) {
                    if (loading) CircularProgressIndicator(modifier = Modifier.size(20.dp), color = White, strokeWidth = 2.dp)
                    else Text("Cari Ayat", fontWeight = FontWeight.SemiBold)
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Result
        result?.let { res ->
            if (res.status == "success") {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
                ) {
                    Column(modifier = Modifier.padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Surface(
                            shape = RoundedCornerShape(20.dp),
                            color = Green100
                        ) {
                            Text(
                                "${res.surah} (${res.nomor_surah}:${res.nomor_ayat})",
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                                fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Green800
                            )
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            res.teks_arab,
                            fontSize = 24.sp,
                            textAlign = TextAlign.Right,
                            modifier = Modifier.fillMaxWidth(),
                            lineHeight = 40.sp,
                            color = Gray800
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(res.teks_latin, fontSize = 13.sp, color = Gray500, textAlign = TextAlign.Center)
                        HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                        Text(res.terjemahan, fontSize = 14.sp, color = Gray700, lineHeight = 24.sp)
                    }
                }
            }
        }

        // Surah Picker Dialog
        if (showPicker) {
            AlertDialog(
                onDismissRequest = { showPicker = false },
                title = { Text("Pilih Surah", fontWeight = FontWeight.Bold, color = Green800) },
                text = {
                    LazyColumn {
                        items(IslamicData.surahList) { s ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(8.dp))
                                    .clickable {
                                        surah = s.num
                                        showPicker = false
                                    }
                                    .then(
                                        if (surah == s.num) Modifier.background(Green100)
                                        else Modifier
                                    )
                                    .padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(32.dp)
                                        .clip(RoundedCornerShape(16.dp))
                                        .background(Green500),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text("${s.num}", color = White, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                }
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(s.name, color = if (surah == s.num) Green800 else Gray800)
                            }
                        }
                    }
                },
                confirmButton = {}
            )
        }
    }
}
