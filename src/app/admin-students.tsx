import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  async function loadStudents() {
    setMessage("Loading students...");

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    setStudents(data || []);
    setMessage(data && data.length > 0 ? "" : "No students registered yet.");
  }

  async function searchStudents() {
    const clean = search.trim();

    if (!clean) {
      loadStudents();
      return;
    }

    setMessage("Searching...");

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(`student_id.eq.${clean},phone.eq.${clean},name.ilike.%${clean}%`)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("❌ Search error: " + error.message);
      return;
    }

    setStudents(data || []);
    setMessage(data && data.length > 0 ? "" : "No matching student found.");
  }

  async function updateStudent(studentId: number, updates: any) {
    setMessage("Updating student...");

    const { error } = await supabase
      .from("students")
      .update(updates)
      .eq("id", studentId);

    if (error) {
      setMessage("❌ Update error: " + error.message);
      return;
    }

    setMessage("✅ Student updated");
    loadStudents();
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Link href="/admin-dashboard" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Admin Dashboard</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Admin Students</Text>
      <Text style={styles.subtitle}>
        Search students, update progress, and certificate status
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search by Student ID, phone, or name"
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={styles.refreshButton} onPress={searchStudents}>
        <Text style={styles.refreshText}>Search Students</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.grayButton} onPress={loadStudents}>
        <Text style={styles.refreshText}>Refresh All Students</Text>
      </TouchableOpacity>

      {!!message && <Text style={styles.message}>{message}</Text>}

      {students.map((student, index) => (
        <View key={student.id || index} style={styles.card}>
          <Text style={styles.name}>
            {student.name || student.full_name || "No Name"}
          </Text>

          <Text style={styles.info}>Student ID: {student.student_id || "N/A"}</Text>
          <Text style={styles.info}>Phone: {student.phone || "N/A"}</Text>
          <Text style={styles.info}>Email: {student.email || "N/A"}</Text>
          <Text style={styles.info}>Course: {student.course || "N/A"}</Text>
          <Text style={styles.info}>Fee: {student.fee || "N/A"}</Text>
          <Text style={styles.info}>Payment: {student.payment_status || "Pending"}</Text>
          <Text style={styles.info}>Progress: {student.progress || 0}%</Text>
          <Text style={styles.info}>
            Certificate: {student.certificate_status || "Not Ready"}
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() =>
                updateStudent(student.id, { certificate_status: "Ready" })
              }
            >
              <Text style={styles.buttonText}>Certificate Ready</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.orangeButton}
              onPress={() =>
                updateStudent(student.id, { certificate_status: "Not Ready" })
              }
            >
              <Text style={styles.buttonText}>Not Ready</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {[0, 25, 50, 75, 100].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.smallButton}
                onPress={() => updateStudent(student.id, { progress: value })}
              >
                <Text style={styles.buttonText}>{value}%</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.info}>
            Registered:{" "}
            {student.created_at
              ? new Date(student.created_at).toLocaleString()
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
  input: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  refreshButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  grayButton: {
    backgroundColor: "#475569",
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  greenButton: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  orangeButton: {
    backgroundColor: "#ca8a04",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  smallButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
  },
});