import { Link } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const STUDENT_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanPhone || !cleanEmail) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const studentId = "DFS-2026-" + Date.now();

      const { error } = await supabase.from("students").insert({
        student_id: studentId,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        language: "English",
        course: "Full Web Development",
        fee: 3000,
        payment_status: "Pending",
        payment_method: "Manual",
        payment_reference: null,
      });

      if (error) {
        console.log("❌ Supabase Error:", error);
        setMessage("❌ Supabase Error: " + error.message);
        setLoading(false);
        return;
      }

      const adminParams = {
        student_id: studentId,
        student_name: cleanName,
        full_name: cleanName,
        student_email: cleanEmail,
        student_phone: cleanPhone,
        student_course: "Full Web Development",
        student_message: "New student registration",
        to_email: "i.developer2026@gmail.com",
      };

      const studentParams = {
        student_id: studentId,
        student_name: cleanName,
        full_name: cleanName,
        student_email: cleanEmail,
        student_phone: cleanPhone,
        student_course: "Full Web Development",
        student_message: "Your registration was received successfully.",
        to_email: cleanEmail,
      };

      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, adminParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, STUDENT_TEMPLATE_ID, studentParams, PUBLIC_KEY);

      setMessage("✅ Registration saved. Admin and student emails sent.");
      setFullName("");
      setPhone("");
      setEmail("");
    } catch (err: any) {
      console.log("REGISTER ERROR:", err);
      setMessage("❌ Error: " + (err?.text || err?.message || "Unknown error"));
    }

    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Registration</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Student Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Please wait..." : "Register"}</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Link href="/" style={styles.link}>← Back Home</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, paddingTop: 80, backgroundColor: "#fff", flexGrow: 1 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 25 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 14, borderRadius: 8, marginBottom: 14, fontSize: 16 },
  button: { backgroundColor: "#0047d9", padding: 15, borderRadius: 8, marginTop: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  message: { textAlign: "center", marginTop: 15, fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 20, color: "#0047d9" },
});
