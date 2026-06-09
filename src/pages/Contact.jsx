import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "nexgen_gmail";
const SCHOOL_TEMPLATE_ID = "template_zvfw3qd";
const STUDENT_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

function Contact({ goBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Full Web Development",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    if (goBack) {
      goBack();
    } else {
      window.location.href = "/";
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!form.name || !form.email || !form.phone || !form.course || !form.message) {
      setStatus("Please fill all fields before sending.");
      return;
    }

    setSending(true);
    setStatus("Sending...");

    const templateParams = {
      student_name: form.name,
      student_email: form.email,
      student_phone: form.phone,
      student_course: form.course,
      selected_course: form.course,
      student_message: form.message,
      to_email: form.email,
    };

    try {
      await Promise.all([
        emailjs.send(SERVICE_ID, SCHOOL_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, STUDENT_TEMPLATE_ID, templateParams, PUBLIC_KEY),
      ]);

      setStatus("✅ Message sent successfully. Confirmation email sent.");

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "Full Web Development",
        message: "",
      });

      setTimeout(() => {
        setStatus("");
      }, 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Failed to send message. Please check EmailJS settings.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="page-card contact-page">
      <button type="button" className="back-btn" onClick={handleBack}>
        ← Back Home
      </button>

      <h2>Contact EGA</h2>

      <div className="course-box contact-box">
        <h3>Register or Contact Us</h3>

        <p>
          Fill out the form below to register for a course or ask EGA
          Technologies for more information.
        </p>

        <form className="contact-form" onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
          >
            <option value="Full Web Development">Full Web Development</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript ES6">JavaScript ES6</option>
            <option value="React">React</option>
            <option value="Node.js and Express">Node.js and Express</option>
          </select>

          <textarea
            name="message"
            placeholder="Write your message here"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="form-status">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;