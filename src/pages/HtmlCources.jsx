function HtmlCources({ goBack }) {
  return (
    <section className="page-card">
      <button className="back-btn" onClick={goBack}>
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
        <h3>Why HTML is important</h3>

        <p>
          Every website starts with HTML. CSS is used to style the page, and
          JavaScript is used to make the page interactive, but HTML gives the
          page its basic structure.
        </p>

        <h3>Simple HTML Example</h3>

        <pre>{`<h1>Welcome to EGA Technologies</h1>
<p>This is my first web page.</p>
<button>Access Courses</button>`}</pre>
      </div>
    </section>
  );
}

export default HtmlCources;