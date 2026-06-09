import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact({ goBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const SERVICE_ID = "YOUR_SERVICE_ID";
  const SCHOOL_TEMPLATE_ID = "YOUR_SCHOOL_TEMPLATE_ID";
  const STUDENT_TEMPLATE_ID = "YOUR_STUDENT_TEMPLATE_ID";
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

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

    if (!form.name || !form.email || !form.course || !form.message) {
      setStatus("Please fill all fields before sending.");
      return;
    }

    if (
      SERVICE_ID === "YOUR_SERVICE_ID" ||
      SCHOOL_TEMPLATE_ID === "YOUR_SCHOOL_TEMPLATE_ID" ||
      STUDENT_TEMPLATE_ID === "YOUR_STUDENT_TEMPLATE_ID" ||
      PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      setStatus("EmailJS is not connected yet. Add your real EmailJS IDs.");
      return;
    }

    setSending(true);

    const templateParams = {
      student_name: form.name,
      student_email: form.email,
      selected_course: form.course,
      student_message: form.message,
      to_email: form.email,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        SCHOOL_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      await emailjs.send(
        SERVICE_ID,
        STUDENT_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setStatus("Message sent successfully. Confirmation email sent.");

      setForm({
        name: "",
        email: "",
        course: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setStatus("Failed to send message. Please check EmailJS settings.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="page-card">
      <button type="button" className="back-btn" onClick={handleBack}>
        ← Back Home
      </button>

      <h2>Contact EGA</h2>

      <div className="course-box">
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

          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript ES6">JavaScript ES6</option>
            <option value="React">React</option>
            <option value="Node.js and Express">Node.js and Express</option>
            <option value="Full Web Development">Full Web Development</option>
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