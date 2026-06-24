import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

export default function CertificatePage() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function checkCertificate() {
    setMessage("Checking certificate...");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .maybeSingle();

    if (error) {
      setMessage("❌ " + error.message);
      return;
    }

    if (!data) {
      setMessage("❌ Student not found");
      return;
    }

    if (!data.html_completed) {
      setMessage("❌ Complete and pass the HTML quiz first.");
      return;
    }

    setStudent(data);
    setMessage("🎓 Certificate Ready");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>HTML Certificate</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={checkCertificate}
      >
        <Text style={styles.buttonText}>Check Certificate</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {student && (
        <View style={styles.certificate}>
          <Text style={styles.certTitle}>
            🎓 CERTIFICATE OF COMPLETION
          </Text>

          <Text style={styles.certText}>
            This certifies that
          </Text>

          <Text style={styles.name}>{student.name}</Text>

          <Text style={styles.certText}>
            has successfully completed
          </Text>

          <Text style={styles.course}>
            HTML Fundamentals
          </Text>

          <Text style={styles.certText}>
            at EGA Technologies
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f7fb",
    minHeight: "100%",
  },
  back: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  certificate: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#d4af37",
    alignItems: "center",
  },
  certTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },
  certText: {
    fontSize: 18,
    marginVertical: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#b8860b",
    marginVertical: 15,
  },
  course: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366",
    marginVertical: 10,
  },
});