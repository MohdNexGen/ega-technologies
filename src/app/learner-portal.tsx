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
  const [
    studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    if (loading) return;

    setMessage("Checking login...");
    setStudent(null);

    if (!studentId.trim() || !phone.trim()) {
      setMessage("⚠️ Please enter Student ID and Phone Number");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", studentId.trim())
        .maybeSingle();

      if (error) {
        setMessage("❌ Supabase error: " + error.message);
        return;
      }

      if (!data) {
        setMessage("❌ Student not found");
        return;
      }

      const typedPhone = phone.replace(/\D/g, "");
      const savedPhone = String(data.phone || "").replace(/\D/g, "");

      if (typedPhone !== savedPhone) {
        setMessage("❌ Phone number does not match");
        return;
      }

      setStudent(data);
      setMessage("✅ Login successful");
    } catch (err: any) {
      setMessage("❌ Login error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setStudent(null);
    setStudentId("");
    setPhone("");
    setMessage("");
  }

  return (
    <ScrollView
  contentContainerStyle={styles.container}
  keyboardShouldPersistTaps="handled"
>
      <Link href="/" style={styles.homeButton}>
        ← Home
      </Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>🎓</Text>
        <Text style={styles.title}>Learner Portal</Text>
        <Text style={styles.subtitle}>Login to view progress and certificate</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: EGA-2026-0001"
          value={studentId}
          onChangeText={setStudentId}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: 0912345678"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
  style={styles.loginButton}
 
  activeOpacity={0.7}
>
  <Text style={styles.loginText}>
    {loading ? "Checking..." : "Login"}
  </Text>
</TouchableOpacity>
      

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Student Information</Text>

        {!student ? (
          <>
            <Text style={styles.info}>Name: Not logged in</Text>
            <Text style={styles.info}>Course: Web Development</Text>
            <Text style={styles.info}>Quiz Score: 0%</Text>
            <Text style={styles.info}>Certificate Status: Not Ready</Text>
          </>
        ) : (
          <>
            <Text style={styles.info}>Name: {student.full_name}</Text>
            <Text style={styles.info}>Student ID: {student.student_id}</Text>
            <Text style={styles.info}>Phone: {student.phone}</Text>
            <Text style={styles.info}>Email: {student.email || "Not added"}</Text>
            <Text style={styles.info}>Course: {student.course}</Text>
            <Text style={styles.info}>Payment: {student.payment_status || "Pending"}</Text>
            <Text style={styles.info}>Quiz Score: {student.quiz_score || "Not taken"}</Text>
            <Text style={styles.info}>Certificate Status: {student.certificate_status || "Not Ready"}</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
    backgroundColor: "#fff",
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