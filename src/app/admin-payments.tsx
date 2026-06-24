import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function searchStudent() {
    if (!search.trim()) {
      setMessage("⚠️ Enter Student ID or Phone");
      return;
    }

    setMessage("Searching...");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(`student_id.eq.${search.trim()},phone.eq.${search.trim()}`)
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
    setMessage("✅ Student found");
  }

  async function markPaid() {
    if (!student) return;

    const paidDate = new Date().toISOString();

    const { error } = await supabase
      .from("students")
      .update({
        payment_status: "Paid",
        payment_method: "Manual",
        paid_at: paidDate,
      })
      .eq("id", student.id);

    if (error) {
      setMessage("❌ " + error.message);
      return;
    }

    setStudent({
      ...student,
      payment_status: "Paid",
      payment_method: "Manual",
      paid_at: paidDate,
    });

    setMessage("✅ Payment updated to Paid");
  }

  async function markPending() {
    if (!student) return;

    const { error } = await supabase
      .from("students")
      .update({
        payment_status: "Pending",
        payment_method: "Not Selected",
        paid_at: null,
      })
      .eq("id", student.id);

    if (error) {
      setMessage("❌ " + error.message);
      return;
    }

    setStudent({
      ...student,
      payment_status: "Pending",
      payment_method: "Not Selected",
      paid_at: null,
    });

    setMessage("✅ Payment updated to Pending");
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/admin-dashboard")}
      >
        <Text style={styles.backText}>← Admin Dashboard</Text>
      </Pressable>

      <Text style={styles.title}>💳 Admin Payments</Text>

      <TextInput
        style={styles.input}
        placeholder="Student ID or Phone"
        value={search}
        onChangeText={setSearch}
      />

      <Pressable
        style={styles.searchButton}
        onPress={searchStudent}
      >
        <Text style={styles.buttonText}>Search Student</Text>
      </Pressable>

      {!!message && (
        <Text style={styles.message}>{message}</Text>
      )}

      {student && (
        <View style={styles.card}>
          <Text style={styles.name}>
            {student.name || student.full_name}
          </Text>

          <Text>Student ID: {student.student_id}</Text>
          <Text>Phone: {student.phone}</Text>
          <Text>Email: {student.email}</Text>
          <Text>Course: {student.course}</Text>

          <Text style={styles.status}>
            Payment: {student.payment_status || "Pending"}
          </Text>

          <Text>
            Method: {student.payment_method || "Not Selected"}
          </Text>

          <Text>
            Paid Date:{" "}
            {student.paid_at
              ? new Date(student.paid_at).toLocaleString()
              : "Not paid yet"}
          </Text>

          <Pressable
            style={styles.paidButton}
            onPress={markPaid}
          >
            <Text style={styles.buttonText}>Mark Paid</Text>
          </Pressable>

          <Pressable
            style={styles.pendingButton}
            onPress={markPending}
          >
            <Text style={styles.buttonText}>Mark Pending</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    marginVertical: 15,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  paidButton: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  pendingButton: {
    backgroundColor: "orange",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});