package com.islamicai.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
    val scope = rememberCoroutineScope()

    val selectedKitab = IslamicData.kitabList.find { it.id == kitab }

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
                OutlinedTextField(
                    value = nomor,
                    onValueChange = { nomor = it },
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    shape = RoundedCornerShape(12.dp)
                )
                if (selectedKitab != null) {
                    Text("Maks: ${selectedKitab.maxHadith} hadits", fontSize = 11.sp, color = Gray400)
                }
                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = {
                        loading = true
                        result = null
                        scope.launch {
                            try {
                                result = ApiClient.api.getHadith(HadithRequest(kitab, nomor.toIntOrNull() ?: 1))
                            } catch (e: Exception) {
                                result = HadithResponse("error", "", 0, "", "Error: ${e.message}")
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
                    else Text("Cari Hadits", fontWeight = FontWeight.SemiBold)
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
                                "${res.kitab} - Hadits #${res.nomor}",
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
                        HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
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
