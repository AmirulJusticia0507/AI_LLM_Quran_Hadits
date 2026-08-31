package com.islamicai.app.data

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("api/chat")
    suspend fun chat(@Body request: ChatRequest): ChatResponse

    @POST("api/quran/verse")
    suspend fun getQuranVerse(@Body request: QuranVerseRequest): QuranVerseResponse

    @POST("api/hadith")
    suspend fun getHadith(@Body request: HadithRequest): HadithResponse
}

object ApiClient {
    // Android Emulator: 10.0.2.2
    // Physical device: ganti dengan IP komputer kamu
    private const val BASE_URL = "http://10.0.2.2:8000"

    val api: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
