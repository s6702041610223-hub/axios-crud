import api from "@/utils/crud-api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

export default function AddPhone() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sect, setSect] = useState("");
  const [tel, setTel] = useState("");

  const addPhone = async () => {
    if (name === "" || sect === "" || tel === "") {
      Alert.alert("Missing Information", "Please fill in all fields before saving.");
      return;
    }
    const phone = {
      id: uuidv4(),
      name,
      sect,
      tel,
    };

    try {
      await api.post("phones", phone);
      setName("");
      setSect("");
      setTel("");
      router.navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>➕</Text>
          <Text style={styles.headerTitle}>Add New Contact</Text>
          <Text style={styles.headerSubtitle}>
            Enter the student's information below
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Name Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>👤 Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter student name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Section Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>🏫 Section</Text>
            <RadioButton.Group value={sect} onValueChange={setSect}>
              <View style={styles.radioRow}>
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    sect === "CED" && styles.radioOptionSelected,
                  ]}
                  onPress={() => setSect("CED")}
                >
                  <RadioButton value="CED" color="#4F46E5" />
                  <Text
                    style={[
                      styles.radioText,
                      sect === "CED" && styles.radioTextSelected,
                    ]}
                  >
                    CED
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    sect === "TCT" && styles.radioOptionSelected,
                  ]}
                  onPress={() => setSect("TCT")}
                >
                  <RadioButton value="TCT" color="#4F46E5" />
                  <Text
                    style={[
                      styles.radioText,
                      sect === "TCT" && styles.radioTextSelected,
                    ]}
                  >
                    TCT
                  </Text>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>

          {/* Phone Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>📞 Phone Number</Text>
            <TextInput
              style={styles.input}
              value={tel}
              onChangeText={setTel}
              placeholder="e.g. 088-888-8888"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.cancelBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={addPhone}
            style={styles.saveBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.saveBtnText}>✓ Save Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#10B981",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  headerEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#A7F3D0",
    fontWeight: "500",
  },
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },
  radioRow: {
    flexDirection: "row",
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingRight: 16,
    paddingVertical: 4,
    flex: 1,
  },
  radioOptionSelected: {
    backgroundColor: "#EEF2FF",
    borderColor: "#4F46E5",
  },
  radioText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  radioTextSelected: {
    color: "#4F46E5",
  },
  buttonRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 30,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "700",
  },
  saveBtn: {
    flex: 2,
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});