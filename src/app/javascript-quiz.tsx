import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, TextInput } from "react-native";
import { supabase } from "../lib/supabase";

const questions = [
  { q: "What is JavaScript mainly used for?", options: ["Styling pages", "Adding interactivity", "Creating databases", "Writing HTML"], answer: "Adding interactivity" },
  { q: "Which keyword creates a variable?", options: ["let", "style", "html", "div"], answer: "let" },
  { q: "Which keyword creates a constant?", options: ["const", "fixed", "same", "lock"], answer: "const" },
  { q: "Which command prints to console?", options: ["print()", "console.log()", "show()", "display()"], answer: "console.log()" },
  { q: "Single-line comment uses:", options: ["//", "##", "<!-- -->", "**"], answer: "//" },
  { q: "True or false is called:", options: ["String", "Number", "Boolean", "Array"], answer: "Boolean" },
  { q: "Decision making uses:", options: ["if", "for", "let", "return"], answer: "if" },
  { q: "Which repeats code?", options: ["loop", "image", "style", "tag"], answer: "loop" },
  { q: "Array stores:", options: ["List of values", "One value only", "CSS only", "HTML only"], answer: "List of values" },
  { q: "Object example is:", options: ['{ name: "Ali" }', '["Ali"]', '"Ali"', "25"], answer: '{ name: "Ali" }' },
  { q: "Function is:", options: ["Reusable code", "CSS color", "HTML tag", "Database"], answer: "Reusable code" },
  { q: "Function returns value using:", options: ["send", "return", "back", "give"], answer: "return" },
  { q: "DOM means:", options: ["Document Object Model", "Design Object Mode", "Data Object Map", "Digital Online Method"], answer: "Document Object Model" },
  { q: "Select element with:", options: ["querySelector()", "style()", "make()", "open()"], answer: "querySelector()" },
  { q: "Click is a:", options: ["Event", "Variable", "Array", "Object"], answer: "Event" },
  { q: "Strict equality is:", options: ["=", "==", "===", "!="], answer: "===" },
  { q: "Template literal uses:", options: ["Single quotes", "Double quotes", "Backticks", "Parentheses"], answer: "Backticks" },
  { q: "Arrow function example:", options: ["() => {}", "function()", "if {}", "for {}"], answer: "() => {}" },
  { q: "Async/await is for:", options: ["Waiting tasks", "Colors", "Fonts", "Tables"], answer: "Waiting tasks" },
  { q: "Passing score is:", options: ["40%", "50%", "60%", "70%"], answer: "70%" },
];

export default function JavaScriptQuizPage() {
  const [studentId, setStudentId] = useState("");
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function submitQuiz() {
    if (!studentId.trim()) {
      setMessage("⚠️ Enter Student ID before sending quiz.");
      return;
    }

    let correct = 0;
    questions.forEach((item, index) => {
      if (answers[index] === item.answer) correct++;
    });

    const percent = Math.round((correct / questions.length) * 100);
    const passed = percent >= 70;
    setScore(percent);

    const { error } = await supabase
      .from("students")
      .update({ js_certificate_status: passed ? "Ready" : "Not Ready" })
      .eq("student_id", studentId.trim());

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    setMessage(
      passed
        ? "🎓 Passed! JavaScript Certificate unlocked and saved successfully."
        : "✅ Quiz saved. Pass with 70% to unlock JavaScript Certificate."
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.push("/javascript-lecture")}>
        <Text style={styles.back}>← Back to JavaScript Course</Text>
      </TouchableOpacity>

      <Text style={styles.title}>⚡ JavaScript Quiz</Text>
      <Text style={styles.subtitle}>Answer all questions, then send quiz.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />

      {questions.map((item, index) => (
        <View key={index} style={styles.questionBox}>
          <Text style={styles.question}>{index + 1}. {item.q}</Text>

          {item.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.option, answers[index] === option && styles.selectedOption]}
              onPress={() => setAnswers({ ...answers, [index]: option })}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={submitQuiz}>
        <Text style={styles.buttonText}>Send JavaScript Quiz</Text>
      </TouchableOpacity>

      {score !== null && <Text style={styles.score}>Score: {score}%</Text>}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {score !== null && score >= 70 && (
        <TouchableOpacity
          style={styles.certButton}
          onPress={() => router.push("/javascript-certificate")}
        >
          <Text style={styles.certText}>🎓 View JavaScript Certificate</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },
  content: { padding: 20, paddingBottom: 60 },
  back: { marginTop: 35, marginBottom: 20, color: "#003366", fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 34, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#555", textAlign: "center", marginBottom: 25 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 15, fontSize: 18, marginBottom: 20 },
  questionBox: { backgroundColor: "#fff", padding: 18, borderRadius: 12, marginBottom: 20 },
  question: { fontSize: 20, fontWeight: "bold", color: "#003366", marginBottom: 12 },
  option: { backgroundColor: "#eef3f8", padding: 14, borderRadius: 10, marginBottom: 10 },
  selectedOption: { backgroundColor: "#d4af37" },
  optionText: { fontSize: 17 },
  button: { backgroundColor: "#003366", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  score: { textAlign: "center", fontSize: 30, fontWeight: "bold", color: "#003366", marginTop: 25 },
  message: { textAlign: "center", fontSize: 20, fontWeight: "bold", marginTop: 20 },
  certButton: { backgroundColor: "#b8860b", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 25 },
  certText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
