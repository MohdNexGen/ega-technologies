import { Link } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminPayments() {
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function searchStudent() {
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setMessage("⚠️ Enter Phone Number");
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
    setMessage("✅ Student found");
  }

  async function updatePayment(status: "Paid" | "Pending") {
    if (!student) return;

    const { error } = await supabase
      .from("students")
      .update({
        payment_status: status,
        payment_method: "Manual",
      })
      .eq("id", student.id);

    if (error) {
      setMessage("❌ Update error: " + error.message);
      return;
    }

    setStudent({
      ...student,
      payment_status: status,
      payment_method: "Manual",
    });

    setMessage(`✅ Payment marked as ${status}`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/admin-dashboard" style={styles.homeButton}>
        ← Dashboard
      </Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>💳</Text>
        <Text style={styles.title}>Payment Management</Text>
        <Text style={styles.subtitle}>Search student by phone and update payment</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Phone Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Example: 6135135109"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.searchButton} onPress={searchStudent}>
          <Text style={styles.buttonText}>Search Student</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      {student && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Payment</Text>

          <Text style={styles.info}>Name: {student.name || "Not added"}</Text>
          <Text style={styles.info}>Phone: {student.phone || "Not added"}</Text>
          <Text style={styles.info}>Email: {student.email || "Not added"}</Text>
          <Text style={styles.info}>Course: {student.course || "Full Web Development"}</Text>
          <Text style={styles.info}>Fee: {student.fee || "Not added"} Birr</Text>
          <Text style={styles.info}>Status: {student.payment_status || "Pending"}</Text>

          <TouchableOpacity
            style={styles.paidButton}
            onPress={() => updatePayment("Paid")}
          >
            <Text style={styles.paidText}>Mark as Paid</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pendingButton}
            onPress={() => updatePayment("Pending")}
          >
            <Text style={styles.paidText}>Mark as Pending</Text>
          </TouchableOpacity>
        </View>
      )}
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
    padding: 35,
    borderRadius: 18,
    marginBottom: 18,
    alignItems: "center",
  },
  icon: {
    fontSize: 36,
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
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    color: "#10245c",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#f1c400",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    marginTop: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#10245c",
  },
  info: {
    fontSize: 15,
    marginBottom: 7,
    color: "#222",
  },
  paidButton: {
    backgroundColor: "#008000",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
  },
  pendingButton: {
    backgroundColor: "#b00020",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },
  paidText: {
    color: "#fff",
    fontWeight: "bold",
  },
});