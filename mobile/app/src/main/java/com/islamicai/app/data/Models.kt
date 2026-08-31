package com.islamicai.app.data

data class ChatRequest(val message: String)
data class ChatResponse(val status: String, val response: String)

data class QuranVerseRequest(val surah: Int, val ayat: Int)
data class QuranVerseResponse(
    val status: String,
    val surah: String,
    val nomor_surah: Int,
    val nomor_ayat: Int,
    val teks_arab: String,
    val teks_latin: String,
    val terjemahan: String
)

data class HadithRequest(val kitab: String, val nomor: Int)
data class HadithResponse(
    val status: String,
    val kitab: String,
    val nomor: Int,
    val teks_arab: String,
    val terjemahan: String
)
