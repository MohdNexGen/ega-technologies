import { Link } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function LearnerPortal() {
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    if (loading) return;

    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setMessage("⚠️ Please enter Phone Number");
      return;
    }

    try {
      setLoading(true);
      setMessage("Checking login...");
      setStudent(null);

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("phone", cleanPhone)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        setMessage("❌ Supabase error: " + error.message);
        return;
      }

      if (!data || data.length === 0) {
        setMessage("❌ Student not found");
        return;
      }

      setStudent(data[0]);
      setMessage("✅ Login successful");
    } catch (err: any) {
      setMessage("❌ Login error: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setStudent(null);
    setPhone("");
    setMessage("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/" style={styles.homeButton}>← Home</Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>🎓</Text>
        <Text style={styles.title}>Learner Portal</Text>
        <Text style={styles.subtitle}>Login with your phone number</Text>
      </View>

      {!student && (
        <View style={styles.card}>
          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 0912345678"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginText}>
              {loading ? "Checking..." : "Login"}
            </Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      )}

      {student && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Student Information</Text>

          <Text style={styles.info}>Name: {student.name || "Not added"}</Text>
          <Text style={styles.info}>Phone: {student.phone || "Not added"}</Text>
          <Text style={styles.info}>Email: {student.email || "Not added"}</Text>
          <Text style={styles.info}>Course: {student.course || "Full Web Development"}</Text>
          <Text style={styles.info}>Fee: {student.fee || "Contact EGA"}</Text>
          <Text style={styles.info}>Payment: {student.payment_status || "Pending"}</Text>
          <Text style={styles.info}>Starting Day: {student.start_date || "Will be announced soon"}</Text>
          <Text style={styles.info}>Certificate Status: {student.certificate_status || "Not Ready"}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f4f6fb",
    minHeight: "100%",
  },
  homeButton: {
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
    backgroundColor: "#062b8f",
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
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
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
  loginButton: {
    backgroundColor: "#f1c400",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    marginTop: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#10245c",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 12,
  },
  info: {
    fontSize: 15,
    marginBottom: 7,
    color: "#222",
  },
  logoutButton: {
    backgroundColor: "#b00020",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});