import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const STUDENT_TEMPLATE_ID = "template_rb2zrme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [fee, setFee] = useState("3000");
  const [startDate, setStartDate] = useState("Coming Soon");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("key", "course_settings")
      .maybeSingle();

    if (error) {
      setMessage("⚠️ Settings load error: " + error.message);
      return;
    }

    if (data) {
      setFee(String(data.fee ?? "3000"));
      setStartDate(String(data.start_date ?? "Coming Soon"));
    }
  }

  function generateStudentId() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `EGA-2026-${random}`;
  }

  async function handleRegister() {
    if (loading) return;

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("Registering...");

    const studentId = generateStudentId();

    const { error } = await supabase.from("students").insert({
      student_id: studentId,
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      language: "English",
      course: "Full Web Development",
      fee: Number(fee),
      payment_status: "Pending",
      payment_method: "Not Selected",
      payment_reference: "Not Provided",
      paid_at: null,
    });

    if (error) {
      setLoading(false);
      setMessage("❌ Supabase error: " + error.message);
      return;
    }

    const emailData = {
      full_name: fullName.trim(),
      student_name: fullName.trim(),
      student_email: email.trim(),
      student_phone: phone.trim(),
      student_id: studentId,
      student_course: "Full Web Development",
      course_fee: `${fee} ETB`,
      start_date: startDate,
      to_email: email.trim(),
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        emailData,
        PUBLIC_KEY
      );

      await emailjs.send(
        SERVICE_ID,
        STUDENT_TEMPLATE_ID,
        emailData,
        PUBLIC_KEY
      );

      setMessage(
        `✅ Registration Successful — Welcome ${fullName.trim()} to EGA Technologies`
      );

      setFullName("");
      setPhone("");
      setEmail("");
    } catch (emailError: any) {
      setMessage(
        "✅ Registered, but email error: " +
          (emailError?.text || emailError?.message || "Unknown email error")
      );
    }

    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📝</Text>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          Join EGA Technologies Web Development Training
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.info}>Course Fee: {fee} ETB</Text>
        <Text style={styles.info}>Start Date: {startDate}</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter full name"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registering..." : "Register Now"}
          </Text>
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>← Back to Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf3ff",
  },
  header: {
    backgroundColor: "#12306d",
    padding: 40,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  icon: {
    fontSize: 44,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "#dbe7ff",
    marginTop: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    margin: 18,
    padding: 18,
    borderRadius: 16,
  },
  info: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 8,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#12306d",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 18,
  },
  disabledButton: {
    backgroundColor: "#86efac",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#12306d",
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backText: {
    color: "#12306d",
    fontSize: 16,
    fontWeight: "bold",
  },
});