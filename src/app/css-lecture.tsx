import { Link } from "expo-router";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

const lessons = [
  {
    number: "1",
    title: "What is CSS?",
    text: "CSS means Cascading Style Sheets. CSS controls the design of a website: colors, layout, spacing, fonts, borders, and responsiveness.",
    code: `h1 {
  color: blue;
  font-size: 40px;
}`,
    practice: "Practice: Make one heading blue and large.",
  },
  {
    number: "2",
    title: "CSS Syntax",
    text: "CSS uses selectors, properties, and values. The selector chooses the HTML element. The property says what to change. The value says how to change it.",
    code: `p {
  color: green;
  font-size: 18px;
}`,
    practice: "Practice: Style a paragraph with color and font size.",
  },
  {
    number: "3",
    title: "Colors",
    text: "CSS colors can use names, hex codes, rgb, or hsl.",
    code: `body {
  background-color: #f4f7fb;
}

h1 {
  color: #003366;
}`,
    practice: "Practice: Change page background and heading color.",
  },
  {
    number: "4",
    title: "Fonts and Text",
    text: "CSS controls font size, font weight, line height, alignment, and spacing.",
    code: `p {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 1.6;
}`,
    practice: "Practice: Center a paragraph and make it bold.",
  },
  {
    number: "5",
    title: "Box Model",
    text: "Every HTML element is a box. The box model includes content, padding, border, and margin.",
    code: `.card {
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px;
}`,
    practice: "Practice: Create a card with padding, border, and margin.",
  },
  {
    number: "6",
    title: "Borders and Border Radius",
    text: "Borders outline elements. Border radius makes corners rounded.",
    code: `.button {
  border: 2px solid blue;
  border-radius: 12px;
}`,
    practice: "Practice: Create a rounded button.",
  },
  {
    number: "7",
    title: "Display",
    text: "The display property controls how elements appear. Common values are block, inline, inline-block, flex, and grid.",
    code: `.box {
  display: block;
}

.menu {
  display: flex;
}`,
    practice: "Practice: Make menu items appear in one row.",
  },
  {
    number: "8",
    title: "Flexbox",
    text: "Flexbox is used for flexible layouts. It helps align items horizontally and vertically.",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}`,
    practice: "Practice: Center three boxes using flexbox.",
  },
  {
    number: "9",
    title: "CSS Grid",
    text: "Grid creates rows and columns. It is useful for galleries, dashboards, and page layouts.",
    code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}`,
    practice: "Practice: Create a 3-column grid.",
  },
  {
    number: "10",
    title: "Responsive Design",
    text: "Responsive design makes websites work on phones, tablets, and computers.",
    code: `@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}`,
    practice: "Practice: Make a layout stack on small screens.",
  },
  {
    number: "11",
    title: "CSS Hover Effects",
    text: "Hover effects happen when the mouse is over an element.",
    code: `.button:hover {
  background-color: navy;
  color: white;
}`,
    practice: "Practice: Add hover color to a button.",
  },
  {
    number: "12",
    title: "Final CSS Mini Project",
    text: "Build a profile card using colors, spacing, borders, shadows, and responsive layout.",
    code: `.profile-card {
  background: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}`,
    practice: "Project: Style a personal profile card.",
  },
];

export default function CSSLecture() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/explore" style={styles.back}>
        ← Back to Courses
      </Link>

      <Text style={styles.title}>🎨 CSS Full Lecture</Text>
      <Text style={styles.subtitle}>
        Estimated study time: 2 hours. Learn CSS design, layout, colors,
        spacing, responsiveness, and styling skills before the CSS quiz.
      </Text>

      <View style={styles.heroBox}>
        <Text style={styles.heroTitle}>What students will learn</Text>
        <Text style={styles.text}>✅ CSS syntax and selectors</Text>
        <Text style={styles.text}>✅ Colors, fonts, spacing, and borders</Text>
        <Text style={styles.text}>✅ Box model</Text>
        <Text style={styles.text}>✅ Flexbox and Grid</Text>
        <Text style={styles.text}>✅ Responsive design</Text>
      </View>

      {lessons.map((lesson) => (
        <View key={lesson.number} style={styles.card}>
          <Text style={styles.lessonNumber}>Lesson {lesson.number}</Text>
          <Text style={styles.heading}>{lesson.title}</Text>
          <Text style={styles.text}>{lesson.text}</Text>
          <Text style={styles.code}>{lesson.code}</Text>

          <View style={styles.practiceBox}>
            <Text style={styles.practiceTitle}>✍️ Practice</Text>
            <Text style={styles.practiceText}>{lesson.practice}</Text>
          </View>
        </View>
      ))}

      <Link href="/css-quiz" asChild>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizButtonText}>Start CSS Quiz</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7fb" },
  content: { padding: 20, paddingBottom: 70 },
  back: { color: "#0a66c2", fontSize: 16, fontWeight: "700", marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "900", color: "#102a43", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#486581", lineHeight: 24, marginBottom: 20 },
  heroBox: { backgroundColor: "#eef2ff", padding: 18, borderRadius: 18, marginBottom: 20, borderWidth: 1, borderColor: "#c7d2fe" },
  heroTitle: { fontSize: 22, fontWeight: "900", color: "#3730a3", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 18, marginBottom: 18, borderWidth: 1, borderColor: "#d9e2ec" },
  lessonNumber: { color: "#0a66c2", fontWeight: "900", marginBottom: 6 },
  heading: { fontSize: 22, fontWeight: "900", color: "#102a43", marginBottom: 10 },
  text: { fontSize: 16, color: "#334e68", lineHeight: 24, marginBottom: 12 },
  code: { backgroundColor: "#102a43", color: "#fff", padding: 14, borderRadius: 12, fontFamily: "monospace", lineHeight: 22, marginBottom: 12 },
  practiceBox: { backgroundColor: "#fff7ed", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#fed7aa" },
  practiceTitle: { fontSize: 16, fontWeight: "900", color: "#9a3412", marginBottom: 5 },
  practiceText: { fontSize: 15, color: "#7c2d12", lineHeight: 22 },
  quizButton: { backgroundColor: "#0a66c2", padding: 18, borderRadius: 16, alignItems: "center", marginTop: 20 },
  quizButtonText: { color: "#fff", fontSize: 20, fontWeight: "900" },
});
