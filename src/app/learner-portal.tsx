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
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function cleanPhone(value: string) {
    return value.replace(/\D/g, "");
  }

  async function handleLogin() {
    if (loading) return;

    setLoading(true);
    setMessage("Checking login...");
    setStudent(null);
    setQuizResults([]);

    if (!studentId.trim() || !phone.trim()) {
      setMessage("⚠️ Please enter Student ID and Phone Number");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .maybeSingle();

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setMessage("❌ Student not found");
      setLoading(false);
      return;
    }

    if (cleanPhone(data.phone || "") !== cleanPhone(phone)) {
      setMessage("❌ Phone number does not match");
      setLoading(false);
      return;
    }

    const { data: results, error: quizError } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("student_id", data.student_id)
      .order("created_at", { ascending: false });

    if (quizError) {
      setMessage("⚠️ Login successful, but quiz results could not load: " + quizError.message);
    } else {
      setMessage("✅ Login successful");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("student_id", data.student_id);
    }

    setStudent(data);
    setQuizResults(results || []);
    setLoading(false);
  }

  function logout() {
    setStudent(null);
    setQuizResults([]);
    setStudentId("");
    setPhone("");
    setMessage("");
  }

  const isPaid = student?.payment_status === "Paid";
  const htmlPassed = quizResults.some(
    (q) => q.quiz_name === "HTML Quiz" && q.passed === true
  );

  const cssPassed = quizResults.some(
    (q) => q.quiz_name === "CSS Quiz" && q.passed === true
  );

  const jsPassed = quizResults.some(
    (q) => q.quiz_name === "JavaScript Quiz" && q.passed === true
  );

  const fullProgramPassed = htmlPassed && cssPassed && jsPassed;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/" style={styles.back}>← Back to Home</Link>

      <Text style={styles.title}>🎓 Learner Portal</Text>
      <Text style={styles.subtitle}>
        Login to view payment, progress, quiz, and certificate status.
      </Text>

      {!student && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>
              {loading ? "Checking..." : "Login"}
            </Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      )}

      {student && (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Student Information</Text>
            <Text style={styles.text}>Name: {student.name}</Text>
            <Text style={styles.text}>Student ID: {student.student_id}</Text>
            <Text style={styles.text}>Email: {student.email}</Text>
            <Text style={styles.text}>Phone: {student.phone}</Text>
            <Text style={styles.text}>Course: {student.course}</Text>
            <Text style={styles.text}>Language: {student.language}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Status</Text>

            <View style={isPaid ? styles.paidBox : styles.pendingBox}>
              <Text style={isPaid ? styles.paidText : styles.pendingText}>
                {isPaid ? "Paid" : "Pending"}
              </Text>
            </View>

            <Text style={styles.text}>Method: {student.payment_method || "Not Selected"}</Text>
            <Text style={styles.text}>Reference: {student.payment_reference || "Not Provided"}</Text>
            <Text style={styles.text}>Paid Date: {student.paid_at || "Not Paid Yet"}</Text>
            <Text style={styles.text}>Fee: {student.fee ? `${student.fee} Birr` : "Not Set"}</Text>

            {isPaid ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>
                  ✅ Payment confirmed. Lectures and quizzes are unlocked.
                </Text>

                <Link href="/html-lecture" asChild>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.buttonText}>Start HTML Course</Text>
                  </TouchableOpacity>
                </Link>

                <Link href="/css-lecture" asChild>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.buttonText}>Start CSS Course</Text>
                  </TouchableOpacity>
                </Link>

                <Link href="/javascript-lecture" asChild>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.buttonText}>Start JavaScript Course</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            ) : (
              <View style={styles.warningBox}>
                <Text style={styles.warningText}>
                  ⚠️ Payment pending. Complete payment to unlock lectures, quizzes, and certificates.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Quiz Results</Text>

            {quizResults.length === 0 ? (
              <Text style={styles.text}>No quiz results yet.</Text>
            ) : (
              quizResults.map((q, index) => (
                <View key={index} style={styles.quizRow}>
                  <Text style={styles.text}>
                    {q.quiz_name || "Quiz"}: {q.percentage ?? q.score}% {q.passed ? "✅ Passed" : "❌ Failed"}
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Certificate Status</Text>

            {isPaid && htmlPassed ? (
              <>
                <Text style={styles.successText}>
                  🎓 HTML Certificate Ready ✅
                </Text>

                <Link href="/html-certificate" asChild>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.buttonText}>Open HTML Certificate</Text>
                  </TouchableOpacity>
                </Link>
              </>
            ) : isPaid ? (
              <Text style={styles.text}>
                🔓 Certificate will unlock after passing the HTML quiz.
              </Text>
            ) : (
              <Text style={styles.text}>
                🔒 Certificate locked until full payment is confirmed.
              </Text>
            )}
          </View>


          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏆 Full Web Development Certificate</Text>

            {fullProgramPassed ? (
              <>
                <Text style={styles.successText}>
                  🎉 Congratulations! Full Web Development Certificate Ready ✅
                </Text>

                <Link href="/full-certificate" asChild>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.buttonText}>View Final Certificate</Text>
                  </TouchableOpacity>
                </Link>
              </>
            ) : (
              <Text style={styles.text}>
                🔒 Final certificate unlocks after passing HTML, CSS, and JavaScript quizzes.
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef3ff" },
  content: { padding: 20, paddingBottom: 50 },
  back: { fontSize: 18, color: "#003366", fontWeight: "bold", marginBottom: 20 },
  title: { fontSize: 36, fontWeight: "bold", color: "#003366", textAlign: "center" },
  subtitle: { fontSize: 18, color: "#475569", textAlign: "center", marginBottom: 25 },
  card: { backgroundColor: "#fff", padding: 22, borderRadius: 18, marginBottom: 22 },
  cardTitle: { fontSize: 26, fontWeight: "bold", color: "#003366", marginBottom: 18 },
  input: { backgroundColor: "#f8fafc", padding: 16, borderRadius: 12, marginBottom: 14, fontSize: 17, borderWidth: 1, borderColor: "#cbd5e1" },
  loginButton: { backgroundColor: "#003366", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  message: { marginTop: 15, fontSize: 17, textAlign: "center", color: "#003366", fontWeight: "bold" },
  text: { fontSize: 18, color: "#334155", marginBottom: 10 },
  quizRow: { borderBottomWidth: 1, borderBottomColor: "#e5e7eb", paddingVertical: 8 },
  paidBox: { backgroundColor: "#dcfce7", padding: 18, borderRadius: 12, marginBottom: 15, alignItems: "center" },
  paidText: { color: "#166534", fontSize: 28, fontWeight: "bold" },
  pendingBox: { backgroundColor: "#fef3c7", padding: 18, borderRadius: 12, marginBottom: 15, alignItems: "center" },
  pendingText: { color: "#92400e", fontSize: 28, fontWeight: "bold" },
  successBox: { backgroundColor: "#ecfdf5", padding: 16, borderRadius: 12, marginTop: 15 },
  successText: { color: "#166534", fontSize: 17, marginBottom: 15, fontWeight: "bold" },
  warningBox: { backgroundColor: "#fff7ed", padding: 16, borderRadius: 12, marginTop: 15 },
  warningText: { color: "#9a3412", fontSize: 17, fontWeight: "bold" },
  startButton: { backgroundColor: "#16a34a", padding: 16, borderRadius: 12, alignItems: "center" },
  logoutButton: { backgroundColor: "#b00020", padding: 16, borderRadius: 12, alignItems: "center" },
});
