import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import EnglishServices from "./EnglishServices.jsx";
import ArabicServices from "./ArabicServices.jsx";
import SomaliServices from "./SomaliServices.jsx";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const AUTO_REPLY_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

function App() {
  const [page, setPage] = useState("home");

  const goHome = () => setPage("home");
  const openCourses = () => setPage("courses");
  const openHtmlCourse = () => setPage("html");
  const openHtmlTest = () => setPage("html-test");
  const openContact = () => setPage("contact");

  return (
    <>
      {page === "home" && (
        <Home
          openCourses={openCourses}
          openContact={openContact}
          openEnglish={() => setPage("english")}
          openArabic={() => setPage("arabic")}
          openSomali={() => setPage("somali")}
        />
      )}

      {page === "english" && <LanguagePage goHome={goHome} content={<EnglishServices />} />}
      {page === "arabic" && <LanguagePage goHome={goHome} content={<ArabicServices />} />}
      {page === "somali" && <LanguagePage goHome={goHome} content={<SomaliServices />} />}

      {page === "courses" && (
        <Courses goHome={goHome} openHtmlCourse={openHtmlCourse} />
      )}

      {page === "html" && (
        <HtmlCourse goBack={openCourses} openHtmlTest={openHtmlTest} />
      )}

      {page === "html-test" && <HtmlTest goBack={openHtmlCourse} />}

      {page === "contact" && <Contact goHome={goHome} />}
    </>
  );
}

function Home({ openCourses, openContact, openEnglish, openArabic, openSomali }) {
  return (
    <main className="page">
      <nav className="navbar">
        <h1 className="logo">EGA Technologies</h1>

        <div className="nav-links">
          <button>Home</button>
          <button>About</button>
          <button onClick={openCourses}>Courses</button>
          <button onClick={openContact}>Contact</button>
        </div>
      </nav>

      <section className="hero">
        <h2>Welcome to EGA Technologies</h2>
        <p>Learn web development step by step with real projects.</p>

        <div className="language-buttons">
          <button onClick={openEnglish}>English Services</button>
          <button onClick={openArabic}>الخدمات العربية</button>
          <button onClick={openSomali}>Adeegyada Somali</button>
        </div>

        <button className="primary-btn" onClick={openCourses}>
          Access Courses
        </button>
      </section>
    </main>
  );
}

function LanguagePage({ goHome, content }) {
  return (
    <main className="page">
      <button className="back-btn" onClick={goHome}>
        ← Back to Home
      </button>

      {content}
    </main>
  );
}

function Courses({ goHome, openHtmlCourse }) {
  return (
    <main className="page">
      <button className="back-btn" onClick={goHome}>
        ← Back to Home
      </button>

      <section className="course-page">
        <h2>Course Content</h2>
        <p>Select a lesson to start learning.</p>

        <div className="course-card" onClick={openHtmlCourse}>
          <h3>HTML Course</h3>
          <p>Learn the structure of web pages using HTML.</p>
          <button>Start Lesson</button>
        </div>
      </section>
    </main>
  );
}

function HtmlCourse({ goBack, openHtmlTest }) {
  return (
    <main className="page lesson-page">
      <button className="back-btn" onClick={goBack}>
        ← Back to Courses
      </button>

      <h1>1. What is HTML?</h1>

      <p>
        HTML stands for <strong>HyperText Markup Language</strong>. It is the
        standard language used to create the structure of web pages.
      </p>

      <p>
        HTML tells the browser what content should appear on the page, such as
        headings, paragraphs, images, links, lists, tables, buttons and forms.
      </p>

      <h2>Why HTML is Important</h2>

      <p>
        Every website starts with HTML. CSS styles the page and JavaScript adds
        interaction, but HTML provides the structure.
      </p>

      <h2>Simple HTML Example</h2>

      <pre>
{`<h1>Welcome to EGA Technologies</h1>
<p>This is my first web page.</p>
<button>Access Courses</button>`}
      </pre>

      <button className="primary-btn" onClick={openHtmlTest}>
        Time for Test
      </button>
    </main>
  );
}

function HtmlTest({ goBack }) {
  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperTool Markup Link",
        "HomeText Main Language",
      ],
      answer: "HyperText Markup Language",
    },
    {
      question: "What is HTML used for?",
      options: [
        "Styling websites",
        "Creating website structure",
        "Adding database",
        "Making animations only",
      ],
      answer: "Creating website structure",
    },
    {
      question: "Which HTML tag is used for the biggest heading?",
      options: ["<p>", "<button>", "<h1>", "<img>"],
      answer: "<h1>",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const score = questions.filter(
    (item, index) => selectedAnswers[index] === item.answer
  ).length;

  return (
    <main className="page lesson-page">
      <button className="back-btn" onClick={goBack}>
        ← Back to HTML Lesson
      </button>

      <h1>HTML Test</h1>
      <p>Choose the correct answer for each question.</p>

      {questions.map((item, index) => (
        <div className="course-page" key={index} style={{ marginBottom: "25px" }}>
          <h2>
            {index + 1}. {item.question}
          </h2>

          {item.options.map((option) => (
            <button
              key={option}
              className="primary-btn"
              onClick={() => handleAnswer(index, option)}
              style={{
                display: "block",
                margin: "12px 0",
                background:
                  selectedAnswers[index] === option
                    ? "linear-gradient(135deg, #16a34a, #15803d)"
                    : "linear-gradient(135deg, #7c3aed, #6d28d9)",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ))}

      <button className="primary-btn" onClick={() => setShowResult(true)}>
        Submit Test
      </button>

      {showResult && (
        <h2>
          Your Score: {score} / {questions.length}
        </h2>
      )}
    </main>
  );
}

function Contact({ goHome }) {
  const [messageStatus, setMessageStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_phone: "",
    student_course: "",
    student_message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    setIsSending(true);
    setMessageStatus("Sending message...");

    try {
      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, formData, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, formData, PUBLIC_KEY);

      setMessageStatus("Message sent successfully. Confirmation email sent.");

      setFormData({
        student_name: "",
        student_email: "",
        student_phone: "",
        student_course: "",
        student_message: "",
      });

      setTimeout(() => {
        setMessageStatus("");
      }, 4000);
    } catch (error) {
      console.error(error);
      setMessageStatus("Message failed. Please check EmailJS settings.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="page">
      <button className="back-btn" onClick={goHome}>
        ← Back to Home
      </button>

      <section className="course-page">
        <h1>Contact EGA Technologies</h1>
        <p>Students can contact EGA to register or ask about available courses.</p>

        {messageStatus && <div className="popup-message">{messageStatus}</div>}

        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            name="student_name"
            placeholder="Your Name"
            className="form-input"
            value={formData.student_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="student_email"
            placeholder="Your Email"
            className="form-input"
            value={formData.student_email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="student_phone"
            placeholder="Your Phone"
            className="form-input"
            value={formData.student_phone}
            onChange={handleChange}
            required
          />

          <select
            name="student_course"
            className="form-input"
            value={formData.student_course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript ES6">JavaScript ES6</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Express">Express</option>
          </select>

          <textarea
            name="student_message"
            placeholder="Your Message"
            rows="6"
            className="form-input"
            value={formData.student_message}
            onChange={handleChange}
            required
          ></textarea>

          <button className="primary-btn" type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;