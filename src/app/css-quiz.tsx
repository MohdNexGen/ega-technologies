import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { supabase } from "../lib/supabase";

const questions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Sheet Syntax",
      "Color Styling Software",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font", "text-color", "color", "background"],
    answer: "color",
  },
  {
    question: "Which CSS property changes background color?",
    options: ["background-color", "bg", "color-bg", "background-style"],
    answer: "background-color",
  },
  {
    question: "Which selector targets a class?",
    options: ["#title", ".title", "title", "*title"],
    answer: ".title",
  },
  {
    question: "Which selector targets an id?",
    options: [".main", "#main", "main", "@main"],
    answer: "#main",
  },
  {
    question: "Which property controls space inside an element?",
    options: ["margin", "padding", "border", "gap"],
    answer: "padding",
  },
  {
    question: "Which property controls space outside an element?",
    options: ["padding", "margin", "width", "height"],
    answer: "margin",
  },
  {
    question: "Which CSS layout is best for one-dimensional layout?",
    options: ["Grid", "Flexbox", "Table", "Float"],
    answer: "Flexbox",
  },
  {
    question: "Which CSS layout is best for rows and columns?",
    options: ["Flexbox", "Grid", "Inline", "Static"],
    answer: "Grid",
  },
  {
    question: "Which rule is used for responsive design?",
    options: ["@screen", "@mobile", "@media", "@responsive"],
    answer: "@media",
  },
];

export default function CssQuizPage() {
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState<any>({});
  const [message, setMessage] = useState("");
  const [score, setScore] = useState<number | null>(null);
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
    setMessage("Saving CSS quiz result...");

    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
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
        css_completed: completed,
        css_certificate_status: completed ? "Ready" : "Not Ready",
        css_quiz_score: finalScore,
      })
      .eq("student_id", studentId.trim());

    if (updateError) {
      setMessage("❌ CSS quiz result not saved: " + updateError.message);
      setLoading(false);
      return;
    }

    setScore(finalScore);
    setMessage(
      completed
        ? "🎓 Passed! CSS Certificate unlocked and saved successfully."
        : "✅ CSS quiz result saved. Pass with 70% to unlock CSS certificate."
    );

    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/css-lecture")}>
        <Text style={styles.back}>← Back to CSS Lecture</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CSS Quiz</Text>
      <Text style={styles.subtitle}>
        Enter your Student ID and Phone Number so your CSS result can save to Supabase.
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

      {questions.map((q, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.question}>
            {index + 1}. {q.question}
          </Text>

          {q.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                answers[index] === option && styles.selectedOption,
              ]}
              onPress={() =>
                setAnswers({
                  ...answers,
                  [index]: option,
                })
              }
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
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Send CSS Quiz"}
        </Text>
      </TouchableOpacity>

      {score !== null && <Text style={styles.score}>Score: {score}%</Text>}

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {score !== null && score >= 70 && (
        <TouchableOpacity
          style={styles.certificateButton}
          onPress={() => router.push("/css-certificate")}
        >
          <Text style={styles.certificateButtonText}>🎓 View CSS Certificate</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f7fb",
    minHeight: "100%",
  },
  back: {
    fontSize: 16,
    marginBottom: 15,
    color: "#003366",
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 18,
    lineHeight: 23,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  option: {
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  selectedOption: {
    backgroundColor: "#dceeff",
    borderColor: "#003366",
  },
  optionText: {
    fontSize: 16,
    color: "#222",
  },
  button: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003366",
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  certificateButton: {
    backgroundColor: "#b8860b",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  certificateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
