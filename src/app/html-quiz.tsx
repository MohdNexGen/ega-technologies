
import { Link } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language"],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<p>"],
    answer: "<h1>",
  },
  {
    question: "Which tag is used for a paragraph?",
    options: ["<p>", "<br>", "<div>"],
    answer: "<p>",
  },
  {
    question: "Which tag is used to create a link?",
    options: ["<img>", "<a>", "<link>"],
    answer: "<a>",
  },
  {
    question: "Which tag is used to show an image?",
    options: ["<image>", "<pic>", "<img>"],
    answer: "<img>",
  },
  {
    question: "Which tag is used for an unordered list?",
    options: ["<ul>", "<ol>", "<li>"],
    answer: "<ul>",
  },
  {
    question: "Which tag is used for a table row?",
    options: ["<td>", "<tr>", "<th>"],
    answer: "<tr>",
  },
  {
    question: "Which tag is used to collect user input?",
    options: ["<input>", "<meta>", "<title>"],
    answer: "<input>",
  },
  {
    question: "Which tag is inside the head section for page title?",
    options: ["<title>", "<body>", "<footer>"],
    answer: "<title>",
  },
  {
    question: "Which semantic tag is usually used at the bottom of a page?",
    options: ["<header>", "<main>", "<footer>"],
    answer: "<footer>",
  },
];

export default function HTMLQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  function selectAnswer(index: number, option: string) {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [index]: option });
  }

  async function submitQuiz() {
    let correct = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    const passed = finalScore >= 70;

    setScore(finalScore);
    setSubmitted(true);
    setMessage("Saving quiz result...");

    const studentId =
      typeof window !== "undefined"
        ? localStorage.getItem("student_id") || "Manual-Test-Student"
        : "Manual-Test-Student";

    const { error } = await supabase.from("quiz_results").insert([
      {
        student_id: studentId,
        quiz_name: "HTML Quiz",
        course: "HTML",
        score: finalScore,
        total: questions.length,
        percentage: finalScore,
        passed: passed,
      },
    ]);

    if (error) {
      setMessage("❌ Quiz completed, but result was not saved: " + error.message);
      return;
    }

    setMessage(
      passed
        ? "✅ Quiz submitted and saved. You passed!"
        : "⚠️ Quiz submitted and saved. Please review the lecture and try again."
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/html-lecture" style={styles.back}>← Back to HTML Lecture</Link>

      <Text style={styles.title}>📝 HTML Quiz</Text>
      <Text style={styles.subtitle}>
        Select your answers. Result will show only after Submit Quiz.
      </Text>

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
                selectedAnswers[index] === option && styles.selectedOption,
              ]}
              onPress={() => selectAnswer(index, option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {!submitted ? (
        <TouchableOpacity style={styles.submitButton} onPress={submitQuiz}>
          <Text style={styles.submitText}>Submit Quiz</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Your Score: {score}%</Text>
          <Text style={score >= 70 ? styles.passText : styles.failText}>
            {score >= 70 ? "✅ Passed" : "❌ Not Passed"}
          </Text>
        </View>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
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
  question: { fontSize: 20, fontWeight: "bold", color: "#003366", marginBottom: 15 },
  option: { backgroundColor: "#f8fafc", padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: "#cbd5e1" },
  selectedOption: { backgroundColor: "#dbeafe", borderColor: "#2563eb" },
  optionText: { fontSize: 17, color: "#334155" },
  submitButton: { backgroundColor: "#16a34a", padding: 18, borderRadius: 14, alignItems: "center", marginTop: 15 },
  submitText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  resultBox: { backgroundColor: "#fff", padding: 22, borderRadius: 16, alignItems: "center", marginTop: 20 },
  resultText: { fontSize: 26, fontWeight: "bold", color: "#003366", marginBottom: 10 },
  passText: { fontSize: 22, color: "#166534", fontWeight: "bold" },
  failText: { fontSize: 22, color: "#b00020", fontWeight: "bold" },
  message: { fontSize: 18, color: "#003366", textAlign: "center", marginTop: 18, fontWeight: "bold" },
});
