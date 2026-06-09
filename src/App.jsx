import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const AUTO_REPLY_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

function App() {
  const [page, setPage] = useState("home");

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
    setForm({ ...form, [e.target.name]: e.target.value });
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

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "Full Web Development",
        message: "",
      });

      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Failed to send message. Please try again.");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  }

  if (page === "home") {
    return (
      <div className="app">
        <div className="contact-section">
          <h1>EGA Technologies</h1>
          <p>Learn web development step by step with real projects.</p>

          <button onClick={() => setPage("contact")}>
            Contact / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="contact-section">
        <button
          type="button"
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back
        </button>

        <h1>Contact EGA</h1>

        <p>
          Students can contact EGA to register or ask about available courses.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select name="course" value={form.course} onChange={handleChange}>
            <option value="Full Web Development">Full Web Development</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript ES6">JavaScript ES6</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
          </select>

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <div className="success-message">{status}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;