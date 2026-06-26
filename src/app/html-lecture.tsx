import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, Linking } from "react-native";

export default function HTMLLecture() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/learner-portal" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back to Learner Portal</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>📘 HTML College-Level Course</Text>
      <Text style={styles.subtitle}>
        Learn HTML from fundamentals to advanced website structure.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🧰 Required Software / Resources</Text>
        <Text style={styles.text}>Before starting the course, install these tools:</Text>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://code.visualstudio.com/")}>
          <Text style={styles.resourceButtonText}>⬇️ Download VS Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://www.google.com/chrome/")}>
          <Text style={styles.resourceButtonText}>⬇️ Download Google Chrome</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://nodejs.org/")}>
          <Text style={styles.resourceButtonText}>⬇️ Download Node.js</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://expo.dev/go")}>
          <Text style={styles.resourceButtonText}>⬇️ Download Expo Go</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceButton} onPress={() => Linking.openURL("https://git-scm.com/downloads")}>
          <Text style={styles.resourceButtonText}>⬇️ Download Git</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Part 1: HTML Fundamentals</Text>
        <Text style={styles.text}>
          HTML means HyperText Markup Language. It is used to build the structure
          of web pages. Every website uses HTML for headings, paragraphs, links,
          images, forms, tables, and page sections.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Basic HTML Page</Text>
        <Text style={styles.code}>
{`<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Welcome to EGA Technologies</h1>
    <p>This is my first web page.</p>
  </body>
</html>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2. Text and Headings</Text>
        <Text style={styles.text}>
          HTML has headings from h1 to h6. h1 is the biggest and most important.
          Paragraphs use the p tag.
        </Text>
        <Text style={styles.code}>
{`<h1>Main Title</h1>
<h2>Section Title</h2>
<p>This is a paragraph.</p>
<strong>Important text</strong>
<em>Emphasized text</em>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3. Links and Images</Text>
        <Text style={styles.code}>
{`<a href="https://example.com">Visit Website</a>

<img src="student.jpg" alt="Student learning HTML">`}
        </Text>
        <Text style={styles.text}>
          The alt text is important for accessibility and search engines.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>4. Lists</Text>
        <Text style={styles.code}>
{`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<ol>
  <li>Register</li>
  <li>Study</li>
  <li>Take Quiz</li>
</ol>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>5. Tables</Text>
        <Text style={styles.code}>
{`<table>
  <tr>
    <th>Name</th>
    <th>Course</th>
  </tr>
  <tr>
    <td>Amina</td>
    <td>HTML</td>
  </tr>
</table>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>6. Forms</Text>
        <Text style={styles.text}>
          Forms collect user information such as name, email, password, phone,
          and messages.
        </Text>
        <Text style={styles.code}>
{`<form>
  <label>Full Name</label>
  <input type="text" placeholder="Enter name">

  <label>Email</label>
  <input type="email" placeholder="Enter email">

  <button type="submit">Register</button>
</form>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>7. Semantic HTML</Text>
        <Text style={styles.text}>
          Semantic HTML gives meaning to page sections. It helps students,
          browsers, screen readers, and search engines understand the page.
        </Text>
        <Text style={styles.code}>
{`<header>Website Header</header>
<nav>Navigation Menu</nav>
<main>Main Content</main>
<section>Course Section</section>
<article>Blog Post</article>
<footer>Website Footer</footer>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>8. Accessibility</Text>
        <Text style={styles.text}>
          Accessibility means making websites usable for everyone, including
          people using screen readers or keyboard navigation.
        </Text>
        <Text style={styles.code}>
{`<img src="html.jpg" alt="HTML code on laptop">

<label for="email">Email</label>
<input id="email" type="email">`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>9. Mini Project</Text>
        <Text style={styles.text}>
          Build a student profile page using heading, image, paragraph, list,
          table, and form.
        </Text>
      </View>

      <Link href="/html-quiz" asChild>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizText}>Start Fundamental HTML Quiz</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.advancedBox}>
        <Text style={styles.advancedTitle}>🎓 Part 2: Advanced HTML Lessons</Text>
        <Text style={styles.text}>
          After the fundamental test, students continue with deeper college-level
          HTML topics.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>10. Advanced Forms</Text>
        <Text style={styles.text}>
          Advanced forms use validation, input types, required fields, radio
          buttons, checkboxes, select menus, and text areas.
        </Text>
        <Text style={styles.code}>
{`<form>
  <input type="text" required>
  <input type="email" required>
  <input type="password" minlength="8">

  <select>
    <option>HTML</option>
    <option>CSS</option>
  </select>

  <textarea placeholder="Write your message"></textarea>
</form>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>11. Media</Text>
        <Text style={styles.code}>
{`<video controls>
  <source src="lesson.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>12. SEO Structure</Text>
        <Text style={styles.text}>
          SEO means Search Engine Optimization. Good HTML helps Google understand
          the page.
        </Text>
        <Text style={styles.code}>
{`<title>EGA HTML Course</title>
<meta name="description" content="Learn HTML with examples">
<h1>Main topic of the page</h1>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>13. Website Layout Planning</Text>
        <Text style={styles.code}>
{`<body>
  <header></header>
  <nav></nav>
  <main>
    <section></section>
    <section></section>
  </main>
  <footer></footer>
</body>`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>14. Final Advanced Project</Text>
        <Text style={styles.text}>
          Build a full college course landing page with header, navigation,
          hero section, course cards, registration form, table, video, and footer.
        </Text>
      </View>

      <Link href="/html-advanced-quiz" asChild>
        <TouchableOpacity style={styles.advancedButton}>
          <Text style={styles.quizText}>Start Advanced HTML Quiz</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/html-advanced-certificate" asChild>
        <TouchableOpacity style={styles.certButton}>
          <Text style={styles.quizText}>Advanced HTML Certificate</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f8fb",
  },
  backButton: {
    backgroundColor: "#003366",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    lineHeight: 26,
    color: "#222",
  },
  code: {
    backgroundColor: "#111",
    color: "#00ff99",
    padding: 14,
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  quizButton: {
    backgroundColor: "#28a745",
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
  },
  advancedBox: {
    backgroundColor: "#fff3cd",
    padding: 20,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ffe08a",
  },
  advancedTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7a5200",
    marginBottom: 10,
  },
  advancedButton: {
    backgroundColor: "#0056b3",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  certButton: {
    backgroundColor: "#b8860b",
    padding: 18,
    borderRadius: 12,
    marginBottom: 30,
  },
  quizText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
