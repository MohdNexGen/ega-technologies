import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { supabase } from "../lib/supabase";

const ADMIN_PASSWORD = "EGAADMIN2026";

export default function AdminStudents() {
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");

  function checkAdminPassword() {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setAdminMessage("");
    } else {
      setAdminMessage("❌ Wrong admin password");
    }
  }

  if (!adminLoggedIn) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>🔐 Admin Login</Text>
        <Text style={styles.subtitle}>Only EGA admin can access student payments.</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter admin password"
          secureTextEntry
          value={adminPassword}
          onChangeText={setAdminPassword}
        />

        <TouchableOpacity style={styles.paidButton} onPress={checkAdminPassword}>
          <Text style={styles.buttonText}>Login as Admin</Text>
        </TouchableOpacity>

        {adminMessage ? <Text style={styles.message}>{adminMessage}</Text> : null}

        <Link href="/" style={styles.backButton}>
          ← Back to Home
        </Link>
      </ScrollView>
    );
  }
  const [students, setStudents] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [partialAmounts, setPartialAmounts] = useState<any>({});

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

    await supabase.from("transactions").insert({
      student_id: student.student_id,
      student_name: student.name,
      amount: Number(student.remaining_amount || fee),
      payment_method: "Full Payment",
      note: "Marked full paid by admin",
    });

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

    setMessage("✅ Marked pending: " + student.name);
    loadStudents();
  }

  async function addPartialPayment(student: any) {
    const amount = Number(partialAmounts[student.id] || 0);
    const fee = Number(student.fee || 0);
    const oldPaid = Number(student.paid_amount || 0);

    if (!amount || amount <= 0) {
      setMessage("⚠️ Enter valid partial payment amount");
      return;
    }

    const newPaid = Math.min(oldPaid + amount, fee);
    const remaining = Math.max(fee - newPaid, 0);
    const status = remaining === 0 ? "Paid" : "Partial Payment";
    const method = remaining === 0 ? "Full Payment" : "Partial Payment";

    const { error } = await supabase
      .from("students")
      .update({
        payment_status: status,
        payment_method: method,
        paid_amount: newPaid,
        remaining_amount: remaining,
        paid_at: new Date().toISOString(),
      })
      .eq("student_id", student.student_id);

    if (error) {
      setMessage("❌ Error adding partial payment: " + error.message);
      return;
    }

    await supabase.from("transactions").insert({
      student_id: student.student_id,
      student_name: student.name,
      amount,
      payment_method: "Partial Payment",
      note: "Partial payment added by admin",
    });

    setPartialAmounts({ ...partialAmounts, [student.id]: "" });
    setMessage("✅ Partial payment added: " + student.name);
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

          <TextInput
            style={styles.input}
            placeholder="Enter partial amount"
            keyboardType="numeric"
            value={partialAmounts[student.id] || ""}
            onChangeText={(value) =>
              setPartialAmounts({ ...partialAmounts, [student.id]: value })
            }
          />

          <TouchableOpacity style={styles.partialButton} onPress={() => addPartialPayment(student)}>
            <Text style={styles.buttonText}>➕ Add Partial Payment</Text>
          </TouchableOpacity>

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
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#cbd5e1", padding: 14, borderRadius: 12, fontSize: 18, marginBottom: 10 },
  partialButton: { backgroundColor: "#2563eb", padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  paidButton: { backgroundColor: "#16a34a", padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  pendingButton: { backgroundColor: "#ca8a04", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
