import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";

const questions = [
  {
    q: "Which HTML tag is used to define navigation links?",
    options: ["<nav>", "<section>", "<article>"],
    answer: "<nav>",
  },
  {
    q: "Which HTML element is best for independent content like a blog post?",
    options: ["<article>", "<span>", "<br>"],
    answer: "<article>",
  },
  {
    q: "Which input type is used for email validation?",
    options: ['type="text"', 'type="email"', 'type="password"'],
    answer: 'type="email"',
  },
  {
    q: "Which attribute makes an input field required?",
    options: ["required", "placeholder", "readonly"],
    answer: "required",
  },
  {
    q: "Which tag is used to group form fields together?",
    options: ["<fieldset>", "<header>", "<main>"],
    answer: "<fieldset>",
  },
  {
    q: "Which tag is used to add a caption to a table?",
    options: ["<caption>", "<label>", "<legend>"],
    answer: "<caption>",
  },
  {
    q: "Which element improves accessibility by connecting text to an input?",
    options: ["<label>", "<div>", "<strong>"],
    answer: "<label>",
  },
  {
    q: "Which attribute opens a link in a new tab?",
    options: ['target="_blank"', 'href="_blank"', 'open="new"'],
    answer: 'target="_blank"',
  },
  {
    q: "Which tag represents the main content of a page?",
    options: ["<main>", "<aside>", "<footer>"],
    answer: "<main>",
  },
  {
    q: "Which HTML feature helps search engines understand page structure?",
    options: ["Semantic HTML", "Random divs", "Inline colors only"],
    answer: "Semantic HTML",
  },
];

export default function HTMLAdvancedQuiz() {
  const [answers, setAnswers] = useState<any>({});
  const [message, setMessage] = useState("");

  function submitQuiz() {
    let score = 0;

    questions.forEach((item, index) => {
      if (answers[index] === item.answer) score++;
    });

    const percent = Math.round((score / questions.length) * 100);

    if (percent >= 70) {
      setMessage(`✅ Passed Advanced HTML Quiz: ${percent}%`);
      setTimeout(() => {
        router.push({
          pathname: "/html-advanced-certificate",
          params: { score: String(percent) },
        });
      }, 1200);
    } else {
      setMessage(`❌ Not passed: ${percent}%. Please review the advanced HTML lecture again.`);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/html-lecture")}>
        <Text style={styles.backText}>← Back to HTML Lecture</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🧠 Advanced HTML Quiz</Text>
      <Text style={styles.subtitle}>Choose the best answer. Result shows only after submit.</Text>

      {questions.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.question}>{index + 1}. {item.q}</Text>

          {item.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                answers[index] === option && styles.selectedOption,
              ]}
              onPress={() => setAnswers({ ...answers, [index]: option })}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={submitQuiz}>
        <Text style={styles.submitText}>Submit Advanced Quiz</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f4f8fb" },
  backButton: { backgroundColor: "#003366", padding: 14, borderRadius: 10, marginBottom: 20 },
  backText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  title: { fontSize: 30, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 25 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 14, marginBottom: 18, borderWidth: 1, borderColor: "#ddd" },
  question: { fontSize: 20, fontWeight: "bold", color: "#003366", marginBottom: 12 },
  option: { backgroundColor: "#eee", padding: 14, borderRadius: 10, marginBottom: 10 },
  selectedOption: { backgroundColor: "#cfe8ff", borderWidth: 2, borderColor: "#003366" },
  optionText: { fontSize: 17 },
  submitButton: { backgroundColor: "#28a745", padding: 18, borderRadius: 12, marginTop: 10 },
  submitText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
  message: { marginTop: 20, fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#003366" },
});
