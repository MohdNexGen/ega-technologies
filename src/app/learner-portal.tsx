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

export default function LearnerPortal() {
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [fee, setFee] = useState("Contact EGA");
  const [startDate, setStartDate] = useState("Coming Soon");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadSettings() {
    const { data } = await supabase
      .from("settings")
      .select("*")
      .eq("key", "course_settings")
      .maybeSingle();

    if (data) {
      setFee(data.fee ? `${data.fee} Birr` : "Contact EGA");
      setStartDate(data.start_date || "Coming Soon");
    }
  }

  async function handleLogin() {
    if (loading) return;

    const cleanStudentId = studentId.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    setMessage("Checking login...");
    setStudent(null);

    if (!cleanStudentId || !cleanPhone) {
      setMessage("⚠️ Please enter Student ID and Phone Number");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", cleanStudentId)
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

    const savedPhone = String(data.phone || "").replace(/\D/g, "");

    if (cleanPhone !== savedPhone) {
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

  useEffect(() => {
    loadSettings();
  }, []);

  const progressValue = Number(student?.progress || 0);
  const quizScore = Number(student?.quiz_score || 0);
  const quizPassed =
    student?.quiz_passed === true ||
    student?.quiz_status === "Passed" ||
    quizScore >= 70;

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Link href="/" style={styles.homeButton}>← Home</Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>🎓</Text>
        <Text style={styles.title}>Learner Portal</Text>
        <Text style={styles.subtitle}>Login to view payment, progress, quiz, and certificate status</Text>
      </View>

      {!student && (
        <View style={styles.card}>
          <Text style={styles.label}>Student ID</Text>
          <TextInput style={styles.input} placeholder="Example: EGA-2026-0016" value={studentId} onChangeText={setStudentId} autoCapitalize="characters" />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Example: 6135135109" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <TouchableOpacity style={[styles.loginButton, loading && styles.disabledButton]} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginText}>{loading ? "Checking..." : "Login"}</Text>
          </TouchableOpacity>

          {!!message && <Text style={styles.message}>{message}</Text>}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Course Settings</Text>
        <Text style={styles.info}>Fee: {fee}</Text>
        <Text style={styles.info}>Start Date: {startDate}</Text>
      </View>

      {student && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Student Information</Text>
            <Text style={styles.name}>{student.full_name || student.name || "Student"}</Text>
            <Text style={styles.info}>Student ID: {student.student_id || "N/A"}</Text>
            <Text style={styles.info}>Phone: {student.phone || "N/A"}</Text>
            <Text style={styles.info}>Email: {student.email || "Not added"}</Text>
            <Text style={styles.info}>Course: {student.course || "Full Web Development"}</Text>
            <Text style={styles.info}>Registered: {student.created_at ? new Date(student.created_at).toLocaleString() : "Not available"}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Status</Text>
            <Text style={[styles.bigStatus, student.payment_status === "Paid" ? styles.paid : styles.pending]}>
              {student.payment_status || "Pending"}
            </Text>
            <Text style={styles.info}>Method: {student.payment_method || "Not Selected"}</Text>
            <Text style={styles.info}>Paid Date: {student.paid_at ? new Date(student.paid_at).toLocaleString() : "Not paid yet"}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Course Progress</Text>
            <Text style={styles.progressText}>{progressValue}% Completed</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progressValue, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Quiz Status</Text>
            <Text style={[styles.bigStatus, quizPassed ? styles.paid : styles.pending]}>
              {quizPassed ? "Passed" : "Not Passed"}
            </Text>
            <Text style={styles.info}>Score: {quizScore}%</Text>
            <Text style={styles.info}>Pass Mark: 70%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Certificate Status</Text>
            <Text style={[styles.bigStatus, student.certificate_status === "Ready" ? styles.ready : styles.pending]}>
              {student.certificate_status || "Not Ready"}
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#f4f6fb", minHeight: "100%" },
  homeButton: { backgroundColor: "#234c9f", color: "#fff", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, fontWeight: "bold", alignSelf: "flex-start", marginBottom: 15 },
  hero: { backgroundColor: "#062b8f", padding: 35, borderRadius: 18, marginBottom: 18, alignItems: "center" },
  icon: { fontSize: 36, marginBottom: 10 },
  title: { color: "#fff", fontSize: 30, fontWeight: "bold" },
  subtitle: { color: "#fff", fontSize: 14, marginTop: 8, textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 14, marginBottom: 18 },
  label: { fontWeight: "bold", color: "#10245c", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 16, backgroundColor: "#fff" },
  loginButton: { backgroundColor: "#f1c400", padding: 16, borderRadius: 30, alignItems: "center", marginTop: 5 },
  disabledButton: { opacity: 0.6 },
  loginText: { color: "#111", fontWeight: "bold", fontSize: 16 },
  message: { marginTop: 14, textAlign: "center", fontWeight: "bold", color: "#10245c" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#10245c", marginBottom: 12 },
  name: { fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 10 },
  info: { fontSize: 15, marginBottom: 7, color: "#222" },
  bigStatus: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  paid: { color: "#16a34a" },
  ready: { color: "#16a34a" },
  pending: { color: "#ca8a04" },
  progressText: { fontSize: 20, fontWeight: "bold", color: "#1e3a8a", marginBottom: 10 },
  progressBar: { height: 18, backgroundColor: "#e5e7eb", borderRadius: 20, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#2563eb" },
  logoutButton: { backgroundColor: "#b00020", padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 25 },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
