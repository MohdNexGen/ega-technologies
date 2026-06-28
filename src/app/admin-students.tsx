import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setMessage("Loading students...");

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      setMessage("❌ Error loading students: " + error.message);
      return;
    }

    setStudents(data || []);
    setMessage("");
  }

  async function markFullPaid(student: any) {
    const fee = Number(student.fee || 0);

    const { error } = await supabase
      .from("students")
      .update({
        payment_status: "Paid",
        payment_method: "Full Payment",
        paid_amount: fee,
        remaining_amount: 0,
        paid_at: new Date().toISOString(),
      })
      .eq("student_id", student.student_id);

    if (error) {
      setMessage("❌ Error marking full paid: " + error.message);
      return;
    }

    await supabase
      .from("transactions")
      .update({
        status: "Paid",
        paid_amount: fee,
        remaining_amount: 0,
      })
      .eq("student_id", student.student_id);

    setMessage("✅ Marked full paid: " + student.name);
    loadStudents();
  }

  async function markPending(student: any) {
    const fee = Number(student.fee || 0);

    const { error } = await supabase
      .from("students")
      .update({
        payment_status: "Pending",
        payment_method: "Not Selected",
        paid_amount: 0,
        remaining_amount: fee,
        paid_at: null,
      })
      .eq("student_id", student.student_id);

    if (error) {
      setMessage("❌ Error marking pending: " + error.message);
      return;
    }

    await supabase
      .from("transactions")
      .update({
        status: "Pending",
        paid_amount: 0,
        remaining_amount: fee,
      })
      .eq("student_id", student.student_id);

    setMessage("✅ Marked pending: " + student.name);
    loadStudents();
  }

  function money(value: any) {
    return `${Number(value || 0).toLocaleString()} ETB`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/admin-dashboard" style={styles.backButton}>
        ← Back to Admin Dashboard
      </Link>

      <Text style={styles.title}>📋 Student List</Text>
      <Text style={styles.subtitle}>Latest 20 students with payment controls</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {students.map((student) => (
        <View key={student.id} style={styles.card}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.text}>Student ID: {student.student_id}</Text>
          <Text style={styles.text}>Email: {student.email}</Text>
          <Text style={styles.text}>Phone: {student.phone}</Text>
          <Text style={styles.text}>Course: {student.course}</Text>

          <View style={styles.paymentBox}>
            <Text style={styles.text}>Fee: {money(student.fee)}</Text>
            <Text style={styles.paid}>Paid: {money(student.paid_amount)}</Text>
            <Text style={styles.pending}>Remaining: {money(student.remaining_amount)}</Text>
            <Text style={styles.text}>Status: {student.payment_status}</Text>
            <Text style={styles.text}>Method: {student.payment_method}</Text>
          </View>

          <TouchableOpacity style={styles.paidButton} onPress={() => markFullPaid(student)}>
            <Text style={styles.buttonText}>✅ Mark Full Paid</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pendingButton} onPress={() => markPending(student)}>
            <Text style={styles.buttonText}>⏳ Mark Pending</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf2ff" },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { color: "#003366", fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 15 },
  title: { fontSize: 34, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 18, color: "#334155", textAlign: "center", marginBottom: 20 },
  message: { fontSize: 18, textAlign: "center", color: "#003366", fontWeight: "bold", marginBottom: 15 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 16, marginBottom: 18 },
  name: { fontSize: 24, fontWeight: "bold", color: "#003366", marginBottom: 8 },
  text: { fontSize: 17, marginBottom: 5, color: "#1f2937" },
  paymentBox: { backgroundColor: "#f8fafc", padding: 14, borderRadius: 12, marginVertical: 12 },
  paid: { fontSize: 18, color: "#166534", fontWeight: "bold", marginBottom: 5 },
  pending: { fontSize: 18, color: "#ca8a04", fontWeight: "bold", marginBottom: 5 },
  paidButton: { backgroundColor: "#16a34a", padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  pendingButton: { backgroundColor: "#ca8a04", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
