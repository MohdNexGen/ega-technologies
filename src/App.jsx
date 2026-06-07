import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import Courses from "./pages/Courses";

function App() {
  const [section, setSection] = useState("home");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const templateParams = {
      student_name: e.target.name.value,
      student_email: e.target.email.value,
      student_phone: e.target.phone.value,
      student_course: e.target.course.value,
      student_message: e.target.message.value,
    };

    emailjs
      .send("nexgen_gmail", "template_zvfw3qd", templateParams, "H5xDt1e48EHqf_U4U")
      .then(() => {
        return emailjs.send(
          "nexgen_gmail",
          "template_rbz2rme",
          templateParams,
          "H5xDt1e48EHqf_U4U"
        );
      })
      .then(() => {
        setMessage("Message sent successfully. Confirmation email sent.");
        e.target.reset();
      })
      .catch(() => {
        setMessage("Failed to send. Please try again.");
      });
  }

  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">EGA Technologies</h2>

        <div className="nav-links">
          <button onClick={() => setSection("home")}>Home</button>
          <button onClick={() => setSection("about")}>About</button>
          <button onClick={() => setSection("courses")}>Courses</button>
          <button onClick={() => setSection("contact")}>Contact</button>
        </div>
      </nav>

      {section === "home" && <Home setSection={setSection} />}
      {section === "about" && <About />}
      {section === "courses" && (
        <Courses goHome={() => setSection("home")} />
      )}
      {section === "contact" && (
        <Contact handleSubmit={handleSubmit} message={message} />
      )}
    </div>
  );
}

function Home({ setSection }) {
  return (
    <section className="hero">
      <h1>Welcome to EGA Technologies</h1>

      <p>
        We build professional websites and provide practical web development
        training through real projects.
      </p>

      <button className="main-btn" onClick={() => setSection("courses")}>
        Access Courses
      </button>
    </section>
  );
}

function About() {
  return (
    <section className="page-card">
      <h2>About EGA Technologies</h2>

      <p>
        EGA Technologies provides practical web development training focused on
        real-world projects and modern technologies.
      </p>

      <p>
        Students learn HTML, CSS, JavaScript ES6, React, Node.js, Express.js,
        Git, GitHub, deployment and professional development practices.
      </p>
    </section>
  );
}

function Contact({ handleSubmit, message }) {
  return (
    <section className="page-card">
      <h2>Contact EGA</h2>

      <p>
        Students can contact EGA to register or ask about available courses.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" required />
        <input name="email" type="email" placeholder="Your Email" required />
        <input name="phone" type="text" placeholder="Phone Number" />

        <select name="course" required>
          <option value="">Select Course</option>
          <option>Frontend Development</option>
          <option>Backend Development</option>
          <option>HTML Basics</option>
          <option>React Projects</option>
          <option>Git and GitHub</option>
        </select>

        <textarea name="message" placeholder="Your Message" required></textarea>

        <button type="submit">Send Message</button>
      </form>

      {message && <p className="success">{message}</p>}
    </section>
  );
}

export default App;