
import { Link } from "expo-router";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function HTMLLecture() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/learner-portal" style={styles.back}>← Back to Learner Portal</Link>

      <Text style={styles.title}>📘 HTML Full Lecture</Text>
      <Text style={styles.subtitle}>
        Complete HTML learning path before quiz. Study all 9 lessons carefully.
      </Text>

      {[
        ["1", "What is HTML?", "HTML means HyperText Markup Language. It is used to build the structure of web pages."],
        ["2", "HTML Document Structure", "<!DOCTYPE html>, html, head, title, and body are the main parts of every web page."],
        ["3", "Headings and Paragraphs", "Use h1 to h6 for headings and p for paragraphs."],
        ["4", "Links and Images", "Use a tag for links and img tag for pictures."],
        ["5", "Lists", "Use ul for unordered lists, ol for ordered lists, and li for list items."],
        ["6", "Tables", "Use table, tr, th, and td to show data in rows and columns."],
        ["7", "Forms", "Use form, input, label, textarea, select, and button to collect user data."],
        ["8", "Semantic HTML", "Use header, nav, main, section, article, aside, and footer for clean structure."],
        ["9", "Final Practice", "Build a full student profile page using headings, image, list, table, and form."]
      ].map((lesson) => (
        <View key={lesson[0]} style={styles.card}>
          <Text style={styles.lesson}>Lesson {lesson[0]}</Text>
          <Text style={styles.cardTitle}>{lesson[1]}</Text>
          <Text style={styles.text}>{lesson[2]}</Text>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Example:</Text>
            <Text style={styles.code}>
{lesson[0] === "1" && "<h1>Welcome to HTML</h1>"}
{lesson[0] === "2" && "<html>\\n  <head><title>My Page</title></head>\\n  <body>Hello</body>\\n</html>"}
{lesson[0] === "3" && "<h1>Main Title</h1>\\n<p>This is a paragraph.</p>"}
{lesson[0] === "4" && "<a href='https://example.com'>Visit Website</a>\\n<img src='student.jpg' alt='Student' />"}
{lesson[0] === "5" && "<ul>\\n  <li>HTML</li>\\n  <li>CSS</li>\\n</ul>"}
{lesson[0] === "6" && "<table>\\n  <tr><th>Name</th><th>Course</th></tr>\\n  <tr><td>Ali</td><td>HTML</td></tr>\\n</table>"}
{lesson[0] === "7" && "<form>\\n  <input type='text' placeholder='Name' />\\n  <button>Send</button>\\n</form>"}
{lesson[0] === "8" && "<header>Website Header</header>\\n<main>Main Content</main>\\n<footer>Footer</footer>"}
{lesson[0] === "9" && "<h1>Student Profile</h1>\\n<p>Name: Hassan</p>\\n<button>Register</button>"}
            </Text>
          </View>
        </View>
      ))}

      <Link href="/html-quiz" asChild>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizText}>Start HTML Quiz</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef3ff" },
  content: { padding: 20, paddingBottom: 50 },
  back: { fontSize: 18, color: "#003366", fontWeight: "bold", marginBottom: 20 },
  title: { fontSize: 34, fontWeight: "bold", color: "#003366", textAlign: "center" },
  subtitle: { fontSize: 18, color: "#475569", textAlign: "center", marginBottom: 25 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 16, marginBottom: 18 },
  lesson: { fontSize: 16, color: "#2563eb", fontWeight: "bold" },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#003366", marginVertical: 8 },
  text: { fontSize: 17, color: "#334155", lineHeight: 26 },
  exampleBox: { backgroundColor: "#0f172a", padding: 16, borderRadius: 12, marginTop: 15 },
  exampleTitle: { color: "#93c5fd", fontWeight: "bold", marginBottom: 8 },
  code: { color: "#e5e7eb", fontSize: 15, lineHeight: 22 },
  quizButton: { backgroundColor: "#16a34a", padding: 18, borderRadius: 14, alignItems: "center", marginTop: 20 },
  quizText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
