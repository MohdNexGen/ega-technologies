import { Link } from "react-router-dom";

export default function FrontendCources() {
  return (
    <section className="courses-section">
      <h1>Frontend Development</h1>
      <p className="course-intro">
        Start with HTML. CSS is locked until students pass the HTML test.
      </p>

      <div className="course-grid">
        <Link to="/html" className="course-card">
          <h3>📘 Module 1: HTML Fundamentals</h3>
          <p>Structure, headings, paragraphs, links, images, lists, tables and forms.</p>
        </Link>

        <div className="course-card locked">
          <h3>🔒 Module 2: CSS</h3>
          <p>Locked until HTML test is passed.</p>
        </div>

        <div className="course-card locked">
          <h3>🔒 Module 3: JavaScript ES6</h3>
          <p>Locked until CSS is completed.</p>
        </div>

        <div className="course-card locked">
          <h3>🔒 Module 4: React</h3>
          <p>Locked until JavaScript is completed.</p>
        </div>
      </div>

      <a href="/courses" className="back-link">← Back to Courses</a>
    </section>
  );
}