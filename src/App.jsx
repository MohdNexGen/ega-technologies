import "./App.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function App() {
  const [page, setPage] = useState("home");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function goToPage(pageName) {
    setPage(pageName);
    setMenuOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("⏳ Submitting your application. Please wait...");

    const templateParams = {
      student_name: e.target.name.value,
      student_email: e.target.email.value,
      student_phone: e.target.phone.value,
      student_course: e.target.course.value,
      student_message: e.target.message.value,
    };

    emailjs
      .send(
        "nexgen_gmail",
        "template_zvfw3qd",
        templateParams,
        "H5xDt1e48EHqf_U4U"
      )
      .then(() => {
        return emailjs.send(
          "nexgen_gmail",
          "template_rbz2rme",
          templateParams,
          "H5xDt1e48EHqf_U4U"
        );
      })
      .then(() => {
        setMessage("✅ Application sent successfully. Confirmation email sent.");
        e.target.reset();
      })
      .catch(() => {
        setMessage("❌ Failed. Please check your internet and try again.");
      })
      .finally(() => {
        setIsSubmitting(false);

        setTimeout(() => {
          setMessage("");
        }, 6000);
      });
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">EGA Technology</h1>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button onClick={() => goToPage("home")}>Home</button>
          <button onClick={() => goToPage("courses")}>Courses</button>
          <button onClick={() => goToPage("register")}>Register</button>
          <button onClick={() => goToPage("contact")}>Contact</button>
        </div>
      </nav>

      {page === "home" && (
        <section className="hero-section">
          <div className="hero-content">
            <p className="badge">Frontend • Backend • Full Stack</p>

            <h1>Become a Full Stack Web Developer</h1>

            <p>
              Learn HTML, CSS, JavaScript, React, Node.js, Express, Git, GitHub,
              deployment, and real-world projects step by step.
            </p>

            <div className="stats">
              <div className="stat-card">
                <h2>5+</h2>
                <p>Years Teaching Web Development in Canada</p>
              </div>

              <div className="stat-card">
                <h2>100%</h2>
                <p>Practical Learning</p>
              </div>

              <div className="stat-card">
                <h2>Real</h2>
                <p>Projects & Portfolio</p>
              </div>
            </div>

            <div className="about-box">
              <h2>Why Choose EGA?</h2>

              <p>
                EGA Technology provides practical web development training
                focused on real-world skills. Students learn by building
                projects, solving problems, and creating professional portfolios.
              </p>

              <p>
                Training is based on over 5 years of web development teaching
                experience in Canada and focuses on helping students gain skills
                for freelancing, employment, and personal projects.
              </p>
            </div>

            <div className="class-info">
              <h2>Class Information</h2>

              <div className="info-grid">
                <div className="info-card">
                  <h3>📚 Course Type</h3>
                  <p>Frontend, Backend and Full Stack Development</p>
                </div>

                <div className="info-card">
                  <h3>💻 Learning Style</h3>
                  <p>Practical projects and hands-on coding</p>
                </div>

                <div className="info-card">
                  <h3>🌍 Opportunities</h3>
                  <p>Portfolio development, freelancing and job preparation</p>
                </div>

                <div className="info-card">
                  <h3>🎯 Goal</h3>
                  <p>Build professional websites and real-world applications</p>
                </div>
              </div>
            </div>

            <button className="main-btn" onClick={() => goToPage("register")}>
              Apply Now
            </button>
          </div>
        </section>
      )}

      {page === "courses" && (
        <section className="page-box">
          <h2>Courses</h2>

          <p className="section-intro">
            EGA focuses on practical skills, real projects, and step-by-step
            training for beginners and future developers.
          </p>

          <div className="course-grid">
            <div className="course-card">
              <h3>🌐 Frontend Development</h3>
              <p>
                Learn HTML5, CSS3, JavaScript ES6, React, responsive design,
                navigation menus, forms, and modern UI development.
              </p>
            </div>

            <div className="course-card">
              <h3>⚙️ Backend Development</h3>
              <p>
                Learn Node.js, Express.js, APIs, routing, server setup,
                authentication, and deployment fundamentals.
              </p>
            </div>

            <div className="course-card">
              <h3>☁️ Git & GitHub</h3>
              <p>
                Learn version control, repositories, collaboration, commits,
                branches, and publishing projects online.
              </p>
            </div>

            <div className="course-card">
              <h3>🚀 Career Preparation</h3>
              <p>
                Build a professional portfolio, real-world projects, client
                websites, and prepare for international opportunities.
              </p>
            </div>

            <div className="course-card">
              <h3>📱 Responsive Design</h3>
              <p>
                Create websites that work perfectly on desktop, tablet, and
                mobile devices.
              </p>
            </div>

            <div className="course-card">
              <h3>🛠 Real Projects</h3>
              <p>
                Build school websites, portfolios, registration systems, and
                deployment-ready applications.
              </p>
            </div>
          </div>
        </section>
      )}

      {page === "register" && (
        <section className="page-box">
          <h2>Student Registration</h2>

          <p className="notice">
            Fill the form below. A confirmation email will be sent.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Student Name" required />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
            />

            <input name="phone" placeholder="Phone Number" />

            <select name="course">
              <option>Frontend Development</option>
              <option>React Projects</option>
              <option>Backend Development</option>
              <option>Node + Express</option>
              <option>Git & GitHub</option>
              <option>Full Stack Web Development</option>
            </select>

            <textarea name="message" placeholder="Message"></textarea>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loading-text">
                  <span className="spinner"></span>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>

          <p className={isSubmitting ? "processing" : "success"}>{message}</p>
        </section>
      )}

      {page === "contact" && (
        <section className="page-box">
          <h2>Contact EGA</h2>

          <div className="contact-grid">
            <div className="contact-card">
              <h3>📧 Email</h3>
              <p>i.developer2026@gmail.com</p>
            </div>

            <div className="contact-card">
              <h3>📍 Location</h3>
              <p>Ethiopia</p>
            </div>

            <div className="contact-card">
              <h3>💻 Training</h3>
              <p>Frontend, Backend, Full Stack Development</p>
            </div>

            <div className="contact-card">
              <h3>🎓 EGA</h3>
              <p>Practical coding skills and real-world projects</p>
            </div>
          </div>
        </section>
      )}

      <footer>
        <div className="footer-content">
          <h3>EGA Technology</h3>
          <p>Practical web development training with real-world projects.</p>
          <p>© 2026 EGA Technology. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;