import { useState } from "react";
import "./App.css";

function App() {
  const [section, setSection] = useState("home");

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
      {section === "courses" && <Courses />}
      {section === "contact" && <Contact />}
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

function Courses() {
  return (
    <section className="page-card">
      <h2>Course Content</h2>

      <div className="course-list">
        <div className="lesson">
          <span className="check">✓</span>
          <div>
            <h3>1. What is HTML?</h3>
            <p>▣ 4min</p>
          </div>
        </div>

        <div className="lesson active">
          <span className="check">✓</span>
          <div>
            <h3>2. HTML Heading Elements</h3>
            <p>▣ 14min</p>
          </div>
          <button className="resource-btn">Resources ⌄</button>
        </div>

        <div className="lesson">
          <span className="check">✓</span>
          <div>
            <h3>3. HTML Paragraph Elements</h3>
            <p>▣ 9min</p>
          </div>
        </div>

        <div className="lesson">
          <span className="check gray">✓</span>
          <div>
            <h3>4. Self Closing Tags</h3>
            <p>▣ 12min</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="page-card">
      <h2>Contact EGA</h2>

      <p>
        Students can contact EGA to register or ask about available courses.
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default App;