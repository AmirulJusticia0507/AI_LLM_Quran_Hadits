import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getQuranVerse, QuranVerse } from "../services/api";
import { SURAH_LIST } from "../data";

export default function QuranScreen() {
  const [surah, setSurah] = useState(1);
  const [ayat, setAyat] = useState("1");
  const [result, setResult] = useState<QuranVerse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);

  const selectedSurah = SURAH_LIST.find((s) => s.num === surah);

  const fetchVerse = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await getQuranVerse(surah, parseInt(ayat) || 1);
      setResult(data);
    } catch (err: any) {
      Alert.alert("Gagal", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.title}>Cari Ayat Al-Qur'an</Text>
      <Text style={styles.subtitle}>Pilih surah dan nomor ayat</Text>

      {/* Form */}
      <View style={styles.card}>
        {/* Surah Picker */}
        <Text style={styles.label}>Surah</Text>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => setShowSurahPicker(true)}
        >
          <Text style={styles.pickerText}>
            {selectedSurah ? `${selectedSurah.num}. ${selectedSurah.name}` : "Pilih Surah"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Ayat Input */}
        <Text style={styles.label}>Nomor Ayat</Text>
        <TextInput
          style={styles.input}
          value={ayat}
          onChangeText={setAyat}
          keyboardType="numeric"
          placeholder="1"
        />

        {/* Button */}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={fetchVerse}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="search" size={18} color="#fff" />
              <Text style={styles.btnText}>Cari Ayat</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {result.surah} ({result.nomor_surah}:{result.nomor_ayat})
            </Text>
          </View>

          <Text style={styles.arabicText}>{result.teks_arab}</Text>
          <Text style={styles.latinText}>{result.teks_latin}</Text>

          <View style={styles.divider} />
          <Text style={styles.translationText}>{result.terjemahan}</Text>
        </View>
      )}

      {/* Surah Picker Modal */}
      <Modal visible={showSurahPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Surah</Text>
              <TouchableOpacity onPress={() => setShowSurahPicker(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SURAH_LIST}
              keyExtractor={(item) => item.num.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.surahItem,
                    surah === item.num && styles.surahItemActive,
                  ]}
                  onPress={() => {
                    setSurah(item.num);
                    setShowSurahPicker(false);
                  }}
                >
                  <Text style={styles.surahNum}>{item.num}</Text>
                  <Text
                    style={[
                      styles.surahName,
                      surah === item.num && styles.surahNameActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fdf4" },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#065f46", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6b7280", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  picker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1fae5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
  pickerText: { fontSize: 14, color: "#1f2937" },
  input: {
    borderWidth: 1,
    borderColor: "#d1fae5",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
  btn: {
    flexDirection: "row",
    backgroundColor: "#10b981",
    borderRadius: 12,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  btnDisabled: { backgroundColor: "#9ca3af" },
  btnText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    alignSelf: "center",
    backgroundColor: "#d1fae5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: { fontSize: 13, color: "#065f46", fontWeight: "600" },
  arabicText: {
    fontSize: 24,
    textAlign: "right",
    direction: "rtl",
    lineHeight: 40,
    color: "#1f2937",
    marginBottom: 12,
  },
  latinText: {
    fontSize: 13,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 12,
  },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 12 },
  translationText: { fontSize: 14, color: "#374151", lineHeight: 24 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#065f46" },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  surahItemActive: { backgroundColor: "#d1fae5" },
  surahNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#10b981",
    color: "#fff",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "bold",
    marginRight: 12,
    overflow: "hidden",
  },
  surahName: { fontSize: 14, color: "#1f2937" },
  surahNameActive: { color: "#065f46", fontWeight: "600" },
});
