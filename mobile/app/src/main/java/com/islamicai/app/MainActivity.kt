package com.islamicai.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Chat
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.automirrored.filled.LibraryBooks
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.islamicai.app.ui.screens.ChatScreen
import com.islamicai.app.ui.screens.QuranScreen
import com.islamicai.app.ui.screens.HadithScreen
import com.islamicai.app.ui.theme.Green500
import com.islamicai.app.ui.theme.Green800
import com.islamicai.app.ui.theme.Gray400
import com.islamicai.app.ui.theme.IslamicAITheme
import com.islamicai.app.ui.theme.White

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            IslamicAITheme {
                MainScreen()
            }
        }
    }
}

sealed class Screen(val title: String, val icon: ImageVector) {
    data object Chat : Screen("Chat AI", Icons.AutoMirrored.Filled.Chat)
    data object Quran : Screen("Al-Qur'an", Icons.AutoMirrored.Filled.MenuBook)
    data object Hadith : Screen("Hadits", Icons.AutoMirrored.Filled.LibraryBooks)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    var currentTab by remember { mutableIntStateOf(0) }
    val screens = listOf(Screen.Chat, Screen.Quran, Screen.Hadith)

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "AI Qur'an & Hadits",
                        fontWeight = FontWeight.Bold,
                        color = Green800
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = White)
            )
        },
        bottomBar = {
            NavigationBar(containerColor = White) {
                screens.forEachIndexed { index, screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title, fontSize = 12.sp) },
                        selected = currentTab == index,
                        onClick = { currentTab = index },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Green500,
                            selectedTextColor = Green500,
                            unselectedIconColor = Gray400,
                            unselectedTextColor = Gray400,
                            indicatorColor = White
                        )
                    )
                }
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding)) {
            when (currentTab) {
                0 -> ChatScreen()
                1 -> QuranScreen()
                2 -> HadithScreen()
            }
        }
    }
}
