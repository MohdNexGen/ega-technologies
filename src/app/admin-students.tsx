import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("Loading students...");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setMessage("Loading students...");

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    const uniqueStudents: any[] = [];

    (data || []).forEach((student) => {
      const nameKey = String(student.name || "").trim().toLowerCase();

      if (!nameKey) return;

      const alreadyExists = uniqueStudents.some(
        (item) =>
          String(item.name || "").trim().toLowerCase() === nameKey
      );

      if (!alreadyExists) {
        uniqueStudents.push(student);
      }
    });

    setStudents(uniqueStudents.slice(0, 10));
    setMessage("");
  }

  async function deleteStudent(id: number) {
    const confirmed = window.confirm("Delete this student?");

    if (!confirmed) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage("❌ Delete error: " + error.message);
      return;
    }

    setMessage("✅ Student deleted");
    loadStudents();
  }

  const filteredStudents = students.filter((student) => {
    const q = search.toLowerCase();

    return (
      (student.name || "").toLowerCase().includes(q) ||
      (student.phone || "").toLowerCase().includes(q) ||
      (student.email || "").toLowerCase().includes(q) ||
      (student.course || "").toLowerCase().includes(q) ||
      (student.payment_status || "").toLowerCase().includes(q)
    );
  });

  const paidStudents = filteredStudents.filter(
    (student) => student.payment_status === "Paid"
  ).length;

  const pendingStudents = filteredStudents.length - paidStudents;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/admin-dashboard" style={styles.homeButton}>
        ← Dashboard
      </Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>📋</Text>
        <Text style={styles.title}>Admin Student List</Text>
        <Text style={styles.subtitle}>Latest 10 unique students</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Search by name, phone, email, course, payment"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={loadStudents}>
        <Text style={styles.refreshText}>Refresh List</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Showing Students: {filteredStudents.length}
        </Text>
        <Text style={styles.summaryText}>Paid: {paidStudents}</Text>
        <Text style={styles.summaryText}>Pending: {pendingStudents}</Text>
      </View>

      {filteredStudents.map((student, index) => (
        <View key={student.id || index} style={styles.studentCard}>
          <Text style={styles.name}>
            {index + 1}. {student.name || "No Name"}
          </Text>

          <Text style={styles.info}>📱 {student.phone || "Not added"}</Text>
          <Text style={styles.info}>📧 {student.email || "Not added"}</Text>
          <Text style={styles.info}>📚 {student.course || "Not assigned"}</Text>
          <Text style={styles.info}>💰 Fee: {student.fee || 3000}</Text>

          <Text
            style={[
              styles.status,
              {
                color: student.payment_status === "Paid" ? "green" : "red",
              },
            ]}
          >
            Payment: {student.payment_status || "Pending"}
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteStudent(student.id)}
          >
            <Text style={styles.deleteText}>🗑 Delete Student</Text>
          </TouchableOpacity>
        </View>
      ))}
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
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 18,
  },
  icon: {
    fontSize: 34,
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
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  refreshButton: {
    backgroundColor: "#f1c400",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  refreshText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 15,
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 15,
    marginBottom: 4,
  },
  studentCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 10,
  },
  info: {
    fontSize: 15,
    marginBottom: 5,
  },
  status: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});