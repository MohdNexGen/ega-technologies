import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const totalAccounts = students.reduce((sum, s) => sum + (Number(s.fee) || 0), 0);
  const totalPaid = students
    .filter((s) => s.payment_status === "Paid")
    .reduce((sum, s) => sum + (Number(s.fee) || 0), 0);
  const totalPending = totalAccounts - totalPaid;

  async function loadStudents() {
    setLoading(true);

    const { data } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    setStudents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/admin-dashboard" style={styles.back}>← Back to Admin Dashboard</Link>

      <Text style={styles.title}>📋 Latest 10 Students</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>💰 Account Summary</Text>
        <Text style={styles.summaryText}>Subtotal Accounts: {students.length}</Text>
        <Text style={styles.summaryText}>Total Sum: {totalAccounts} Birr</Text>
        <Text style={styles.paid}>Paid Total: {totalPaid} Birr</Text>
        <Text style={styles.pending}>Pending Total: {totalPending} Birr</Text>
      </View>

      {loading && <Text style={styles.message}>Loading students...</Text>}

      {!loading && students.length === 0 && (
        <Text style={styles.message}>No students registered yet.</Text>
      )}

      {students.map((s) => (
        <View key={s.id} style={styles.card}>
          <Text style={styles.name}>{s.name}</Text>
          <Text>Student ID: {s.student_id}</Text>
          <Text>Email: {s.email}</Text>
          <Text>Phone: {s.phone}</Text>
          <Text>Course: {s.course}</Text>
          <Text>Fee: {s.fee} Birr</Text>
          <Text>Status: {s.payment_status}</Text>
          <Text>Registered: {s.created_at}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#eef6ff" },
  back: { fontSize: 18, color: "#003366", fontWeight: "bold", marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 20 },
  summaryBox: { backgroundColor: "#fff", padding: 20, borderRadius: 16, marginBottom: 25 },
  summaryTitle: { fontSize: 24, fontWeight: "bold", color: "#003366", marginBottom: 12 },
  summaryText: { fontSize: 18, marginBottom: 6 },
  paid: { fontSize: 18, color: "#166534", fontWeight: "bold", marginBottom: 6 },
  pending: { fontSize: 18, color: "#ca8a04", fontWeight: "bold" },
  message: { fontSize: 18, textAlign: "center", marginTop: 20 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 14, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: "bold", color: "#003366", marginBottom: 8 },
});
