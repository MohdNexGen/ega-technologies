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
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function cleanPhone(value: string) {
    return value.replace(/\D/g, "");
  }

  function progressPercent() {
    if (!student) return 0;

    return (
      (student.html_certificate_status === "Ready" ? 33 : 0) +
      (student.css_certificate_status === "Ready" ? 33 : 0) +
      (student.js_certificate_status === "Ready" ? 34 : 0)
    );
  }

  async function handleLogin() {
    if (loading) return;

    if (!studentId.trim() || !phone.trim()) {
      setMessage("⚠️ Enter Student ID and Phone Number");
      return;
    }

    setLoading(true);
    setMessage("Checking login...");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .maybeSingle();

    setLoading(false);

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    if (!data) {
      setMessage("❌ Student not found");
      return;
    }

    if (cleanPhone(data.phone || "") !== cleanPhone(phone)) {
      setMessage("❌ Phone number does not match");
      return;
    }

    setStudent(data);
    setMessage("✅ Login successful");
  }

  function logout() {
    setStudent(null);
    setStudentId("");
    setPhone("");
    setMessage("");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/" asChild>
        <TouchableOpacity>
          <Text style={styles.back}>← Back to Home</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>🎓 Learner Portal</Text>
      <Text style={styles.subtitle}>
        Login to view your payment, progress, and certificates.
      </Text>

      {!student && (
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter Student ID"
            value={studentId}
            onChangeText={setStudentId}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>
              {loading ? "Checking..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {student && (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>👤 Student Information</Text>
            <Text style={styles.info}>Name: {student.name}</Text>
            <Text style={styles.info}>Student ID: {student.student_id}</Text>
            <Text style={styles.info}>Email: {student.email}</Text>
            <Text style={styles.info}>Phone: {student.phone}</Text>
            <Text style={styles.info}>Course: {student.course}</Text>
            <Text style={styles.info}>Language: {student.language}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💳 Payment Details</Text>
            <Text style={styles.info}>
              Payment Status: {student.payment_status || "Pending"}
            </Text>
            <Text style={styles.info}>
              Payment Method: {student.payment_method || "Not Selected"}
            </Text>
            <Text style={styles.info}>
              Payment Reference: {student.payment_reference || "Not Provided"}
            </Text>
            <Text style={styles.info}>Fee: {student.fee || "Contact EGA"}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📚 Course Progress</Text>

            <Text style={styles.info}>
              HTML Certificate:{" "}
              {student.html_certificate_status === "Ready"
                ? "✅ Ready"
                : "❌ Not Ready"}
            </Text>

            <Text style={styles.info}>
              CSS Certificate:{" "}
              {student.css_certificate_status === "Ready"
                ? "✅ Ready"
                : "❌ Not Ready"}
            </Text>

            <Text style={styles.info}>
              JavaScript Certificate:{" "}
              {student.js_certificate_status === "Ready"
                ? "✅ Ready"
                : "❌ Not Ready"}
            </Text>

            <Text style={styles.progressTitle}>Overall Progress</Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercent()}%` },
                ]}
              />
            </View>

            <Text style={styles.progressText}>{progressPercent()}%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏆 Student Achievements</Text>

            <Text style={styles.info}>
              {student.html_certificate_status === "Ready" ? "⭐ HTML Master" : "🔒 HTML Master"}
            </Text>

            <Text style={styles.info}>
              {student.css_certificate_status === "Ready" ? "⭐ CSS Master" : "🔒 CSS Master"}
            </Text>

            <Text style={styles.info}>
              {student.js_certificate_status === "Ready" ? "⭐ JavaScript Master" : "🔒 JavaScript Master"}
            </Text>

            <Text style={styles.info}>
              {student.html_certificate_status === "Ready" &&
              student.css_certificate_status === "Ready" &&
              student.js_certificate_status === "Ready"
                ? "🎓 Full Web Developer"
                : "🔒 Full Web Developer"}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/master-certificate")}>
            <Text style={styles.buttonText}>🎓 View Master Certificate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },
  content: { padding: 20, paddingBottom: 60 },
  back: {
    marginTop: 35,
    marginBottom: 20,
    color: "#003366",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dbe3ec",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#003366",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  message: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 15,
  },
  info: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#003366",
  },
  progressBar: {
    width: "100%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#28a745",
    height: 20,
    borderRadius: 10,
  },
  progressText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003366",
  },
  logoutButton: {
    backgroundColor: "#b00020",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
