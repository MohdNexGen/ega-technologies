import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadStudents() {
    setMessage("Loading students...");

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    setStudents(data || []);
    setMessage(
      data && data.length > 0
        ? ""
        : "No students registered yet."
    );
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Admin Students</Text>
      <Text style={styles.subtitle}>
        Latest 10 registered EGA students
      </Text>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={loadStudents}
      >
        <Text style={styles.refreshText}>Refresh Students</Text>
      </TouchableOpacity>

      {!!message && (
        <Text style={styles.message}>{message}</Text>
      )}

      {students.map((student, index) => (
        <View
          key={student.id || index}
          style={styles.card}
        >
          <Text style={styles.name}>
            {student.name ||
              student.full_name ||
              "No Name"}
          </Text>

          <Text style={styles.info}>
            Student ID: {student.student_id || "N/A"}
          </Text>

          <Text style={styles.info}>
            Phone: {student.phone || "N/A"}
          </Text>

          <Text style={styles.info}>
            Email: {student.email || "N/A"}
          </Text>

          <Text style={styles.info}>
            Course: {student.course || "N/A"}
          </Text>

          <Text style={styles.info}>
            Fee: {student.fee || "N/A"}
          </Text>

          <Text style={styles.info}>
            Payment:{" "}
            {student.payment_status || "Pending"}
          </Text>

          <Text style={styles.info}>
            Registered:{" "}
            {student.created_at
              ? new Date(
                  student.created_at
                ).toLocaleString()
              : "N/A"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 18,
  },
  refreshText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  message: {
    color: "#facc15",
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  name: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  info: {
    color: "#cbd5e1",
    fontSize: 15,
    marginBottom: 5,
  },
});