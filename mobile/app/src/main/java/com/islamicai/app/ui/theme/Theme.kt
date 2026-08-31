package com.islamicai.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Green600,
    onPrimary = White,
    primaryContainer = Green100,
    onPrimaryContainer = Green900,
    secondary = Green500,
    onSecondary = White,
    background = Green50,
    onBackground = Gray900,
    surface = White,
    onSurface = Gray800,
    surfaceVariant = Gray100,
    onSurfaceVariant = Gray500,
    error = Red500,
    onError = White,
)

@Composable
fun IslamicAITheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography(),
        content = content
    )
}
