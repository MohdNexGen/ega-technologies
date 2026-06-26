import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, Linking } from "react-native";

export default function JavaScriptLecturePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>JavaScript Full Lecture</Text>
      <Text style={styles.subtitle}>
        Learn JavaScript step by step. JavaScript makes websites interactive, handles buttons, forms, logic, data, and dynamic page changes.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧰 Required Software / Resources</Text>
        <Text style={styles.cardText}>Before starting JavaScript, install these tools:</Text>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://code.visualstudio.com/")}>
          <Text style={styles.resourceButtonText}>⬇️ Download VS Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://www.google.com/chrome/")}>
          <Text style={styles.resourceButtonText}>⬇️ Download Google Chrome</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://developer.mozilla.org/en-US/docs/Web/JavaScript")}>
          <Text style={styles.resourceButtonText}>📘 Open JavaScript Documentation</Text>
        </TouchableOpacity>

        <Text style={styles.cardText}>⚠️ Install VS Code and Chrome before continuing.</Text>
      </View>

      {lessons.map((lesson, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardText}>{lesson.text}</Text>
          <Text style={styles.code}>{lesson.code}</Text>
          <Text style={styles.practice}>Practice: {lesson.practice}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => router.push("/javascript-quiz")}>
        <Text style={styles.buttonText}>Take JavaScript Quiz →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const lessons = [
  {
    title: "1. What is JavaScript?",
    text: "JavaScript is a programming language used to make websites interactive. HTML builds the structure, CSS styles the page, and JavaScript controls behavior.",
    code: "console.log('Welcome to JavaScript');",
    practice: "Write a console message that says your name.",
  },
  {
    title: "2. Variables",
    text: "Variables store information. Use let for values that can change and const for values that should stay the same.",
    code: "let studentName = 'Ahmed';\nconst course = 'Web Development';\nconsole.log(studentName);",
    practice: "Create variables for your name, age, and course.",
  },
  {
    title: "3. Data Types",
    text: "JavaScript has different data types such as strings, numbers, booleans, arrays, and objects.",
    code: "let name = 'Sara';\nlet age = 20;\nlet isStudent = true;",
    practice: "Create one string, one number, and one boolean.",
  },
  {
    title: "4. Operators",
    text: "Operators are used for math and comparison. Examples include +, -, *, /, ===, >, and <.",
    code: "let total = 10 + 5;\nlet passed = total > 12;\nconsole.log(passed);",
    practice: "Calculate the total score of three quiz marks.",
  },
  {
    title: "5. Conditions",
    text: "Conditions allow your program to make decisions using if, else if, and else.",
    code: "let score = 75;\nif (score >= 70) {\n  console.log('Passed');\n} else {\n  console.log('Try again');\n}",
    practice: "Write a condition that checks if a student can get a certificate.",
  },
  {
    title: "6. Functions",
    text: "Functions are reusable blocks of code. They help keep your code clean and organized.",
    code: "function greet(name) {\n  return 'Hello ' + name;\n}\nconsole.log(greet('Ali'));",
    practice: "Create a function that returns a student's final grade.",
  },
  {
    title: "7. Arrays",
    text: "Arrays store multiple values in one variable. They are useful for lists such as questions, students, or scores.",
    code: "const students = ['Ali', 'Sara', 'Mohammed'];\nconsole.log(students[0]);",
    practice: "Create an array with five course names.",
  },
  {
    title: "8. Objects",
    text: "Objects store related information using key-value pairs.",
    code: "const student = {\n  name: 'Amina',\n  course: 'JavaScript',\n  score: 90\n};\nconsole.log(student.name);",
    practice: "Create an object for one student with name, phone, and course.",
  },
  {
    title: "9. Loops",
    text: "Loops repeat code. Use them when you need to process many items.",
    code: "const scores = [80, 90, 70];\nfor (let i = 0; i < scores.length; i++) {\n  console.log(scores[i]);\n}",
    practice: "Loop through an array of student names.",
  },
  {
    title: "10. Events",
    text: "Events happen when users interact with a page, such as clicking a button or typing in a form.",
    code: "function handleClick() {\n  console.log('Button clicked');\n}",
    practice: "Create a function that runs when a quiz button is clicked.",
  },
  {
    title: "11. DOM Basics",
    text: "The DOM lets JavaScript read and change HTML content on a web page.",
    code: "document.getElementById('title').textContent = 'New Title';",
    practice: "Change a heading text using JavaScript.",
  },
  {
    title: "12. Final Mini Project",
    text: "Build a small quiz app: store questions in an array, let users choose answers, then show the score only after Submit.",
    code: "const questions = [\n  { question: 'What is JS?', answer: 'Programming language' }\n];",
    practice: "Plan a 5-question JavaScript quiz.",
  },
];

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f7fb", minHeight: "100%" },
  back: { color: "#003366", fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  title: { fontSize: 32, fontWeight: "bold", color: "#003366", marginBottom: 10 },
  subtitle: { fontSize: 17, color: "#444", lineHeight: 25, marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#003366", marginBottom: 8 },
  cardText: { fontSize: 16, color: "#333", lineHeight: 24, marginBottom: 10 },
  code: { backgroundColor: "#111827", color: "#d1fae5", padding: 12, borderRadius: 10, fontFamily: "monospace", lineHeight: 22, marginBottom: 10 },
  practice: { backgroundColor: "#eef6ff", padding: 12, borderRadius: 10, color: "#003366", fontSize: 15, fontWeight: "bold" },
  button: { backgroundColor: "#003366", padding: 18, borderRadius: 12, alignItems: "center", marginVertical: 25 },
  resourceButton: {
    backgroundColor: "#003366",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  resourceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
