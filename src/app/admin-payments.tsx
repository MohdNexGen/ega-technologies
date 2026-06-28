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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [message, setMessage] = useState("");

  async function searchStudent() {
    const value = search.trim();

    if (!value) {
      setMessage("⚠️ Enter Student ID or Phone");
      return;
    }

    setMessage("Searching...");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(`student_id.eq.${value},phone.eq.${value}`)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      setMessage("❌ Student not found");
      return;
    }

    const foundStudent = data[0];

    setStudent(foundStudent);
    setPaymentMethod(foundStudent.payment_method || "");
    setPaymentReference(foundStudent.payment_reference || "");
    setMessage("✅ Student found");
  }

  async function updatePayment(status: "Pending" | "Paid" | "Rejected") {
    if (!student) return;

    const paidDate = status === "Paid" ? new Date().toISOString() : null;

    const updateData = {
      payment_status: status,
      payment_method: paymentMethod.trim() || "Manual",
      payment_reference: paymentReference.trim() || "Not provided",
      paid_at: paidDate,
    };

    const { error } = await supabase
      .from("students")
      .update(updateData)
      .eq("id", student.id);

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    setStudent({
      ...student,
      ...updateData,
    });

    setMessage(`✅ Payment updated to ${status}`);
  }

  function statusStyle(status: string) {
    if (status === "Paid") return styles.paid;
    if (status === "Rejected") return styles.rejected;
    return styles.pending;
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.push("/admin-dashboard")}>
        <Text style={styles.backText}>← Admin Dashboard</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>💳 Admin Payments</Text>
        <Text style={styles.subtitle}>Search student and update payment status</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Search Student</Text>

        <TextInput
          style={styles.input}
          placeholder="Student ID or Phone"
          value={search}
          onChangeText={setSearch}
        />

        <Pressable style={styles.searchButton} onPress={searchStudent}>
          <Text style={styles.buttonText}>Search Student</Text>
        </Pressable>

        {!!message && <Text style={styles.message}>{message}</Text>}
      </View>

      {student && (
        <View style={styles.card}>
          <Text style={styles.name}>{student.name || "No name"}</Text>

          <Text style={styles.text}>Student ID: {student.student_id || "N/A"}</Text>
          <Text style={styles.text}>Phone: {student.phone || "Not added"}</Text>
          <Text style={styles.text}>Email: {student.email || "Not added"}</Text>
          <Text style={styles.text}>Course: {student.course || "Full Web Development"}</Text>
          <Text style={styles.text}>Fee: {student.fee ? `${student.fee} Birr` : "Not set"}</Text>

          <Text style={[styles.status, statusStyle(student.payment_status)]}>
            {student.payment_status || "Pending"}
          </Text>

          <Text style={styles.label}>Payment Method</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Bank Transfer, Cash, Telebirr"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
          />

          <Text style={styles.label}>Payment Reference</Text>
          <TextInput
            style={styles.input}
            placeholder="Receipt number or transaction reference"
            value={paymentReference}
            onChangeText={setPaymentReference}
          />

          <Text style={styles.text}>
            Paid Date:{" "}
            {student.paid_at
              ? new Date(student.paid_at).toLocaleString()
              : "Not paid yet"}
          </Text>

          <Pressable style={styles.paidButton} onPress={() => updatePayment("Paid")}>
            <Text style={styles.buttonText}>Mark Paid</Text>
          </Pressable>

          <Pressable style={styles.pendingButton} onPress={() => updatePayment("Pending")}>
            <Text style={styles.buttonText}>Mark Pending</Text>
          </Pressable>

          <Pressable style={styles.rejectedButton} onPress={() => updatePayment("Rejected")}>
            <Text style={styles.buttonText}>Mark Rejected</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#eef2ff" },
  content: { padding: 18, paddingBottom: 40 },
  backButton: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  backText: { color: "#fff", fontWeight: "bold" },
  header: {
    backgroundColor: "#1e3a8a",
    padding: 28,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 30, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { color: "#fff", marginTop: 8, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 12,
  },
  text: { fontSize: 16, color: "#475569", marginBottom: 8, lineHeight: 23 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  message: {
    marginTop: 14,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
  },
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 14,
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
  },
  paid: { color: "#166534", backgroundColor: "#dcfce7" },
  pending: { color: "#854d0e", backgroundColor: "#fef3c7" },
  rejected: { color: "#991b1b", backgroundColor: "#fee2e2" },
  paidButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  pendingButton: {
    backgroundColor: "#ca8a04",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  rejectedButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
