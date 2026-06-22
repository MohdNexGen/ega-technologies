import { Link } from "expo-router";
import { ScrollView, Text, StyleSheet, View } from "react-native";

export default function AdminDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/" style={styles.homeButton}>
        ← Home
      </Link>

      <View style={styles.hero}>
        <Text style={styles.icon}>📊</Text>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>
          EGA Technologies management system
        </Text>
      </View>

      <Link href="/admin-students" style={styles.linkButton}>
        📋 Student List
      </Link>

      <Link href="/admin-payments" style={styles.linkButton}>
        💳 Payment Management
      </Link>

      <Link href="/fee-settings" style={styles.linkButton}>
        ⚙️ Fee Settings
      </Link>

      <Link href="/learner-portal" style={styles.linkButton}>
        🎓 Learner Portal
      </Link>
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
    marginTop: 8,
    textAlign: "center",
  },
  linkButton: {
    backgroundColor: "#234c9f",
    color: "#fff",
    padding: 16,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 14,
  },
});