import { Link } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function ExploreScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Link href="/" style={styles.backLink}>
        ← Back to Home
      </Link>

      <Text style={styles.title}>📚 EGA Courses</Text>
      <Text style={styles.subtitle}>
        Choose a course and start learning.
      </Text>

      {/* HTML Course */}
      <Link href="/courses/html" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>🌐</Text>
          <Text style={styles.cardTitle}>HTML Complete Course</Text>
          <Text style={styles.cardText}>
            Learn HTML from beginner to advanced with examples and practice.
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Future CSS Course */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.icon}>🎨</Text>
        <Text style={styles.cardTitle}>CSS Course</Text>
        <Text style={styles.cardText}>
          Coming Soon - Learn styling, layouts, Flexbox, and responsive design.
        </Text>
      </TouchableOpacity>

      {/* Future JavaScript Course */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.icon}>⚡</Text>
        <Text style={styles.cardTitle}>JavaScript Course</Text>
        <Text style={styles.cardText}>
          Coming Soon - Learn programming fundamentals and interactivity.
        </Text>
      </TouchableOpacity>

      {/* Computer Skills */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.icon}>💻</Text>
        <Text style={styles.cardTitle}>Computer Skills</Text>
        <Text style={styles.cardText}>
          Learn essential computer skills for beginners.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backLink: {
    color: "#0a66c2",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#102a43",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#486581",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#d9e2ec",
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#102a43",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#486581",
    lineHeight: 24,
  },
});