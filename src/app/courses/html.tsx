import { Link } from "expo-router";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

export default function HtmlCourse() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/explore" style={styles.back}>← Back to Courses</Link>

      <Text style={styles.title}>🌐 HTML Full Lecture</Text>
      <Text style={styles.subtitle}>
        Estimated study time: 2 hours. Learn the main HTML skills needed before CSS, JavaScript, and quizzes.
      </Text>

      <View style={styles.heroBox}>
        <Text style={styles.heroTitle}>What students will learn</Text>
        <Text style={styles.text}>✅ Website structure</Text>
        <Text style={styles.text}>✅ Text, links, images, lists, tables</Text>
        <Text style={styles.text}>✅ Forms and inputs</Text>
        <Text style={styles.text}>✅ Semantic HTML</Text>
        <Text style={styles.text}>✅ Final mini project</Text>
      </View>

      <Lesson number="1" title="What is HTML?" text="HTML means HyperText Markup Language. It creates the structure of a website. HTML is like the skeleton of a web page." code={`<h1>Welcome to EGA Technologies</h1>
<p>I am learning HTML.</p>`} practice="Practice: Create one heading and one paragraph about yourself." />

      <Lesson number="2" title="Basic HTML Document" text="Every HTML page starts with a document structure. The body is where visible page content goes." code={`<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Hello Students</h1>
    <p>Welcome to HTML class.</p>
  </body>
</html>`} practice="Practice: Write a full HTML page with title, heading, and paragraph." />

      <Lesson number="3" title="Headings and Paragraphs" text="Headings create titles. Paragraphs create normal text. Use only one h1 for the main page title." code={`<h1>Main Title</h1>
<h2>Lesson Title</h2>
<h3>Small Section</h3>

<p>This is normal paragraph text.</p>`} practice="Practice: Create a course page with h1, h2, and two paragraphs." />

      <Lesson number="4" title="Text Formatting" text="HTML can make text important, bold, emphasized, or separated with line breaks." code={`<p>This is <strong>important</strong>.</p>
<p>This is <em>emphasized</em>.</p>
<br />
<hr />`} practice="Practice: Create a paragraph with strong and emphasized words." />

      <Lesson number="5" title="Links" text="Links help users move to other pages or websites. The href attribute stores the destination." code={`<a href="https://google.com">Visit Google</a>

<a href="about.html">About Page</a>`} practice="Practice: Add a link to Google and a link to another local page." />

      <Lesson number="6" title="Images" text="Images use the img tag. The alt text explains the image for accessibility and when the image cannot load." code={`<img src="student.jpg" alt="Student learning HTML" />`} practice="Practice: Add one image with correct alt text." />

      <Lesson number="7" title="Lists" text="Unordered lists use bullets. Ordered lists use numbers." code={`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<ol>
  <li>Open editor</li>
  <li>Write HTML</li>
  <li>Save file</li>
</ol>`} practice="Practice: Create a list of your 5 favorite subjects." />

      <Lesson number="8" title="Tables" text="Tables show information in rows and columns. Use th for headings and td for data." code={`<table>
  <tr>
    <th>Name</th>
    <th>Course</th>
  </tr>
  <tr>
    <td>Ayan</td>
    <td>HTML</td>
  </tr>
</table>`} practice="Practice: Create a table with 3 students and their courses." />

      <Lesson number="9" title="Forms" text="Forms collect user information. Inputs allow users to type data." code={`<form>
  <label>Full Name</label>
  <input type="text" placeholder="Enter your name" />

  <label>Email</label>
  <input type="email" placeholder="Enter your email" />

  <button type="submit">Register</button>
</form>`} practice="Practice: Create a registration form with name, email, phone, and button." />

      <Lesson number="10" title="Input Types" text="HTML has different input types for different data." code={`<input type="text" />
<input type="email" />
<input type="password" />
<input type="number" />
<input type="date" />
<input type="checkbox" />`} practice="Practice: Create a login form with email and password." />

      <Lesson number="11" title="Semantic HTML" text="Semantic tags make the page easier to understand for browsers, developers, and search engines." code={`<header>Website Header</header>
<nav>Navigation Links</nav>
<main>Main Content</main>
<section>Course Section</section>
<footer>Website Footer</footer>`} practice="Practice: Create a page using header, main, section, and footer." />

      <View style={styles.projectBox}>
        <Text style={styles.projectTitle}>🏁 Final HTML Mini Project</Text>
        <Text style={styles.text}>
          Build a personal profile website using all HTML skills.
        </Text>
        <Text style={styles.code}>{`<!DOCTYPE html>
<html>
  <head>
    <title>My Profile</title>
  </head>
  <body>
    <header>
      <h1>My Name</h1>
      <p>I am learning web development.</p>
    </header>

    <main>
      <section>
        <h2>My Skills</h2>
        <ul>
          <li>HTML</li>
          <li>CSS Coming Soon</li>
          <li>JavaScript Coming Soon</li>
        </ul>
      </section>

      <section>
        <h2>Contact Me</h2>
        <form>
          <input type="text" placeholder="Your Name">
          <input type="email" placeholder="Your Email">
          <button>Send</button>
        </form>
      </section>
    </main>

    <footer>
      <p>Created by me.</p>
    </footer>
  </body>
</html>`}</Text>
      </View>

      <View style={styles.quizSection}>
        <Link href="/quiz" asChild>
          <TouchableOpacity style={styles.quizButton}>
            <Text style={styles.quizButtonText}>Start HTML Quiz</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

