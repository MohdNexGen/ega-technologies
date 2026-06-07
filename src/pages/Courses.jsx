import { Link } from "react-router-dom";

export default function Courses() {
  return (
    <section className="courses-section">
      <h1>EGA Courses</h1>
      <p className="course-intro">
        Students can access lessons step by step and complete tests before moving forward.
      </p>

      <div className="course-grid">
        <Link to="/frontend" className="course-card">
          <h3>🌐 Frontend Development</h3>
          <p>HTML, CSS, JavaScript ES6, React and Responsive Design.</p>
        </Link>

        <div className="course-card locked">
          <h3>🔒 Backend Development</h3>
          <p>Coming after frontend basics.</p>
        </div>

        <div className="course-card locked">
          <h3>🔒 Git & GitHub</h3>
          <p>Coming soon.</p>
        </div>
      </div>

      <a href="/" className="back-link">← Back Home</a>
    </section>
  );
}