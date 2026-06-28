import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { supabase } from "../lib/supabase";

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Machine Language"],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag is used for the largest heading?",
    options: ["<h1>", "<h6>", "<p>"],
    answer: "<h1>",
  },
  {
    question: "Which tag is used to create a link?",
    options: ["<a>", "<link>", "<href>"],
    answer: "<a>",
  },
  {
    question: "Which tag is used to show an image?",
    options: ["<img>", "<image>", "<pic>"],
    answer: "<img>",
  },
  {
    question: "Which tag is used for a paragraph?",
    options: ["<p>", "<text>", "<paragraph>"],
    answer: "<p>",
  },
];

export default function HTMLQuiz() {
  const [selected, setSelected] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  async function submitQuiz() {
    let score = 0;

    questions.forEach((q, index) => {
      if (selected[index] === q.answer) score++;
    });

    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;

    const { error } = await supabase.from("quiz_results").insert({
      student_name: "Guest",
      student_id: "Unknown",
      course: "HTML",
      quiz_name: "HTML Fundamentals Quiz",
      score,
      total,
      percentage,
      passed,
    });

    if (error) {
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    setSubmitted(true);
    setMessage(
      passed
        ? `🎉 Congratulations! You passed. Score: ${score}/${total} (${percentage}%)`
        : `❌ You did not pass. Score: ${score}/${total} (${percentage}%). Please review the lecture.`
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/html-lecture" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back to HTML Lecture</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>🧪 HTML Fundamentals Quiz</Text>
      <Text style={styles.subtitle}>
        Choose your answers. Result will show only after you press Submit Quiz.
      </Text>

      {questions.map((q, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.question}>{index + 1}. {q.question}</Text>

          {q.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                selected[index] === option && styles.selectedOption,
              ]}
              disabled={submitted}
              onPress={() =>
                setSelected({ ...selected, [index]: option })
              }
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {!submitted && (
        <TouchableOpacity style={styles.submitButton} onPress={submitQuiz}>
          <Text style={styles.submitText}>Submit Quiz</Text>
        </TouchableOpacity>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f6f8",
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#003366",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 18,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#003366",
  },
  option: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#c7d2fe",
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#003366",
  },
});
