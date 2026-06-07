import { useState } from "react";
import HtmlCources from "./HtmlCources";

function Courses() {
  const [lesson, setLesson] = useState(null);

  if (lesson === "html") {
    return <HtmlCources goBack={() => setLesson(null)} />;
  }

  return (
    <section className="page-card">
      <h2>Course Content</h2>

      <div className="course-list">
        <button className="lesson lesson-btn" onClick={() => setLesson("html")}>
          <span className="check">✓</span>

          <div>
            <h3>1. What is HTML?</h3>
            <p>▣ 4min</p>
          </div>
        </button>

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

export default Courses;