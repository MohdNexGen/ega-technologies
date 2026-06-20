import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function CoursesPage() {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.back}>
        ← Home
      </Link>

      <Text style={styles.title}>📚 Courses</Text>
      <Text style={styles.subtitle}>Learn professional skills at EGA Technologies</Text>

      <Link href="/courses/full-web" style={styles.card}>
        <Text style={styles.cardTitle}>💻 Full Web Development</Text>
        <Text>HTML, CSS, JavaScript, React</Text>
      </Link>

      <Link href="/courses/arabic-web" style={styles.card}>
        <Text style={styles.cardTitle}>🌐 Arabic Web Development</Text>
        <Text>Programming in Arabic</Text>
      </Link>

      <Link href="/courses/somali-web" style={styles.card}>
        <Text style={styles.cardTitle}>🇸🇴 Somali Web Development</Text>
        <Text>Programming in Somali</Text>
      </Link>

      <Link href="/courses/computer-skills" style={styles.card}>
        <Text style={styles.cardTitle}>🖥️ Computer Skills</Text>
        <Text>Windows, Word, Excel, PowerPoint</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  back: {
    marginBottom: 20,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
});