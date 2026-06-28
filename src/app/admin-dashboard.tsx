import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFinanceSummary();
  }, []);

  async function loadFinanceSummary() {
    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("fee, paid_amount, remaining_amount");

    if (error) {
      console.log("Finance summary error:", error.message);
      setLoading(false);
      return;
    }

    const students = data || [];

    const fees = students.reduce((sum, s) => sum + Number(s.fee || 0), 0);
    const collected = students.reduce((sum, s) => sum + Number(s.paid_amount || 0), 0);
    const outstanding = students.reduce((sum, s) => sum + Number(s.remaining_amount || 0), 0);

    setTotalStudents(students.length);
    setTotalFees(fees);
    setTotalCollected(collected);
    setTotalOutstanding(outstanding);
    setLoading(false);
  }

  function money(value: number) {
    return `${value.toLocaleString()} ETB`;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🛠️ Admin Dashboard</Text>
      <Text style={styles.subtitle}>EGA Technologies management system</Text>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>💰 Finance Summary</Text>

        {loading ? (
          <Text style={styles.summaryText}>Loading finance summary...</Text>
        ) : (
          <>
            <Text style={styles.summaryText}>👨‍🎓 Total Students: {totalStudents}</Text>
            <Text style={styles.summaryText}>💰 Total Course Fees: {money(totalFees)}</Text>
            <Text style={styles.paid}>✅ Total Collected: {money(totalCollected)}</Text>
            <Text style={styles.pending}>⏳ Outstanding Balance: {money(totalOutstanding)}</Text>
          </>
        )}
      </View>

      <Link href="/admin-students" style={styles.linkButton}>
        📋 Student List
      </Link>

      <Link href="/fee-settings" style={styles.linkButton}>
        ⚙️ Fee Settings
      </Link>

      <Link href="/" style={styles.backButton}>
        ← Back to Home
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf2ff" },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003366",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#334155",
    marginBottom: 25,
  },
  summaryBox: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    marginBottom: 25,
  },
  summaryTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 15,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#1f2937",
    fontWeight: "bold",
  },
  paid: {
    fontSize: 20,
    color: "#166534",
    fontWeight: "bold",
    marginBottom: 10,
  },
  pending: {
    fontSize: 20,
    color: "#ca8a04",
    fontWeight: "bold",
    marginBottom: 5,
  },
  linkButton: {
    backgroundColor: "#003366",
    color: "#fff",
    padding: 18,
    borderRadius: 14,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  backButton: {
    color: "#003366",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
