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
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitQuiz() {
    if (loading) return;

    if (!studentId.trim() || !phone.trim()) {
      setMessage("⚠️ Enter Student ID and Phone Number first.");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      setMessage("⚠️ Please answer all questions before sending quiz.");
      return;
    }

    setLoading(true);
    setMessage("Saving JavaScript quiz result...");

    let correct = 0;
    questions.forEach((item, index) => {
      if (answers[index] === item.answer) correct++;
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    const completed = finalScore >= 70;

    const { data: student, error: findError } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .maybeSingle();

    if (findError) {
      setMessage("❌ Supabase error: " + findError.message);
      setLoading(false);
      return;
    }

    if (!student) {
      setMessage("❌ Student not found.");
      setLoading(false);
      return;
    }

    const cleanTypedPhone = phone.replace(/\D/g, "");
    const cleanSavedPhone = String(student.phone || "").replace(/\D/g, "");

    if (cleanTypedPhone !== cleanSavedPhone) {
      setMessage("❌ Phone number does not match this Student ID.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("students")
      .update({
        js_completed: completed,
        js_certificate_status: completed ? "Ready" : "Not Ready",
        js_quiz_score: finalScore,
      })
      .eq("student_id", studentId.trim());

    if (updateError) {
      setMessage("❌ JavaScript quiz result not saved: " + updateError.message);
      setLoading(false);
      return;
    }

    setScore(finalScore);
    setMessage(
      completed
        ? "🎓 Passed! JavaScript Certificate unlocked and saved successfully."
        : "✅ JavaScript quiz result saved. Pass with 70% to unlock JavaScript certificate."
    );

    setLoading(false);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.push("/javascript-lecture")}>
        <Text style={styles.back}>← Back to JavaScript Course</Text>
      </TouchableOpacity>

      <Text style={styles.title}>⚡ JavaScript Quiz</Text>
      <Text style={styles.subtitle}>
        Enter your Student ID and Phone Number so your JavaScript result can save to Supabase.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={setStudentId}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
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

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={submitQuiz}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Send JavaScript Quiz"}</Text>
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
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 15, fontSize: 18, marginBottom: 15 },
  questionBox: { backgroundColor: "#fff", padding: 18, borderRadius: 12, marginBottom: 20 },
  question: { fontSize: 20, fontWeight: "bold", color: "#003366", marginBottom: 12 },
  option: { backgroundColor: "#eef3f8", padding: 14, borderRadius: 10, marginBottom: 10 },
  selectedOption: { backgroundColor: "#d4af37" },
  optionText: { fontSize: 17 },
  button: { backgroundColor: "#003366", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 20 },
  disabledButton: { backgroundColor: "#888" },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  score: { textAlign: "center", fontSize: 30, fontWeight: "bold", color: "#003366", marginTop: 25 },
  message: { textAlign: "center", fontSize: 20, fontWeight: "bold", marginTop: 20 },
  certButton: { backgroundColor: "#b8860b", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 25 },
  certText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
