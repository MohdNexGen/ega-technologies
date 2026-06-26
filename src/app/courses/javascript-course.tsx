import { router } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function JavaScriptCoursePage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.push("/explore")}>
        <Text style={styles.back}>← Back to Courses</Text>
      </TouchableOpacity>

      <Text style={styles.title}>⚡ JavaScript Fundamentals</Text>
      <Text style={styles.subtitle}>
        Study the lessons first. After finishing the lecture, take the quiz.
      </Text>

      {[
        ["1. Introduction to JavaScript", "JavaScript makes websites interactive. HTML builds structure, CSS adds design, and JavaScript adds behavior."],
        ["2. Variables", "Variables store data. Use let for changeable values and const for values that should not change."],
        ["3. Data Types", "JavaScript has strings, numbers, booleans, arrays, objects, null, and undefined."],
        ["4. Operators", "Operators help with math, comparison, and logic, like +, -, >, <, ===, &&."],
        ["5. Conditions", "Conditions allow programs to make decisions using if, else if, and else."],
        ["6. Loops", "Loops repeat code. Common loops are for loops and while loops."],
        ["7. Functions", "Functions are reusable blocks of code that perform a task."],
        ["8. Arrays", "Arrays store lists of values, such as courses or student names."],
        ["9. Objects", "Objects store related data using key-value pairs."],
        ["10. DOM Manipulation", "The DOM lets JavaScript change webpage text, styles, and elements."],
        ["11. Events", "Events happen when users click, type, submit, or move the mouse."],
        ["12. ES6 Features", "Modern JavaScript includes let, const, arrow functions, and template literals."],
        ["13. Async JavaScript", "Async JavaScript waits for tasks like API calls or database requests."],
        ["14. Mini Project", "Build a student score checker that unlocks a certificate when the score is 70% or higher."],
      ].map(([heading, body], index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.text}>{body}</Text>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.heading}>Practice Example</Text>
        <Text style={styles.code}>
{`let score = 85;

if (score >= 70) {
  console.log("Certificate unlocked");
} else {
  console.log("Study more and try again");
}`}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push("/javascript-quiz")}
      >
        <Text style={styles.quizText}>📝 Take JavaScript Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },
  content: { padding: 20, paddingBottom: 60 },
  back: { marginTop: 35, marginBottom: 20, color: "#003366", fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 34, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#555", textAlign: "center", marginBottom: 30 },
  section: { backgroundColor: "#fff", padding: 18, borderRadius: 12, marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#003366", marginBottom: 12 },
  text: { fontSize: 17, lineHeight: 28, color: "#333" },
  code: { backgroundColor: "#1e1e1e", color: "#00ff99", padding: 15, borderRadius: 10, fontSize: 15, fontFamily: "monospace" },
  quizButton: { backgroundColor: "#003366", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 20 },
  quizText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
