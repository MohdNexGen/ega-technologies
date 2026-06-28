import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function PaymentsScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [fee, setFee] = useState("Contact EGA");
  const [startDate, setStartDate] = useState("Coming Soon");
  const [message, setMessage] = useState("");

  async function loadSettings() {
    const { data } = await supabase
      .from("settings")
      .select("*")
      .eq("key", "course_settings")
      .maybeSingle();

    if (data) {
      setFee(data.fee ? `${data.fee} Birr` : "Contact EGA");
      setStartDate(data.start_date || "Coming Soon");
    }
  }

  async function searchPayment() {
    const value = searchValue.trim();

    if (!value) {
      setMessage("⚠️ Enter your phone number or Student ID");
      return;
    }

    setMessage("Searching...");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(`phone.eq.${value},student_id.eq.${value}`)
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

    setStudent(data[0]);
    setMessage("✅ Payment record found");
  }

  function statusStyle(status: string) {
    if (status === "Paid") return styles.paid;
    if (status === "Rejected") return styles.rejected;
    return styles.pending;
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.scrollContent}>
      <View style={styles.topRow}>
        <Pressable style={styles.navButton} onPress={() => router.push("/")}>
          <Text style={styles.navText}>← Home</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => router.push("/admin-dashboard")}>
          <Text style={styles.navText}>Admin</Text>
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>💳 Payments</Text>
        <Text style={styles.subtitle}>Check your EGA payment status</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Search Payment Record</Text>
        <Text style={styles.helperText}>
          Enter your phone number or Student ID to check your payment status.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Phone number or Student ID"
          value={searchValue}
          onChangeText={setSearchValue}
        />

        <Pressable style={styles.searchButton} onPress={searchPayment}>
          <Text style={styles.searchButtonText}>Check Payment Status</Text>
        </Pressable>

        {!!message && <Text style={styles.message}>{message}</Text>}

        {student && (
          <View style={styles.resultBox}>
            <Text style={styles.sectionTitle}>Student Details</Text>
            <Text style={styles.text}>Name: {student.name || "Not added"}</Text>
            <Text style={styles.text}>Student ID: {student.student_id || "N/A"}</Text>
            <Text style={styles.text}>Phone: {student.phone || "Not added"}</Text>
            <Text style={styles.text}>Email: {student.email || "Not added"}</Text>
            <Text style={styles.text}>Course: {student.course || "Full Web Development"}</Text>

            <Text style={[styles.status, statusStyle(student.payment_status)]}>
              {student.payment_status || "Pending"}
            </Text>

            <Text style={styles.text}>Fee: {student.fee ? `${student.fee} Birr` : fee}</Text>
            <Text style={styles.text}>Method: {student.payment_method || "Not selected"}</Text>
            <Text style={styles.text}>
              Reference: {student.payment_reference || "Not provided"}
            </Text>
            <Text style={styles.text}>
              Paid Date:{" "}
              {student.paid_at
                ? new Date(student.paid_at).toLocaleString()
                : "Not paid yet"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Course Fee</Text>
        <Text style={styles.amount}>{fee}</Text>
        <Text style={styles.text}>Start Date: {startDate}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Instructions</Text>
        <Text style={styles.text}>1. Pay using bank transfer, cash, or mobile payment.</Text>
        <Text style={styles.text}>2. Keep your receipt or transaction reference.</Text>
        <Text style={styles.text}>3. Contact EGA admin with your Student ID and payment reference.</Text>
        <Text style={styles.text}>4. Admin will approve your payment after checking.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Status Meaning</Text>
        <Text style={styles.text}>🟡 Pending: Payment not approved yet.</Text>
        <Text style={styles.text}>🟢 Paid: Payment approved by admin.</Text>
        <Text style={styles.text}>🔴 Rejected: Payment needs correction.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Upgrade</Text>
        <Text style={styles.text}>
          Admin payment approval page, payment method update, reference number, and payment history.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#eef2ff" },
  scrollContent: { paddingBottom: 30 },
  topRow: { flexDirection: "row", gap: 10, padding: 15, paddingTop: 20 },
  navButton: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  navText: { color: "#ffffff", fontWeight: "bold" },
  header: {
    backgroundColor: "#1e3a8a",
    padding: 35,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 5,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white" },
  subtitle: { color: "white", marginTop: 10, fontSize: 16, textAlign: "center" },
  card: { backgroundColor: "white", margin: 15, padding: 20, borderRadius: 15 },
  cardTitle: { fontSize: 21, fontWeight: "bold", color: "#1e3a8a", marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#1e3a8a", marginBottom: 10 },
  helperText: { fontSize: 15, color: "#64748b", marginBottom: 12, lineHeight: 22 },
  amount: { fontSize: 30, fontWeight: "bold", color: "#16a34a", marginBottom: 8 },
  text: { fontSize: 16, color: "#475569", marginBottom: 7, lineHeight: 24 },
  status: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
  },
  paid: { color: "#166534", backgroundColor: "#dcfce7" },
  pending: { color: "#854d0e", backgroundColor: "#fef3c7" },
  rejected: { color: "#991b1b", backgroundColor: "#fee2e2" },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  searchButton: {
    backgroundColor: "#facc15",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  searchButtonText: { color: "#111827", fontWeight: "bold", fontSize: 16 },
  message: { marginTop: 14, textAlign: "center", fontWeight: "bold", color: "#1e3a8a" },
  resultBox: {
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },
});
