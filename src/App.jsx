import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const AUTO_REPLY_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

const courseData = {
  english: {
    title: "🇺🇸 English Web Development Course",
    intro: "Full 1-month beginner course: HTML, CSS, JavaScript ES6, and React.",
    back: "← Back",
    register: "Register Now",
    submit: "Submit Final Test",
    passed: "✅ Passed. You completed the EGA 1-month course.",
    failed: "❌ Try again. Review the lessons and retake the test.",
    weeks: [
      {
        title: "Week 1: HTML Fundamentals",
        lessons: [
          { title: "What is HTML?", content: "HTML stands for HyperText Markup Language. It creates the structure of a webpage." },
          { title: "HTML Structure", content: "A page usually has html, head, and body sections. The body shows visible content." },
          { title: "Headings and Paragraphs", content: "Headings use h1 to h6 tags. Paragraphs use the p tag." },
          { title: "Links and Images", content: "Links use the a tag. Images use the img tag." },
          { title: "Forms", content: "Forms collect user information using inputs, textareas, selects, and buttons." },
        ],
        quiz: [
          { q: "What does HTML stand for?", correct: "HyperText Markup Language", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Main Language"] },
          { q: "Which tag creates a paragraph?", correct: "<p>", options: ["<p>", "<h1>", "<img>"] },
        ],
      },
      {
        title: "Week 2: CSS Styling",
        lessons: [
          { title: "What is CSS?", content: "CSS styles websites. It controls colors, fonts, spacing, and layout." },
          { title: "Colors and Fonts", content: "CSS can change text color, background color, font size, and font family." },
          { title: "Spacing", content: "Margin creates outside space. Padding creates inside space." },
          { title: "Flexbox", content: "Flexbox helps arrange items in rows or columns." },
          { title: "Responsive Design", content: "Responsive design helps websites work on phones, tablets, and computers." },
        ],
        quiz: [
          { q: "Which language styles a website?", correct: "CSS", options: ["HTML", "CSS", "JavaScript"] },
          { q: "Which CSS tool helps layout items in a row?", correct: "Flexbox", options: ["Flexbox", "HTML", "EmailJS"] },
        ],
      },
      {
        title: "Week 3: JavaScript ES6",
        lessons: [
          { title: "What is JavaScript?", content: "JavaScript adds interaction to websites, such as clicks, forms, and dynamic changes." },
          { title: "Variables", content: "Variables store information. Modern JavaScript uses let and const." },
          { title: "Functions", content: "Functions are reusable blocks of code." },
          { title: "Events", content: "Events happen when users click, type, or submit forms." },
          { title: "DOM Manipulation", content: "JavaScript can change text, styles, and page content using the DOM." },
        ],
        quiz: [
          { q: "Which language adds interaction?", correct: "JavaScript", options: ["CSS", "HTML", "JavaScript"] },
          { q: "Which keyword creates a variable?", correct: "let", options: ["let", "div", "style"] },
        ],
      },
      {
        title: "Week 4: React Development",
        lessons: [
          { title: "What is React?", content: "React is a JavaScript library used to build user interfaces." },
          { title: "Components", content: "Components are reusable parts of a React app." },
          { title: "Props", content: "Props pass information from one component to another." },
          { title: "State", content: "State stores changing information inside a component." },
          { title: "Final Project", content: "Students build a small website using HTML, CSS, JavaScript, and React." },
        ],
        quiz: [
          { q: "React is used to build what?", correct: "User interfaces", options: ["User interfaces", "Databases", "Emails"] },
          { q: "Which React hook manages state?", correct: "useState", options: ["useState", "useEmail", "useCSS"] },
        ],
      },
    ],
  },

  arabic: {
    title: "🇸🇦 دورة تطوير الويب باللغة العربية",
    intro: "دورة شهر كامل للمبتدئين: HTML و CSS و JavaScript ES6 و React.",
    back: "← رجوع",
    register: "سجل الآن",
    submit: "إرسال الاختبار النهائي",
    passed: "✅ نجحت. لقد أكملت دورة EGA الشهرية.",
    failed: "❌ حاول مرة أخرى. راجع الدروس وأعد الاختبار.",
    weeks: [
      {
        title: "الأسبوع الأول: أساسيات HTML",
        lessons: [
          { title: "ما هو HTML؟", content: "HTML هي اللغة المستخدمة لبناء هيكل صفحة الويب." },
          { title: "هيكل HTML", content: "تحتوي الصفحة عادة على html و head و body. قسم body يظهر المحتوى للمستخدم." },
          { title: "العناوين والفقرات", content: "العناوين تستخدم h1 إلى h6. الفقرات تستخدم وسم p." },
          { title: "الروابط والصور", content: "الروابط تستخدم وسم a. الصور تستخدم وسم img." },
          { title: "النماذج", content: "النماذج تجمع بيانات المستخدم مثل الاسم والبريد والرسالة." },
        ],
        quiz: [
          { q: "ماذا تعني HTML؟", correct: "HyperText Markup Language", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Main Language"] },
          { q: "أي وسم يستخدم لإنشاء فقرة؟", correct: "<p>", options: ["<p>", "<h1>", "<img>"] },
        ],
      },
      {
        title: "الأسبوع الثاني: تنسيق CSS",
        lessons: [
          { title: "ما هو CSS؟", content: "CSS تستخدم لتنسيق الموقع مثل الألوان والخطوط والمسافات والتخطيط." },
          { title: "الألوان والخطوط", content: "يمكن تغيير لون النص والخلفية وحجم الخط ونوع الخط." },
          { title: "المسافات", content: "Margin للمسافة الخارجية و Padding للمسافة الداخلية." },
          { title: "Flexbox", content: "Flexbox يساعد في ترتيب العناصر في صفوف أو أعمدة." },
          { title: "التصميم المتجاوب", content: "يجعل الموقع يعمل بشكل جيد على الهاتف والتابلت والكمبيوتر." },
        ],
        quiz: [
          { q: "أي لغة تستخدم لتنسيق الموقع؟", correct: "CSS", options: ["HTML", "CSS", "JavaScript"] },
          { q: "أي أداة تساعد في ترتيب العناصر؟", correct: "Flexbox", options: ["Flexbox", "HTML", "EmailJS"] },
        ],
      },
      {
        title: "الأسبوع الثالث: JavaScript ES6",
        lessons: [
          { title: "ما هي JavaScript؟", content: "JavaScript تضيف التفاعل للموقع مثل الضغط على الأزرار وإرسال النماذج." },
          { title: "المتغيرات", content: "المتغيرات تخزن البيانات. نستخدم let و const في JavaScript الحديثة." },
          { title: "الدوال", content: "الدوال هي كود قابل لإعادة الاستخدام." },
          { title: "الأحداث", content: "الأحداث تحدث عندما يضغط المستخدم أو يكتب أو يرسل نموذجًا." },
          { title: "DOM", content: "يمكن لـ JavaScript تغيير النصوص والتنسيقات والمحتوى باستخدام DOM." },
        ],
        quiz: [
          { q: "أي لغة تضيف التفاعل للموقع؟", correct: "JavaScript", options: ["CSS", "HTML", "JavaScript"] },
          { q: "أي كلمة تنشئ متغيرًا؟", correct: "let", options: ["let", "div", "style"] },
        ],
      },
      {
        title: "الأسبوع الرابع: React",
        lessons: [
          { title: "ما هو React؟", content: "React مكتبة JavaScript لبناء واجهات المستخدم." },
          { title: "Components", content: "المكونات أجزاء قابلة لإعادة الاستخدام داخل التطبيق." },
          { title: "Props", content: "Props تنقل البيانات من مكون إلى مكون آخر." },
          { title: "State", content: "State تخزن البيانات التي تتغير داخل المكون." },
          { title: "المشروع النهائي", content: "يبني الطالب موقعًا صغيرًا باستخدام HTML و CSS و JavaScript و React." },
        ],
        quiz: [
          { q: "React يستخدم لبناء ماذا؟", correct: "User interfaces", options: ["User interfaces", "Databases", "Emails"] },
          { q: "أي Hook يدير State؟", correct: "useState", options: ["useState", "useEmail", "useCSS"] },
        ],
      },
    ],
  },

  somali: {
    title: "🇸🇴 Koorsada Web Development Af-Soomaali",
    intro: "Koorsada bil dhan ee bilowga: HTML, CSS, JavaScript ES6, iyo React.",
    back: "← Dib u noqo",
    register: "Isdiiwaangeli",
    submit: "Gudbi Imtixaanka Ugu Dambeeya",
    passed: "✅ Waad gudubtay. Waxaad dhamaysay koorsada EGA ee 1-da bil.",
    failed: "❌ Mar kale isku day. Dib u akhri casharrada.",
    weeks: [
      {
        title: "Usbuuca 1aad: HTML Basics",
        lessons: [
          { title: "Waa maxay HTML?", content: "HTML waa luqadda lagu dhiso qaab-dhismeedka website-ka." },
          { title: "Qaabka HTML", content: "Bogga HTML wuxuu leeyahay html, head, iyo body. Body-ga ayaa muujinaya waxa user-ku arko." },
          { title: "Cinwaanno iyo qoraallo", content: "Cinwaannada waxaa lagu sameeyaa h1 ilaa h6. Qoraallada waxaa lagu sameeyaa p." },
          { title: "Links iyo sawirro", content: "Links waxaa lagu sameeyaa a tag. Sawirrada waxaa lagu sameeyaa img tag." },
          { title: "Forms", content: "Forms waxay ardayga ka qaadayaan xog sida magac, email, phone, iyo fariin." },
        ],
        quiz: [
          { q: "HTML maxay u taagan tahay?", correct: "HyperText Markup Language", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Main Language"] },
          { q: "Tag-gee paragraph sameeya?", correct: "<p>", options: ["<p>", "<h1>", "<img>"] },
        ],
      },
      {
        title: "Usbuuca 2aad: CSS Styling",
        lessons: [
          { title: "Waa maxay CSS?", content: "CSS waxay qurxisaa website-ka: midab, font, spacing, iyo layout." },
          { title: "Midab iyo Fonts", content: "CSS waxay beddeshaa midabka qoraalka, background-ka, size-ka, iyo font-ka." },
          { title: "Spacing", content: "Margin waa bannaan dibadda ah. Padding waa bannaan gudaha ah." },
          { title: "Flexbox", content: "Flexbox wuxuu caawiyaa in items-ka loo habeeyo row ama column." },
          { title: "Responsive Design", content: "Responsive design wuxuu website-ka ka dhigaa mid ka shaqeeya phone, tablet, iyo computer." },
        ],
        quiz: [
          { q: "Luqaddee qurxisa website-ka?", correct: "CSS", options: ["HTML", "CSS", "JavaScript"] },
          { q: "Maxaa layout-ka fududeeya?", correct: "Flexbox", options: ["Flexbox", "HTML", "EmailJS"] },
        ],
      },
      {
        title: "Usbuuca 3aad: JavaScript ES6",
        lessons: [
          { title: "Waa maxay JavaScript?", content: "JavaScript waxay website-ka siisaa interaction sida button click iyo form submit." },
          { title: "Variables", content: "Variables waxay kaydiyaan xog. JavaScript casri ah waxay isticmaashaa let iyo const." },
          { title: "Functions", content: "Functions waa code dib loo isticmaali karo." },
          { title: "Events", content: "Events waxay dhacaan marka user-ku click gareeyo, qoro, ama form diro." },
          { title: "DOM", content: "JavaScript waxay beddeli kartaa qoraalka, style-ka, iyo content-ka bogga iyadoo adeegsanaysa DOM." },
        ],
        quiz: [
          { q: "Luqaddee interaction ku darta website-ka?", correct: "JavaScript", options: ["CSS", "HTML", "JavaScript"] },
          { q: "Keyword-kee variable sameeya?", correct: "let", options: ["let", "div", "style"] },
        ],
      },
      {
        title: "Usbuuca 4aad: React Development",
        lessons: [
          { title: "Waa maxay React?", content: "React waa JavaScript library lagu dhiso user interfaces." },
          { title: "Components", content: "Components waa qaybo yar-yar oo dib loo isticmaali karo." },
          { title: "Props", content: "Props waxay xog ka gudbiyaan component ilaa component kale." },
          { title: "State", content: "State waxay kaydisaa xog isbeddelaysa gudaha component-ka." },
          { title: "Final Project", content: "Ardaygu wuxuu dhisayaa website yar oo isticmaalaya HTML, CSS, JavaScript, iyo React." },
        ],
        quiz: [
          { q: "React maxaa lagu dhisaa?", correct: "User interfaces", options: ["User interfaces", "Databases", "Emails"] },
          { q: "Hook-gee state maamula?", correct: "useState", options: ["useState", "useEmail", "useCSS"] },
        ],
      },
    ],
  },
};

function Navbar({ setPage }) {
  return (
   <nav className="navbar">
  <h2>EGA Technologies</h2>

  <div className="bismillah">
    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
  </div>
      <div className="nav-links">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("courses")}>Courses</button>
        <button onClick={() => setPage("contact")}>Contact</button>
      </div>
    </nav>
  );
}

function Home({ setPage }) {
  return (
    <main className="page">
      <section className="hero">
        <h1>Welcome to EGA Technologies</h1>
        <p>Learn web development in English, Arabic, and Somali with lessons, tests, and real projects.</p>
        <button className="primary-btn" onClick={() => setPage("courses")}>View Courses</button>
      </section>
    </main>
  );
}

function About({ setPage }) {
  return (
    <main className="page content-card">
      <button className="back-btn" onClick={() => setPage("home")}>← Back</button>
      <h1>About EGA</h1>
      <p>EGA Technologies helps students learn modern web development from beginner level to real project building.</p>
    </main>
  );
}

function Courses({ setPage }) {
  const [language, setLanguage] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  function handleAnswer(weekIndex, questionIndex, value) {
    setAnswers((prev) => ({ ...prev, [`${weekIndex}-${questionIndex}`]: value }));
  }

  function calculateScore() {
    const course = courseData[language];
    let total = 0;
    let correct = 0;

    course.weeks.forEach((week, weekIndex) => {
      week.quiz.forEach((question, questionIndex) => {
        total++;
        if (answers[`${weekIndex}-${questionIndex}`] === question.correct) correct++;
      });
    });

    setScore(Math.round((correct / total) * 100));
  }

  if (!language) {
    return (
      <main className="page content-card">
        <button className="back-btn" onClick={() => setPage("home")}>← Back</button>
        <h1>Choose Course Language</h1>
        <p>Select your preferred language.</p>

        <div className="language-grid">
          <button onClick={() => setLanguage("english")}>🇺🇸 English</button>
          <button onClick={() => setLanguage("arabic")}>🇸🇦 العربية</button>
          <button onClick={() => setLanguage("somali")}>🇸🇴 Somali</button>
        </div>
      </main>
    );
  }

  const course = courseData[language];

  return (
    <main className="page content-card">
      <button className="back-btn" onClick={() => { setLanguage(null); setAnswers({}); setScore(null); }}>
        {course.back}
      </button>

      <h1>{course.title}</h1>
      <p>{course.intro}</p>

      <div className="weeks-container">
        {course.weeks.map((week, weekIndex) => (
          <section className="week-card" key={week.title}>
            <h2>{week.title}</h2>
            <h3>Lessons</h3>

            {week.lessons.map((lesson) => (
              <div className="lesson-card" key={lesson.title}>
                <h4>{lesson.title}</h4>
                <p>{lesson.content}</p>
              </div>
            ))}

            <h3>Test</h3>
            {week.quiz.map((question, questionIndex) => (
              <div className="quiz-box" key={question.q}>
                <p>{question.q}</p>
                <div className="quiz-options">
                  {question.options.map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={`${weekIndex}-${questionIndex}`}
                        value={option}
                        onChange={() => handleAnswer(weekIndex, questionIndex, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <button className="primary-btn" onClick={calculateScore}>{course.submit}</button>

      {score !== null && (
        <div className="score-box">
          <h2>Your Score: {score}%</h2>
          <p>{score >= 70 ? course.passed : course.failed}</p>
        </div>
      )}

      <button className="primary-btn" onClick={() => setPage("contact")}>{course.register}</button>
    </main>
  );
}

function Contact({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Full Web Development",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      setStatus("Please fill all required fields.");
      setTimeout(() => setStatus(""), 4000);
      return;
    }

    setLoading(true);
    setStatus("Sending...");

    const templateParams = {
      student_name: form.name,
      student_email: form.email,
      student_phone: form.phone,
      student_course: form.course,
      student_message: form.message,
      to_email: form.email,
    };

    try {
      await Promise.all([
        emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY),
      ]);

      setStatus("✅ Message sent successfully. Confirmation email sent.");
      setForm({ name: "", email: "", phone: "", course: "Full Web Development", message: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Failed to send message. Please try again.");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page contact-card">
      <button className="back-btn" onClick={() => setPage("home")}>← Back</button>

      <h1>Contact EGA</h1>
      <p>Students can contact EGA to register or ask about available courses.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Your Phone" value={form.phone} onChange={handleChange} />

        <select name="course" value={form.course} onChange={handleChange}>
          <option value="Full Web Development">Full Web Development</option>
          <option value="English Web Development">English Web Development</option>
          <option value="Arabic Web Development">Arabic Web Development</option>
          <option value="Somali Web Development">Somali Web Development</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript ES6">JavaScript ES6</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
        </select>

        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} />

        <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</button>

        {status && <div className="success-message">{status}</div>}
      </form>
    </main>
  );
}

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "about" && <About setPage={setPage} />}
      {page === "courses" && <Courses setPage={setPage} />}
      {page === "contact" && <Contact setPage={setPage} />}
    </>
  );
}

export default App;