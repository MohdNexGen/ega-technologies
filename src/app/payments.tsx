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
  const [phone, setPhone] = useState("");
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
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setMessage("⚠️ Enter your phone number");
      return;
    }

    setMessage("Searching...");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("phone", cleanPhone)
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

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.scrollContent}>
      <View style={styles.topRow}>
        <Pressable style={styles.navButton} onPress={() => router.push("/")}>
          <Text style={styles.navText}>← Home</Text>
        </Pressable>

        <Pressable
          style={styles.navButton}
          onPress={() => router.push("/admin-dashboard")}
        >
          <Text style={styles.navText}>← Admin</Text>
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>💳 Payments</Text>
        <Text style={styles.subtitle}>EGA Technologies Payment Center</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Search Payment</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Pressable style={styles.searchButton} onPress={searchPayment}>
          <Text style={styles.searchButtonText}>Check Payment Status</Text>
        </Pressable>

        {!!message && <Text style={styles.message}>{message}</Text>}

        {student && (
          <View style={styles.resultBox}>
            <Text style={styles.cardTitle}>Student Details</Text>

            <Text style={styles.text}>
              Name: {student.name || student.full_name || "Not added"}
            </Text>
            <Text style={styles.text}>
              Student ID: {student.student_id || "N/A"}
            </Text>
            <Text style={styles.text}>Phone: {student.phone || "Not added"}</Text>
            <Text style={styles.text}>Email: {student.email || "Not added"}</Text>
            <Text style={styles.text}>
              Course: {student.course || "Full Web Development"}
            </Text>

            <Text
              style={[
                styles.status,
                student.payment_status === "Paid" ? styles.paid : styles.pending,
              ]}
            >
              Payment: {student.payment_status || "Pending"}
            </Text>

            <Text style={styles.text}>
              Method: {student.payment_method || "Not selected"}
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
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start Date</Text>
        <Text style={styles.text}>{startDate}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Method</Text>
        <Text style={styles.text}>Bank Transfer, Cash, Mobile Payment</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notice</Text>
        <Text style={styles.text}>Online payment integration coming soon.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#eef2ff" },
  scrollContent: { paddingBottom: 25 },
  topRow: {
    flexDirection: "row",
    gap: 10,
    padding: 15,
    paddingTop: 20,
  },
  navButton: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  navText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#1e3a8a",
    padding: 35,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 5,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white" },
  subtitle: { color: "white", marginTop: 10, fontSize: 16 },
  card: {
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 10,
  },
  amount: { fontSize: 28, fontWeight: "bold", color: "#16a34a" },
  text: { fontSize: 16, color: "#475569", marginBottom: 6 },
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 10,
  },
  paid: { color: "#16a34a" },
  pending: { color: "#ca8a04" },
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
  searchButtonText: {
    color: "#111827",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    marginTop: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  resultBox: {
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },
});