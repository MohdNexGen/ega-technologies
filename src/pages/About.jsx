function About({ goBack }) {
  return (
    <section className="page-card">
      <button className="back-btn" onClick={goBack}>
        ← Back Home
      </button>

      <h2>About EGA</h2>

      <div className="course-box">
        <h3>Welcome to EGA Technologies</h3>

        <p>
          EGA Technologies provides professional web development training for
          students who want to learn modern technology skills step by step.
        </p>

        <p>
          Our training focuses on practical lessons, real projects, and
          portfolio building. Students learn how websites are created,
          styled, made interactive, and published online.
        </p>

        <hr />

        <h3>Our Courses</h3>

        <ul>
          <li>HTML and website structure</li>
          <li>CSS and responsive design</li>
          <li>JavaScript ES6</li>
          <li>React front-end development</li>
          <li>Node.js and Express back-end development</li>
          <li>Git, GitHub, and deployment</li>
        </ul>

        <hr />

        <h3>Our Goal</h3>

        <p>
          Our goal is to help students become confident web developers by
          learning real skills that can be used for personal projects,
          business websites, and future job opportunities.
        </p>

        <hr />

        <h3>Why Choose EGA?</h3>

        <ul>
          <li>Beginner-friendly lessons</li>
          <li>Step-by-step teaching style</li>
          <li>Real project practice</li>
          <li>Professional portfolio support</li>
          <li>Modern web development skills</li>
        </ul>
      </div>
    </section>
  );
}

export default About;