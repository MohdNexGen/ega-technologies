import { useState } from "react";

function HtmlCources({ goBack }) {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const [result, setResult] = useState("");

  function handleChange(e) {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  }

  function submitTest() {
    let score = 0;

    if (answers.q1 === "HyperText Markup Language") score++;
    if (answers.q2 === "<h1>") score++;
    if (answers.q3 === "Creating page structure") score++;

    setResult(`Your Score: ${score}/3`);
  }

  return (
    <section className="page-card lesson-page">
      <button type="button" className="back-btn" onClick={goBack}>
        ← Back to Courses
      </button>

      <h2>1. What is HTML?</h2>

      <p>
        HTML stands for <strong>HyperText Markup Language</strong>. It is the
        standard language used to create the structure of web pages.
      </p>

      <p>
        HTML tells the browser what content should appear on the page, such as
        headings, paragraphs, images, links, lists, tables, buttons and forms.
      </p>

      <div className="lesson-content">
        <h3>Why HTML is Important</h3>

        <p>
          Every website starts with HTML. CSS styles the page and JavaScript
          adds interaction, but HTML provides the structure.
        </p>

        <h3>Simple HTML Example</h3>

        <pre>{`<h1>Welcome to EGA Technologies</h1>
<p>This is my first web page.</p>
<button>Access Courses</button>`}</pre>
      </div>

      <div className="quiz-box">
        <h3>Quick Test</h3>

        <div className="question">
          <p>1. What does HTML stand for?</p>

          <label>
            <input
              type="radio"
              name="q1"
              value="HyperText Markup Language"
              onChange={handleChange}
            />
            HyperText Markup Language
          </label>

          <label>
            <input
              type="radio"
              name="q1"
              value="HighText Machine Language"
              onChange={handleChange}
            />
            HighText Machine Language
          </label>

          <label>
            <input
              type="radio"
              name="q1"
              value="Hyper Transfer Markup Language"
              onChange={handleChange}
            />
            Hyper Transfer Markup Language
          </label>
        </div>

        <div className="question">
          <p>2. Which tag creates the largest heading?</p>

          <label>
            <input type="radio" name="q2" value="<h1>" onChange={handleChange} />
            {"<h1>"}
          </label>

          <label>
            <input type="radio" name="q2" value="<h6>" onChange={handleChange} />
            {"<h6>"}
          </label>

          <label>
            <input type="radio" name="q2" value="<p>" onChange={handleChange} />
            {"<p>"}
          </label>
        </div>

        <div className="question">
          <p>3. HTML is mainly used for?</p>

          <label>
            <input
              type="radio"
              name="q3"
              value="Creating page structure"
              onChange={handleChange}
            />
            Creating page structure
          </label>

          <label>
            <input
              type="radio"
              name="q3"
              value="Styling web pages"
              onChange={handleChange}
            />
            Styling web pages
          </label>

          <label>
            <input
              type="radio"
              name="q3"
              value="Database management"
              onChange={handleChange}
            />
            Database management
          </label>
        </div>

        <button type="button" className="main-btn" onClick={submitTest}>
          Submit Test
        </button>

        {result && <p className="quiz-result">{result}</p>}
      </div>
    </section>
  );
}

export default HtmlCources;