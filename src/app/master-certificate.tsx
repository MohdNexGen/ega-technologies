import { router } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function printCertificate() {
  if (typeof window !== "undefined") {
    window.print();
  }
}

export default function MasterCertificate() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function checkCertificate() {
    if (!studentId.trim()) {
      setMessage("⚠️ Enter Student ID");
      return;
    }

    setMessage("Checking master certificate...");
    setStudent(null);

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

    const completed =
      (data.html_certificate_status === "Ready" || data.html_completed === true || data.certificate_status === "Ready") &&
      (data.css_certificate_status === "Ready" || data.css_completed === true) &&
      (data.js_certificate_status === "Ready" || data.js_completed === true);

    if (!completed) {
      setMessage("🔒 Master Certificate locked. Complete HTML, CSS, and JavaScript certificates first.");
      return;
    }

    setStudent(data);
    setMessage("🎓 Master Certificate unlocked!");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/learner-portal")}>
        <Text style={styles.back}>← Back to Learner Portal</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🎓 Master Certificate</Text>
      <Text style={styles.subtitle}>
        Unlock this certificate after completing HTML, CSS, and JavaScript.
      </Text>

      {!student && (
        <View style={styles.card}>
          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={styles.input}
            value={studentId}
            onChangeText={setStudentId}
            placeholder="Example: EGA-123456789"
          />

          <TouchableOpacity style={styles.button} onPress={checkCertificate}>
            <Text style={styles.buttonText}>Check Master Certificate</Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      )}

      {student && (
        <View style={styles.certificate}>
          <Text style={styles.certHeader}>EGA TECHNOLOGIES</Text>
          <Text style={styles.certTitle}>Certificate of Completion</Text>

          <Text style={styles.certText}>This certifies that</Text>
          <Text style={styles.studentName}>{student.name}</Text>

          <Text style={styles.certText}>
            has successfully completed the full
          </Text>

          <Text style={styles.program}>
            Web Development Program
          </Text>

          <Text style={styles.certText}>
            including HTML, CSS, and JavaScript.
          </Text>

          <Text style={styles.detail}>Student ID: {student.student_id}</Text>
          <Text style={styles.detail}>Certificate No: MASTER-{student.student_id}</Text>
          <Text style={styles.detail}>Date: {new Date().toLocaleDateString()}</Text>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine}>________________________</Text>
            <Text style={styles.signature}>Director Signature</Text>
          </View>
        </View>
      )}
    
      <TouchableOpacity style={styles.printButton} onPress={printCertificate}>
        <Text style={styles.printButtonText}>📥 Download / Print Certificate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f7fb", minHeight: "100%" },
  back: { color: "#003366", fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  title: { fontSize: 34, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 17, color: "#444", textAlign: "center", marginBottom: 25, lineHeight: 25 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 14, borderWidth: 1, borderColor: "#ddd" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8, color: "#003366" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#bbb", padding: 14, borderRadius: 10, fontSize: 16, marginBottom: 15 },
  button: { backgroundColor: "#003366", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  message: { marginTop: 15, fontSize: 16, color: "#003366", fontWeight: "bold", textAlign: "center" },

  certificate: {
    backgroundColor: "#fffaf0",
    borderWidth: 4,
    borderColor: "#b8860b",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
  },
  certHeader: { fontSize: 24, fontWeight: "bold", color: "#003366", marginBottom: 15 },
  certTitle: { fontSize: 28, fontWeight: "bold", color: "#b8860b", textAlign: "center", marginBottom: 25 },
  certText: { fontSize: 18, color: "#333", textAlign: "center", marginVertical: 8 },
  studentName: { fontSize: 36, fontWeight: "bold", color: "#003366", textAlign: "center", marginVertical: 15 },
  program: { fontSize: 26, fontWeight: "bold", color: "#b8860b", textAlign: "center", marginVertical: 12 },
  detail: { fontSize: 16, color: "#333", marginTop: 8 },
  signatureBox: { marginTop: 35, alignItems: "center" },
  signatureLine: { fontSize: 18, color: "#333" },
  signature: { fontSize: 15, color: "#333", marginTop: 5 },

  printButton: {
    backgroundColor: "#0a66c2",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  printButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
});
