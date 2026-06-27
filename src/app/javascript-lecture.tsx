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
    title: "What is JavaScript?",
    text: "JavaScript is the programming language of the web. HTML builds structure, CSS adds design, and JavaScript adds behavior and interactivity.",
    code: `console.log("Welcome to JavaScript");`,
    practice: "Practice: Print your name using console.log().",
  },
  {
    number: "2",
    title: "Variables",
    text: "Variables store information. Use let for values that can change and const for values that should not change.",
    code: `let studentName = "Ayan";
const school = "EGA Technologies";

console.log(studentName);
console.log(school);`,
    practice: "Practice: Create variables for your name, age, and course.",
  },
  {
    number: "3",
    title: "Data Types",
    text: "JavaScript has different data types like string, number, boolean, array, object, null, and undefined.",
    code: `let name = "Khalid";
let age = 20;
let isStudent = true;
let skills = ["HTML", "CSS", "JavaScript"];`,
    practice: "Practice: Create one example for string, number, boolean, and array.",
  },
  {
    number: "4",
    title: "Operators",
    text: "Operators are used for math, comparison, and logic.",
    code: `let a = 10;
let b = 5;

console.log(a + b);
console.log(a > b);
console.log(a === 10);`,
    practice: "Practice: Use +, -, *, /, >, and ===.",
  },
  {
    number: "5",
    title: "Conditions",
    text: "Conditions help the program make decisions using if, else if, and else.",
    code: `let score = 85;

if (score >= 70) {
  console.log("Passed");
} else {
  console.log("Try again");
}`,
    practice: "Practice: Check if a student passed or failed.",
  },
  {
    number: "6",
    title: "Functions",
    text: "Functions are reusable blocks of code. They help organize programs.",
    code: `function greetStudent(name) {
  return "Welcome " + name;
}

console.log(greetStudent("Ayan"));`,
    practice: "Practice: Create a function that adds two numbers.",
  },
  {
    number: "7",
    title: "Arrays",
    text: "Arrays store multiple values in one variable.",
    code: `let courses = ["HTML", "CSS", "JavaScript"];

console.log(courses[0]);
console.log(courses.length);`,
    practice: "Practice: Create an array of five subjects.",
  },
  {
    number: "8",
    title: "Objects",
    text: "Objects store related data using key-value pairs.",
    code: `let student = {
  name: "Farah",
  course: "Web Development",
  passed: true
};

console.log(student.name);`,
    practice: "Practice: Create an object for one student.",
  },
  {
    number: "9",
    title: "Loops",
    text: "Loops repeat code. Use for loops when you know how many times to repeat.",
    code: `for (let i = 1; i <= 5; i++) {
  console.log("Lesson " + i);
}`,
    practice: "Practice: Print numbers from 1 to 10.",
  },
  {
    number: "10",
    title: "DOM Basics",
    text: "The DOM lets JavaScript interact with HTML elements on a web page.",
    code: `document.querySelector("h1").textContent = "Hello JavaScript";`,
    practice: "Practice: Change a heading text using JavaScript.",
  },
  {
    number: "11",
    title: "Events",
    text: "Events happen when users interact with the page, like clicking a button or typing in an input.",
    code: `button.addEventListener("click", function () {
  console.log("Button clicked");
});`,
    practice: "Practice: Show a message when a button is clicked.",
  },
  {
    number: "12",
    title: "Forms",
    text: "JavaScript can read form input and validate user data.",
    code: `let email = document.querySelector("#email").value;

if (email.includes("@")) {
  console.log("Valid email");
}`,
    practice: "Practice: Check if a name input is empty.",
  },
  {
    number: "13",
    title: "Mini Project: Counter",
    text: "A counter project increases a number when a button is clicked.",
    code: `let count = 0;

function increase() {
  count++;
  console.log(count);
}`,
    practice: "Project: Build a button that increases a number.",
  },
  {
    number: "14",
    title: "Mini Project: Quiz Logic",
    text: "JavaScript can check answers and calculate quiz scores.",
    code: `let answer = "HTML";
let correct = "HTML";

if (answer === correct) {
  console.log("Correct");
}`,
    practice: "Project: Check one multiple-choice answer.",
  },
  {
    number: "15",
    title: "Final JavaScript Practice",
    text: "Combine variables, conditions, functions, arrays, and events to build interactive pages.",
    code: `function checkScore(score) {
  if (score >= 70) {
    return "Certificate Ready";
  }
  return "Review and try again";
}

console.log(checkScore(90));`,
    practice: "Final Project: Build a small quiz and show pass/fail result.",
  },
];

export default function JavaScriptLecturePage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/explore" style={styles.back}>
        ← Back to Courses
      </Link>

      <Text style={styles.title}>⚡ JavaScript Full Lecture</Text>
      <Text style={styles.subtitle}>
        Estimated study time: 2 hours. Learn JavaScript programming,
        interactivity, logic, functions, arrays, objects, DOM, events, and
        mini projects before the JavaScript quiz.
      </Text>

      <View style={styles.heroBox}>
        <Text style={styles.heroTitle}>What students will learn</Text>
        <Text style={styles.text}>✅ JavaScript basics and syntax</Text>
        <Text style={styles.text}>✅ Variables, data types, and operators</Text>
        <Text style={styles.text}>✅ Conditions, loops, and functions</Text>
        <Text style={styles.text}>✅ Arrays and objects</Text>
        <Text style={styles.text}>✅ DOM, events, forms, and mini projects</Text>
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

      <Link href="/javascript-quiz" asChild>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizButtonText}>Start JavaScript Quiz</Text>
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
  heroBox: {
    backgroundColor: "#fff7ed",
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  heroTitle: { fontSize: 22, fontWeight: "900", color: "#9a3412", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#d9e2ec",
  },
  lessonNumber: { color: "#0a66c2", fontWeight: "900", marginBottom: 6 },
  heading: { fontSize: 22, fontWeight: "900", color: "#102a43", marginBottom: 10 },
  text: { fontSize: 16, color: "#334e68", lineHeight: 24, marginBottom: 12 },
  code: {
    backgroundColor: "#102a43",
    color: "#fff",
    padding: 14,
    borderRadius: 12,
    fontFamily: "monospace",
    lineHeight: 22,
    marginBottom: 12,
  },
  practiceBox: {
    backgroundColor: "#ecfdf5",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#86efac",
  },
  practiceTitle: { fontSize: 16, fontWeight: "900", color: "#166534", marginBottom: 5 },
  practiceText: { fontSize: 15, color: "#14532d", lineHeight: 22 },
  quizButton: {
    backgroundColor: "#0a66c2",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  quizButtonText: { color: "#fff", fontSize: 20, fontWeight: "900" },
});