function Lesson({ number, title, text, code, practice }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.lessonNumber}>Lesson {number}</Text>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.code}>{code}</Text>
      <View style={styles.practiceBox}>
        <Text style={styles.practiceTitle}>✍️ Practice</Text>
        <Text style={styles.practiceText}>{practice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7fb" },
  content: { padding: 20, paddingBottom: 50 },
  back: { color: "#0a66c2", fontSize: 16, fontWeight: "700", marginBottom: 20 },
  title: { fontSize: 30, fontWeight: "900", color: "#102a43", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#486581", lineHeight: 24, marginBottom: 20 },
  heroBox: { backgroundColor: "#e0f2fe", padding: 18, borderRadius: 18, marginBottom: 20, borderWidth: 1, borderColor: "#7dd3fc" },
  heroTitle: { fontSize: 22, fontWeight: "900", color: "#075985", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 18, marginBottom: 18, borderWidth: 1, borderColor: "#d9e2ec" },
  lessonNumber: { color: "#0a66c2", fontWeight: "900", marginBottom: 6 },
  heading: { fontSize: 22, fontWeight: "900", color: "#102a43", marginBottom: 10 },
  text: { fontSize: 16, color: "#334e68", lineHeight: 24, marginBottom: 12 },
  code: { backgroundColor: "#102a43", color: "#fff", padding: 14, borderRadius: 12, fontFamily: "monospace", lineHeight: 22, marginBottom: 12 },
  practiceBox: { backgroundColor: "#fff7ed", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#fed7aa" },
  practiceTitle: { fontSize: 16, fontWeight: "900", color: "#9a3412", marginBottom: 5 },
  practiceText: { fontSize: 15, color: "#7c2d12", lineHeight: 22 },
  projectBox: { backgroundColor: "#ecfdf5", padding: 18, borderRadius: 18, borderWidth: 1, borderColor: "#86efac", marginBottom: 20 },
  projectTitle: { fontSize: 24, fontWeight: "900", color: "#166534", marginBottom: 10 },
  quizSection: { marginTop: 20, marginBottom: 40 },
  quizButton: { backgroundColor: "#0a66c2", padding: 18, borderRadius: 16, alignItems: "center" },
  quizButtonText: { color: "#fff", fontSize: 20, fontWeight: "900" },
});