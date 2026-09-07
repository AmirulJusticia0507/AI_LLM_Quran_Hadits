package com.islamicai.app.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.islamicai.app.data.ApiClient
import com.islamicai.app.data.HadithRequest
import com.islamicai.app.data.HadithResponse
import com.islamicai.app.data.IslamicData
import com.islamicai.app.ui.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HadithScreen() {
    var kitab by remember { mutableStateOf("bukhari") }
    var nomor by remember { mutableStateOf("1") }
    var result by remember { mutableStateOf<HadithResponse?>(null) }
    var loading by remember { mutableStateOf(false) }
    var showPicker by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()
    val context = LocalContext.current

    val selectedKitab = IslamicData.kitabList.find { it.id == kitab }

    val maxHadith = selectedKitab?.maxHadith ?: 7563

    fun copyToClipboard(text: String, message: String) {
        val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.primaryClip = ClipData.newPlainText("Hadith", text)
        showToast(context, message)
    }

    fun shareHadith(res: HadithResponse) {
        val shareText = """${res.kitab} - Hadits #${res.nomor}

${res.teks_arab}

${res.terjemahan}"""
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, shareText)
        }
        context.startActivity(Intent.createChooser(intent, "Bagikan Hadits"))
    }

    fun showToast(ctx: Context, msg: String) {
        android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_SHORT).show()
    }

    fun fetchHadith(targetNomor: Int) {
        loading = true
        error = null
        scope.launch {
            try {
                val res = ApiClient.api.getHadith(HadithRequest(kitab, targetNomor))
                result = res
                if (res.status == "error") {
                    error = res.message
                }
            } catch (e: Exception) {
                error = "Error: ${e.message}"
                result = null
            }
            loading = false
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Green50)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text("Cari Hadits", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Green800)
        Text("Pilih kitab perawi dan nomor hadits", fontSize = 13.sp, color = Gray500)
        Spacer(modifier = Modifier.height(16.dp))

        // Form Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = White),
            elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Kitab / Perawi", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Gray700)
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = selectedKitab?.name ?: "",
                    onValueChange = {},
                    modifier = Modifier.fillMaxWidth().clickable { showPicker = true },
                    enabled = false,
                    shape = RoundedCornerShape(12.dp)
                )
                Spacer(modifier = Modifier.height(12.dp))

                Text("Nomor Hadits", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Gray700)
                Spacer(modifier = Modifier.height(6.dp))
                Row {
                    OutlinedTextField(
                        value = nomor,
                        onValueChange = { nomor = it.filter { it.isDigit() } },
                        modifier = Modifier.weight(1f).padding(end = 8.dp),
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        shape = RoundedCornerShape(12.dp)
                    )
                    if (selectedKitab != null) {
                        Text("Maks: $maxHadith", fontSize = 12.sp, color = Gray500)
                            .let { Text(text = it, modifier = Modifier.padding(start = 8.dp).align(Alignment.CenterVertically)) }
                    }
                }
                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = { fetchHadith(nomor.toIntOrNull() ?: 1) },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = Green500),
                    shape = RoundedCornerShape(12.dp),
                    enabled = !loading
                ) {
                    if (loading) CircularProgressIndicator(modifier = Modifier.size(20.dp), color = White, strokeWidth = 2.dp)
                    else Text("Cari Hadits", fontWeight = FontWeight.SemiBold)
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Error Display
        error?.let { err ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Red50.copy(alpha = 0.1f))
            ) {
                Row(modifier = Modifier.padding(12.dp)) {
                    Icon(Icons.Default.Error, "Error", tint = Red500)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(err, color = Red700, fontSize = 13.sp)
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
        }

        // Result
        result?.let { res ->
            if (res.status == "success") {
                // Navigation Buttons
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Button(
                        onClick = {
                            val prev = res.nomor - 1
                            if (prev >= 1) {
                                nomor = prev.toString()
                                fetchHadith(prev)
                            }
                        },
                        enabled = res.nomor > 1 && !loading,
                        colors = ButtonDefaults.tonalButtonColors(containerColor = Green100, contentColor = Green800)
                    ) {
                        Row { Icon(Icons.Default.ArrowBack, ""); Spacer(Modifier.width(4.dp)); Text("Sebelumnya") }
                    }
                    Button(
                        onClick = {
                            val next = res.nomor + 1
                            if (next <= maxHadith) {
                                nomor = next.toString()
                                fetchHadith(next)
                            }
                        },
                        enabled = res.nomor < maxHadith && !loading,
                        colors = ButtonDefaults.tonalButtonColors(containerColor = Green100, contentColor = Green800)
                    ) {
                        Row { Text("Selanjutnya"); Spacer(Modifier.width(4.dp)); Icon(Icons.Default.ArrowForward, "") }
                    }
                }

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 3.dp)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        // Header with kitab & number
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Surface(
                                shape = RoundedCornerShape(20.dp),
                                color = Green100
                            ) {
                                Text(
                                    "${res.kitab} - Hadits #${res.nomor}",
                                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                                    fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Green800
                                )
                            }
                            // Action buttons
                            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                IconButton(onClick = { copyToClipboard(res.teks_arab, "Teks Arab disalin") }) {
                                    Icon(Icons.Default.ContentCopy, "Salin Arab")
                                }
                                IconButton(onClick = { copyToClipboard(res.terjemahan, "Terjemahan disalin") }) {
                                    Icon(Icons.Default.ContentCopy, "Salin Terjemahan")
                                }
                                IconButton(onClick = { shareHadith(res) }) {
                                    Icon(Icons.Default.Share, "Bagikan")
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(16.dp))

                        // Arabic Text
                        Text(
                            res.teks_arab,
                            fontSize = 22.sp,
                            textAlign = TextAlign.Right,
                            modifier = Modifier.fillMaxWidth(),
                            lineHeight = 38.sp,
                            color = Gray800,
                            fontFamily = androidx.compose.ui.text.font.FontFamily.Default // fallback, can add Amiri font
                        )
                        HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

                        // Translation
                        Text(res.terjemahan, fontSize = 14.sp, color = Gray700, lineHeight = 24.sp)
                    }
                }
            }
        }

        // Kitab Picker Dialog
        if (showPicker) {
            AlertDialog(
                onDismissRequest = { showPicker = false },
                title = { Text("Pilih Kitab", fontWeight = FontWeight.Bold, color = Green800) },
                text = {
                    Column {
                        IslamicData.kitabList.forEach { k ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(8.dp))
                                    .clickable {
                                        kitab = k.id
                                        nomor = "1"
                                        showPicker = false
                                    }
                                    .then(
                                        if (kitab == k.id) Modifier.background(Green100)
                                        else Modifier
                                    )
                                    .padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(k.name, fontWeight = if (kitab == k.id) FontWeight.Bold else FontWeight.Normal, color = if (kitab == k.id) Green800 else Gray800)
                                    Text("${k.maxHadith} hadits", fontSize = 12.sp, color = Gray400)
                                }
                            }
                        }
                    }
                },
                confirmButton = {}
            )
        }
    }
}