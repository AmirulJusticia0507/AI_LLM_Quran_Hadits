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
import { getHadith, HadithResult } from "../services/api";
import { KITAB_LIST } from "../data";

export default function HadithScreen() {
  const [kitab, setKitab] = useState("bukhari");
  const [nomor, setNomor] = useState("1");
  const [result, setResult] = useState<HadithResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showKitabPicker, setShowKitabPicker] = useState(false);

  const selectedKitab = KITAB_LIST.find((k) => k.id === kitab);

  const fetchHadith = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await getHadith(kitab, parseInt(nomor) || 1);
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
      <Text style={styles.title}>Cari Hadits</Text>
      <Text style={styles.subtitle}>Pilih kitab perawi dan nomor hadits</Text>

      {/* Form */}
      <View style={styles.card}>
        {/* Kitab Picker */}
        <Text style={styles.label}>Kitab / Perawi</Text>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => setShowKitabPicker(true)}
        >
          <Text style={styles.pickerText}>
            {selectedKitab ? selectedKitab.name : "Pilih Kitab"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Nomor Input */}
        <Text style={styles.label}>Nomor Hadits</Text>
        <TextInput
          style={styles.input}
          value={nomor}
          onChangeText={setNomor}
          keyboardType="numeric"
          placeholder="1"
        />
        {selectedKitab && (
          <Text style={styles.hint}>Maks: {selectedKitab.max} hadits</Text>
        )}

        {/* Button */}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={fetchHadith}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="search" size={18} color="#fff" />
              <Text style={styles.btnText}>Cari Hadits</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {result.kitab} - Hadits #{result.nomor}
            </Text>
          </View>

          <Text style={styles.arabicText}>{result.teks_arab}</Text>

          <View style={styles.divider} />
          <Text style={styles.translationText}>{result.terjemahan}</Text>
        </View>
      )}

      {/* Kitab Picker Modal */}
      <Modal visible={showKitabPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Kitab</Text>
              <TouchableOpacity onPress={() => setShowKitabPicker(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={KITAB_LIST}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.kitabItem,
                    kitab === item.id && styles.kitabItemActive,
                  ]}
                  onPress={() => {
                    setKitab(item.id);
                    setShowKitabPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.kitabName,
                      kitab === item.id && styles.kitabNameActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.kitabMax}>{item.max} hadits</Text>
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
    backgroundColor: "#f9fafb",
  },
  hint: { fontSize: 11, color: "#9ca3af", marginTop: 4, marginBottom: 12 },
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
  kitabItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  kitabItemActive: { backgroundColor: "#d1fae5" },
  kitabName: { fontSize: 14, color: "#1f2937", fontWeight: "500" },
  kitabNameActive: { color: "#065f46", fontWeight: "700" },
  kitabMax: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
});
