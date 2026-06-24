import { router } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

export default function CSSCoursePage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/explore")}
      >
        <Text style={styles.backText}>← Back to Courses</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🎨 CSS Fundamentals</Text>
      <Text style={styles.subtitle}>
        Master CSS from beginner to advanced and learn how to design beautiful,
        responsive websites.
      </Text>

      {/* Module 1 */}
      <View style={styles.section}>
        <Text style={styles.heading}>1. Introduction to CSS</Text>

        <Text style={styles.text}>
          CSS stands for Cascading Style Sheets.
        </Text>

        <Text style={styles.text}>
          CSS is used to style and design HTML webpages.
        </Text>

        <Text style={styles.text}>
          Without CSS, websites would look plain and unattractive.
        </Text>

        <Text style={styles.code}>
{`HTML:
<p>Hello World</p>

CSS:
p {
  color: blue;
}`}
        </Text>
      </View>

      {/* Module 2 */}
      <View style={styles.section}>
        <Text style={styles.heading}>2. CSS Syntax</Text>

        <Text style={styles.text}>
          CSS consists of selectors, properties, and values.
        </Text>

        <Text style={styles.code}>
{`selector {
  property: value;
}`}
        </Text>

        <Text style={styles.code}>
{`h1 {
  color: red;
  font-size: 32px;
}`}
        </Text>
      </View>

      {/* Module 3 */}
      <View style={styles.section}>
        <Text style={styles.heading}>3. CSS Selectors</Text>

        <Text style={styles.text}>
          Selectors determine which HTML elements receive styles.
        </Text>

        <Text style={styles.code}>
{`p {
  color: green;
}

.title {
  color: blue;
}

#header {
  background-color: yellow;
}`}
        </Text>
      </View>

      {/* Module 4 */}
      <View style={styles.section}>
        <Text style={styles.heading}>4. Colors in CSS</Text>

        <Text style={styles.text}>
          CSS supports color names, RGB values, and HEX codes.
        </Text>

        <Text style={styles.code}>
{`color: red;
color: rgb(255,0,0);
color: #ff0000;`}
        </Text>

        <Text style={styles.code}>
{`body {
  background-color: lightblue;
}`}
        </Text>
      </View>

      {/* Module 5 */}
      <View style={styles.section}>
        <Text style={styles.heading}>5. Fonts and Text Styling</Text>

        <Text style={styles.text}>
          CSS allows complete control over typography.
        </Text>

        <Text style={styles.code}>
{`h1 {
  font-family: Arial;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}`}
        </Text>
      </View>

      {/* Module 6 */}
      <View style={styles.section}>
        <Text style={styles.heading}>6. The CSS Box Model</Text>

        <Text style={styles.text}>
          Every HTML element is considered a box.
        </Text>

        <Text style={styles.code}>
{`+----------------------+
|      Margin          |
|  +---------------+   |
|  |   Border      |   |
|  | +-----------+ |   |
|  | | Padding   | |   |
|  | | Content   | |   |
|  | +-----------+ |   |
|  +---------------+   |
+----------------------+`}
        </Text>

        <Text style={styles.code}>
{`div {
  padding: 20px;
  border: 2px solid black;
  margin: 30px;
}`}
        </Text>
      </View>

      {/* Module 7 */}
      <View style={styles.section}>
        <Text style={styles.heading}>7. Margin and Padding</Text>

        <Text style={styles.text}>
          Margin controls space outside the element. Padding controls space
          inside the element.
        </Text>

        <Text style={styles.code}>
{`div {
  margin: 20px;
  padding: 15px;
}`}
        </Text>
      </View>

      {/* Module 8 */}
      <View style={styles.section}>
        <Text style={styles.heading}>8. Display Property</Text>

        <Text style={styles.text}>
          Display controls how elements appear on the page.
        </Text>

        <Text style={styles.code}>
{`display: block;
display: inline;
display: inline-block;
display: none;`}
        </Text>
      </View>

      {/* Module 9 */}
      <View style={styles.section}>
        <Text style={styles.heading}>9. Flexbox Layout</Text>

        <Text style={styles.text}>
          Flexbox is the modern way to align items.
        </Text>

        <Text style={styles.code}>
{`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`}
        </Text>
      </View>

      {/* Module 10 */}
      <View style={styles.section}>
        <Text style={styles.heading}>10. CSS Grid</Text>

        <Text style={styles.text}>
          Grid allows powerful two-dimensional layouts.
        </Text>

        <Text style={styles.code}>
{`.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}`}
        </Text>
      </View>

      {/* Module 11 */}
      <View style={styles.section}>
        <Text style={styles.heading}>11. Positioning</Text>

        <Text style={styles.code}>
{`position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;`}
        </Text>
      </View>

      {/* Module 12 */}
      <View style={styles.section}>
        <Text style={styles.heading}>12. Responsive Design</Text>

        <Text style={styles.text}>
          Responsive design ensures websites work on phones, tablets, and
          desktops.
        </Text>

        <Text style={styles.code}>
{`@media (max-width: 768px) {
  body {
    background: lightgray;
  }
}`}
        </Text>
      </View>

      {/* Module 13 */}
      <View style={styles.section}>
        <Text style={styles.heading}>13. CSS Animations</Text>

        <Text style={styles.text}>
          CSS animations create movement and visual effects.
        </Text>

        <Text style={styles.code}>
{`.box {
  animation: move 2s infinite;
}

@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(200px); }
}`}
        </Text>
      </View>

      {/* Module 14 */}
      <View style={styles.section}>
        <Text style={styles.heading}>14. Mini Project</Text>

        <Text style={styles.text}>
          Build a personal portfolio card containing:
        </Text>

        <Text style={styles.text}>• Photo</Text>
        <Text style={styles.text}>• Name</Text>
        <Text style={styles.text}>• About Me</Text>
        <Text style={styles.text}>• Skills</Text>
        <Text style={styles.text}>• Contact Button</Text>
      </View>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push("/css-quiz")}
      >
        <Text style={styles.quizText}>📝 Take CSS Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },

  content: {
    padding: 20,
    paddingBottom: 60,
  },

  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },

  backText: {
    color: "#003366",
    fontWeight: "bold",
    fontSize: 18,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },

  section: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 12,
  },

  text: {
    fontSize: 17,
    lineHeight: 28,
    color: "#333",
    marginBottom: 10,
  },

  code: {
    backgroundColor: "#1e1e1e",
    color: "#00ff99",
    padding: 15,
    borderRadius: 10,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "monospace",
  },

  quizButton: {
    backgroundColor: "#003366",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  quizText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});