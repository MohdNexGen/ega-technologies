import { useState } from "react";
import HtmlCources from "./HtmlCources";

function Courses() {
  const [lesson, setLesson] = useState("list");

  if (lesson === "html") {
    return <HtmlCources goBack={() => setLesson("list")} />;
  }

  return (
    <section className="page-card">
      <h2>Course Content</h2>

      <div className="course-list">
        <button
          type="button"
          className="lesson lesson-btn"
          onClick={() => setLesson("html")}
        >
          <div className="check-box">✓</div>

          <div className="lesson-info">
            <h3>1. What is HTML?</h3>
            <p>▣ 4 min</p>
          </div>
        </button>

        <div className="lesson">
          <span className="check">✓</span>

          <div>
            <h3>2. HTML Heading Elements</h3>
            <p>▣ 14 min</p>
          </div>
        </div>

        <div className="lesson">
          <span className="check">✓</span>

          <div>
            <h3>3. HTML Paragraph Elements</h3>
            <p>▣ 9 min</p>
          </div>
        </div>

        <div className="lesson">
          <span className="check gray">✓</span>

          <div>
            <h3>4. Self Closing Tags</h3>
            <p>▣ 12 min</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;