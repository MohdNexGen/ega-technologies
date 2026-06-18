import { Link } from "expo-router";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🏫</Text>
        <Text style={styles.title}>Najash College</Text>
        <Text style={styles.subtitle}>
          Learn Web Development in English, Arabic, and Somali.
        </Text>

        <Link href="/register" asChild>
          <Pressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Start Learning</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/explore" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>📚 Courses</Text>
          <Text style={styles.cardText}>HTML, CSS, JavaScript, React</Text>
        </Pressable>
      </Link>

      <Link href="/portal" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>🎓 Student Portal</Text>
          <Text style={styles.cardText}>Login, quiz, progress, certificate</Text>
        </Pressable>
      </Link>

      <Link href="/payments" asChild>
        <Pressable style={styles.card}>
          <Text style={styles.cardTitle}>💳 Payments</Text>
          <Text style={styles.cardText}>Course fee: 3000 ETB</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#eef3ff" },
  hero: {
    backgroundColor: "#1e3a8a",
    paddingTop: 80,
    paddingBottom: 45,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  logo: { fontSize: 50, marginBottom: 15 },
  title: { fontSize: 36, color: "white", fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, color: "white", marginTop: 12, textAlign: "center" },
  heroButton: {
    backgroundColor: "#facc15",
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
  },
  heroButtonText: { color: "#1e3a8a", fontSize: 20, fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    margin: 14,
    padding: 22,
    borderRadius: 18,
  },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#1e3a8a" },
  cardText: { fontSize: 17, color: "#334155", marginTop: 10 },
});