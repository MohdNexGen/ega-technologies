import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function FeeSettings() {
  const [fee, setFee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");

  async function loadSettings() {
    setMessage("Loading settings...");

    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("key", "course_settings")
      .maybeSingle();

    if (error) {
      setMessage("❌ Load error: " + error.message);
      return;
    }

    if (data) {
      setFee(String(data.fee || ""));
      setStartDate(data.start_date || "");
      setMessage("✅ Settings loaded");
    } else {
      setMessage("No settings yet. Add fee and start date.");
    }
  }

  async function saveSettings() {
    if (!fee.trim()) {
      setMessage("⚠️ Enter course fee");
      return;
    }

    if (!startDate.trim()) {
      setMessage("⚠️ Enter start date");
      return;
    }

    setMessage("Saving settings...");

    const { error } = await supabase.from("settings").upsert({
      key: "course_settings",
      fee: Number(fee),
      start_date: startDate.trim(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setMessage("❌ Save error: " + error.message);
      return;
    }

    setMessage("✅ Fee settings saved successfully");
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/admin-dashboard" style={styles.backButton}>
        ← Dashboard
      </Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.title}>Fee Settings</Text>
        <Text style={styles.subtitle}>
          Change course fee and starting date globally
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Course Fee</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: 3000"
          value={fee}
          onChangeText={setFee}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: July 15, 2026"
          value={startDate}
          onChangeText={setStartDate}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveText}>Save Settings</Text>
        </TouchableOpacity>

        {!!message && <Text style={styles.message}>{message}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#eef3ff",
    minHeight: "100%",
  },
  backButton: {
    backgroundColor: "#234c9f",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  hero: {
    backgroundColor: "#10245c",
    padding: 35,
    borderRadius: 18,
    marginBottom: 18,
    alignItems: "center",
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#dbeafe",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
  },
  label: {
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    marginTop: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#10245c",
  },
});