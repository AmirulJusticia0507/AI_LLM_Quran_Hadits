import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ChatScreen from "./src/screens/ChatScreen";
import QuranScreen from "./src/screens/QuranScreen";
import HadithScreen from "./src/screens/HadithScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "chatbubble";
            if (route.name === "Chat") iconName = focused ? "chatbubble" : "chatbubble-outline";
            else if (route.name === "Quran") iconName = focused ? "book" : "book-outline";
            else if (route.name === "Hadith") iconName = focused ? "library" : "library-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#10b981",
          tabBarInactiveTintColor: "#9ca3af",
          headerStyle: { backgroundColor: "#fff", borderBottomColor: "#d1fae5" },
          headerTitleStyle: { color: "#065f46", fontWeight: "600" },
        })}
      >
        <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Chat AI" }} />
        <Tab.Screen name="Quran" component={QuranScreen} options={{ title: "Al-Qur'an" }} />
        <Tab.Screen name="Hadith" component={HadithScreen} options={{ title: "Hadits" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
