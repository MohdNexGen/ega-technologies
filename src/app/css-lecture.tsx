import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function CssLecturePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.back}>← Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CSS Full Lecture</Text>
      <Text style={styles.subtitle}>
        Learn CSS step by step. CSS controls colors, fonts, spacing, layout, responsive design, and animations.
      </Text>

      {lessons.map((lesson, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <Text style={styles.cardText}>{lesson.text}</Text>
          <Text style={styles.code}>{lesson.code}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => router.push("/css-quiz")}>
        <Text style={styles.buttonText}>Take CSS Quiz →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const lessons = [
  { title: "1. CSS Syntax", text: "CSS uses selectors, properties, and values.", code: "h1 {\n  color: blue;\n  font-size: 40px;\n}" },
  { title: "2. Selectors", text: "Selectors choose HTML elements to style.", code: "p { color: black; }\n.title { color: green; }\n#main { background: yellow; }" },
  { title: "3. Colors", text: "CSS supports color names, HEX, RGB, and HSL.", code: "body {\n  background-color: #f5f7fb;\n  color: #222;\n}" },
  { title: "4. Box Model", text: "Every HTML element is a box: content, padding, border, and margin.", code: ".card {\n  padding: 20px;\n  border: 1px solid black;\n  margin: 20px;\n}" },
  { title: "5. Flexbox", text: "Flexbox aligns items in rows or columns.", code: ".container {\n  display: flex;\n  justify-content: center;\n}" },
  { title: "6. Grid", text: "Grid creates rows and columns.", code: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}" },
  { title: "7. Responsive Design", text: "Media queries make websites work on different screen sizes.", code: "@media (max-width: 600px) {\n  body { font-size: 14px; }\n}" },
];

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f7fb", minHeight: "100%" },
  back: { color: "#003366", fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  title: { fontSize: 32, fontWeight: "bold", color: "#003366", marginBottom: 10 },
  subtitle: { fontSize: 17, color: "#444", lineHeight: 25, marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#003366", marginBottom: 8 },
  cardText: { fontSize: 16, color: "#333", lineHeight: 24, marginBottom: 10 },
  code: { backgroundColor: "#111827", color: "#d1fae5", padding: 12, borderRadius: 10, fontFamily: "monospace", lineHeight: 22 },
  button: { backgroundColor: "#003366", padding: 18, borderRadius: 12, alignItems: "center", marginVertical: 25 },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
