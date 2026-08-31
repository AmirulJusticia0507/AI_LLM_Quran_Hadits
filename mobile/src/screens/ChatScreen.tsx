import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chatAI } from "../services/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await chatAI(userMsg.content);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      Alert.alert("Gagal", err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    Alert.alert("Hapus Percakapan", "Semua pesan akan dihapus?", [
      { text: "Batal", style: "cancel" },
      { text: "Ya, Hapus", style: "destructive", onPress: () => setMessages([]) },
    ]);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === "user" ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.role === "user" ? styles.userText : styles.assistantText,
        ]}
      >
        {item.content}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Chat AI Keislaman</Text>
          <Text style={styles.headerSubtitle}>Tanya tentang Qur'an & Hadits</Text>
        </View>
        {messages.length > 0 && (
          <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🕌</Text>
          <Text style={styles.emptyText}>Assalamu'alaikum Wr. Wb.</Text>
          <Text style={styles.emptySubtext}>Silakan ajukan pertanyaan Anda</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
      )}

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#10b981" />
          <Text style={styles.loadingText}>Berpikir...</Text>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ketik pertanyaan..."
          placeholderTextColor="#9ca3af"
          editable={!loading}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={loading || !input.trim()}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fdf4" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d1fae5",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#065f46" },
  headerSubtitle: { fontSize: 12, color: "#6b7280" },
  clearBtn: { padding: 8 },
  messageList: { padding: 16 },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: "#10b981",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  messageText: { fontSize: 14, lineHeight: 20 },
  userText: { color: "#fff" },
  assistantText: { color: "#1f2937" },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#d1fae5",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1fae5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    backgroundColor: "#f9fafb",
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#10b981",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnDisabled: { backgroundColor: "#9ca3af" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 16, color: "#6b7280", fontWeight: "500" },
  emptySubtext: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  loadingText: { marginLeft: 8, color: "#6b7280", fontSize: 13 },
});
