export default function HtmlCources() {
  return (
    <section className="courses-section">
      <h1>HTML Fundamentals</h1>
      <p className="course-intro">
        Complete these lessons, then take the HTML test. Pass mark: 70%.
      </p>

      <div className="lesson-box">
        <h2>Lesson 1: HTML Structure</h2>
        <p>HTML builds the structure of a webpage.</p>
        <pre>{`<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to EGA</h1>
  <p>I am learning HTML step by step.</p>
</body>
</html>`}</pre>
      </div>

      <div className="lesson-box">
        <h2>Lesson 2: Headings and Paragraphs</h2>
        <pre>{`<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<p>This is a paragraph.</p>`}</pre>
      </div>

      <div className="lesson-box">
        <h2>Lesson 3: Links and Images</h2>
        <pre>{`<a href="https://egatechnologies.vercel.app">Visit EGA</a>
<img src="student.jpg" alt="Student photo" />`}</pre>
      </div>

      <div className="lesson-box">
        <h2>Lesson 4: Lists</h2>
        <pre>{`<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol>
  <li>Learn HTML</li>
  <li>Take the test</li>
</ol>`}</pre>
      </div>

      <div className="lesson-box">
        <h2>Lesson 5: Forms</h2>
        <pre>{`<form>
  <input type="text" placeholder="Your Name" />
  <input type="email" placeholder="Your Email" />
  <textarea placeholder="Your Message"></textarea>
  <button type="submit">Send</button>
</form>`}</pre>
      </div>

      <div className="lesson-box test">
        <h2>Final HTML Test</h2>
        <ol>
          <li>What does HTML stand for?</li>
          <li>Create one heading and two paragraphs.</li>
          <li>Add one image with alt text.</li>
          <li>Add one link to another website.</li>
          <li>Create a contact form with name, email, message and button.</li>
        </ol>
        <p><strong>Pass mark:</strong> 70% or higher.</p>
      </div>

      <a href="/frontend" className="back-link">← Back to Frontend</a>
    </section>
  );
}