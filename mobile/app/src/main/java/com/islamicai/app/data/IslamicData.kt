package com.islamicai.app.data

data class Surah(val num: Int, val name: String)
data class Kitab(val id: String, val name: String, val maxHadith: Int)

object IslamicData {
    val surahList = listOf(
        Surah(1, "Al-Fatihah"), Surah(2, "Al-Baqarah"), Surah(3, "Ali 'Imran"),
        Surah(4, "An-Nisa'"), Surah(5, "Al-Ma'idah"), Surah(6, "Al-An'am"),
        Surah(7, "Al-A'raf"), Surah(8, "Al-Anfal"), Surah(9, "At-Tawbah"),
        Surah(10, "Yunus"), Surah(11, "Hud"), Surah(12, "Yusuf"),
        Surah(13, "Ar-Ra'd"), Surah(14, "Ibrahim"), Surah(15, "Al-Hijr"),
        Surah(16, "An-Nahl"), Surah(17, "Al-Isra'"), Surah(18, "Al-Kahf"),
        Surah(19, "Maryam"), Surah(20, "Taha"), Surah(21, "Al-Anbiya"),
        Surah(22, "Al-Hajj"), Surah(23, "Al-Mu'minun"), Surah(24, "An-Nur"),
        Surah(25, "Al-Furqan"), Surah(26, "Ash-Shu'ara"), Surah(27, "An-Naml"),
        Surah(28, "Al-Qasas"), Surah(29, "Al-Ankabut"), Surah(30, "Ar-Rum"),
        Surah(31, "Luqman"), Surah(32, "As-Sajdah"), Surah(33, "Al-Ahzab"),
        Surah(34, "Saba'"), Surah(35, "Fatir"), Surah(36, "Ya Sin"),
        Surah(37, "As-Saffat"), Surah(38, "Sad"), Surah(39, "Az-Zumar"),
        Surah(40, "Ghafir"), Surah(41, "Fussilat"), Surah(42, "Ash-Shura"),
        Surah(43, "Az-Zukhruf"), Surah(44, "Ad-Dukhan"), Surah(45, "Al-Jathiyah"),
        Surah(46, "Al-Ahqaf"), Surah(47, "Muhammad"), Surah(48, "Al-Fath"),
        Surah(49, "Al-Hujurat"), Surah(50, "Qaf"), Surah(51, "Adh-Dhariyat"),
        Surah(52, "At-Tur"), Surah(53, "An-Najm"), Surah(54, "Al-Qamar"),
        Surah(55, "Ar-Rahman"), Surah(56, "Al-Waqi'ah"), Surah(57, "Al-Hadid"),
        Surah(58, "Al-Mujadilah"), Surah(59, "Al-Hashr"), Surah(60, "Al-Mumtahanah"),
        Surah(61, "As-Saff"), Surah(62, "Al-Jumu'ah"), Surah(63, "Al-Munafiqun"),
        Surah(64, "At-Taghabun"), Surah(65, "At-Talaq"), Surah(66, "At-Tahrim"),
        Surah(67, "Al-Mulk"), Surah(68, "Al-Qalam"), Surah(69, "Al-Haqqah"),
        Surah(70, "Al-Ma'arij"), Surah(71, "Nuh"), Surah(72, "Al-Jinn"),
        Surah(73, "Al-Muzzammil"), Surah(74, "Al-Muddaththir"), Surah(75, "Al-Qiyamah"),
        Surah(76, "Al-Insan"), Surah(77, "Al-Mursalat"), Surah(78, "An-Naba'"),
        Surah(79, "An-Nazi'at"), Surah(80, "Abasa"), Surah(81, "At-Takwir"),
        Surah(82, "Al-Infitar"), Surah(83, "Al-Mutaffifin"), Surah(84, "Al-Inshiqaq"),
        Surah(85, "Al-Buruj"), Surah(86, "At-Tariq"), Surah(87, "Al-A'la"),
        Surah(88, "Al-Ghashiyah"), Surah(89, "Al-Fajr"), Surah(90, "Al-Balad"),
        Surah(91, "Ash-Shams"), Surah(92, "Al-Layl"), Surah(93, "Ad-Duha"),
        Surah(94, "Ash-Sharh"), Surah(95, "At-Tin"), Surah(96, "Al-Alaq"),
        Surah(97, "Al-Qadr"), Surah(98, "Al-Bayyinah"), Surah(99, "Az-Zalzalah"),
        Surah(100, "Al-Adiyat"), Surah(101, "Al-Qari'ah"), Surah(102, "At-Takathur"),
        Surah(103, "Al-Asr"), Surah(104, "Al-Humazah"), Surah(105, "Al-Fil"),
        Surah(106, "Quraysh"), Surah(107, "Al-Ma'un"), Surah(108, "Al-Kawthar"),
        Surah(109, "Al-Kafirun"), Surah(110, "An-Nasr"), Surah(111, "Al-Masad"),
        Surah(112, "Al-Ikhlas"), Surah(113, "Al-Falaq"), Surah(114, "An-Nas")
    )

    val kitabList = listOf(
        Kitab("bukhari", "Shahih Bukhari", 7563),
        Kitab("muslim", "Shahih Muslim", 7500),
        Kitab("tirmidzi", "Jami' at-Tirmidzi", 3956),
        Kitab("abu-dawud", "Sunan Abu Dawud", 5274),
        Kitab("nasai", "Sunan an-Nasa'i", 5761),
        Kitab("ibnu-majah", "Sunan Ibnu Majah", 4341)
    )
}
