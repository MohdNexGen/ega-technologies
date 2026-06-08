import { useState } from "react";
import "./App.css";

const courses = {
  english: {
    title: "🇺🇸 Web Development Program",
    backText: "← Back to Languages",
    testText: "Start Test",
    quizTitle: "English Quiz",
    topics: [
      "HTML Fundamentals",
      "CSS Professional Styling",
      "JavaScript ES6",
      "React Development",
      "Node.js & Express",
      "Real Projects",
    ],
    questions: [
      {
        q: "1. What does HTML stand for?",
        correct: "HyperText Markup Language",
        a: ["HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Main Language"],
      },
      {
        q: "2. Which language styles a website?",
        correct: "CSS",
        a: ["HTML", "CSS", "Node.js"],
      },
      {
        q: "3. Which language adds interactivity?",
        correct: "JavaScript",
        a: ["JavaScript", "HTML", "CSS"],
      },
    ],
  },

  arabic: {
    title: "🇸🇦 برنامج تطوير الويب",
    backText: "← الرجوع إلى اللغات",
    testText: "ابدأ الاختبار",
    quizTitle: "اختبار قصير",
    topics: [
      "أساسيات HTML",
      "تنسيق CSS الاحترافي",
      "JavaScript ES6",
      "تطوير React",
      "Node.js و Express",
      "مشاريع حقيقية",
    ],
    questions: [
      {
        q: "1. ماذا تعني HTML؟",
        correct: "لغة ترميز النص التشعبي",
        a: ["لغة ترميز النص التشعبي", "لغة أدوات المنزل", "لغة النقل الرئيسية"],
      },
      {
        q: "2. أي لغة تستخدم لتنسيق الموقع؟",
        correct: "CSS",
        a: ["HTML", "CSS", "Node.js"],
      },
      {
        q: "3. أي لغة تضيف التفاعل للموقع؟",
        correct: "JavaScript",
        a: ["JavaScript", "HTML", "CSS"],
      },
    ],
  },

  somali: {
    title: "🇸🇴 Barnaamijka Horumarinta Webka",
    backText: "← Ku noqo Luuqadaha",
    testText: "Bilow Imtixaanka",
    quizTitle: "Imtixaan Kooban",
    topics: [
      "Aasaaska HTML",
      "Qaabaynta Xirfadaysan ee CSS",
      "JavaScript ES6",
      "Horumarinta React",
      "Node.js iyo Express",
      "Mashruucyo Dhab Ah",
    ],
    questions: [
      {
        q: "1. Maxay HTML u taagan tahay?",
        correct: "HyperText Markup Language",
        a: ["HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Main Language"],
      },
      {
        q: "2. Luqaddee loo isticmaalaa qurxinta website-ka?",
        correct: "CSS",
        a: ["HTML", "CSS", "Node.js"],
      },
      {
        q: "3. Luqaddee ka dhigta website-ka mid firfircoon?",
        correct: "JavaScript",
        a: ["JavaScript", "HTML", "CSS"],
      },
    ],
  },
};

function App() {
  const [page, setPage] = useState("home");
  const [courseLang, setCourseLang] = useState("english");
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});

  const openCourse = (lang) => {
    setCourseLang(lang);
    setShowQuiz(false);
    setAnswers({});
    setPage("courseDetail");
  };

  const currentCourse = courses[courseLang];

  const chooseAnswer = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const score = currentCourse.questions.filter(
    (item, index) => answers[index] === item.correct
  ).length;

  return (
    <div className="app">
      <header className="navbar">
        <h1>EGA Technologies</h1>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("courses")}>Courses</button>
          <button onClick={() => setPage("about")}>About</button>
          <button onClick={() => setPage("contact")}>Contact</button>
        </div>
      </header>

      {page === "home" && (
        <section className="hero">
          <h2>Welcome to EGA Technologies</h2>

          <p>
            Learn web development step by step with real projects.
            <br />
            تعلّم تطوير المواقع خطوة بخطوة من خلال مشاريع حقيقية.
            <br />
            Baro web development talaabo talaabo adigoo samaynaya mashruucyo dhab ah.
          </p>

          <button className="access-btn" onClick={() => setPage("courses")}>
            <span>🇺🇸 Access Courses</span>
            <span>🇸🇦 الدخول إلى الدورات</span>
            <span>🇸🇴 Gal Koorsooyinka</span>
          </button>
        </section>
      )}

      {page === "courses" && (
        <section className="page-card">
          <button className="back-btn" onClick={() => setPage("home")}>
            ← Back Home
          </button>

          <h2>Select Language</h2>

          <div className="language-grid">
            <button className="language-btn" onClick={() => openCourse("english")}>
              🇺🇸 English Course
            </button>

            <button className="language-btn" onClick={() => openCourse("arabic")}>
              🇸🇦 Arabic Course
            </button>

            <button className="language-btn" onClick={() => openCourse("somali")}>
              🇸🇴 Somali Course
            </button>
          </div>
        </section>
      )}

      {page === "courseDetail" && (
        <section className="page-card">
          <button
            className="back-btn"
            onClick={() => {
              setShowQuiz(false);
              setAnswers({});
              setPage("courses");
            }}
          >
            {currentCourse.backText}
          </button>

          <div className={courseLang === "arabic" ? "course-box arabic-text" : "course-box"}>
            <h3>{currentCourse.title}</h3>

            <ul>
              {currentCourse.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>

            <button
              className="test-btn"
              onClick={() => {
                setShowQuiz(true);
                setAnswers({});
              }}
            >
              {currentCourse.testText}
            </button>

            {showQuiz && (
              <div className="quiz-box">
                <h3>{currentCourse.quizTitle}</h3>

                <div className="score-box">
                  Score: {score} / {currentCourse.questions.length}
                </div>

                {currentCourse.questions.map((item, index) => (
                  <div className="question-card" key={index}>
                    <p>{item.q}</p>

                    {item.a.map((answer, answerIndex) => (
                      <button
                        key={answerIndex}
                        onClick={() => chooseAnswer(index, answer)}
                        className={
                          answers[index] === answer
                            ? answer === item.correct
                              ? "answer-btn correct"
                              : "answer-btn wrong"
                            : "answer-btn"
                        }
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="page-card">
          <button className="back-btn" onClick={() => setPage("home")}>
            ← Back Home
          </button>

          <h2>About EGA</h2>
          <p>
            EGA Technologies provides professional web development training
            through practical lessons and real projects.
          </p>
        </section>
      )}

      {page === "contact" && (
        <section className="page-card">
          <button className="back-btn" onClick={() => setPage("home")}>
            ← Back Home
          </button>

          <h2>Contact EGA</h2>
          <p>Contact EGA Technologies for registration and course information.</p>
        </section>
      )}
    </div>
  );
}

export default App;