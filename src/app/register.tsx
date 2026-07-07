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

const SERVICE_ID = "service_kkkr0xj";
const ADMIN_TEMPLATE_ID = "template_w01c7ku";
const STUDENT_TEMPLATE_ID = "template_9se77eg";
const PUBLIC_KEY = "eGuNf2PLEmedxzflY";

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

  function formatName(name: string) {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  function formatFee(value: string) {
    return Number(value).toLocaleString() + " Birr";
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
    const cleanName = formatName(fullName);
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();

    const { data: existingStudent, error: checkError } = await supabase
      .from("students")
      .select("student_id, name, phone, email")
      .or(`phone.eq.${cleanPhone},email.eq.${cleanEmail}`)
      .limit(1)
      .maybeSingle();

    if (checkError) {
      setLoading(false);
      setMessage("❌ Duplicate check error: " + checkError.message);
      return;
    }

    if (existingStudent) {
      setLoading(false);

      if (existingStudent.phone === cleanPhone) {
        setMessage(
          `❌ This phone number is already registered.\n\nStudent: ${existingStudent.name}\nStudent ID: ${existingStudent.student_id}\n\nPlease login to Learner Portal instead.`
        );
        return;
      }

      if (String(existingStudent.email).toLowerCase() === cleanEmail) {
        setMessage(
          `❌ This email address is already registered.\n\nStudent: ${existingStudent.name}\nStudent ID: ${existingStudent.student_id}\n\nPlease login to Learner Portal instead.`
        );
        return;
      }
    }

    const { error } = await supabase.from("students").insert({
      student_id: studentId,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
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

    const { error: transactionError } = await supabase.from("transactions").insert({
      student_id: studentId,
      student_name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      course: "Full Web Development",
      amount: Number(fee),
      status: "Pending",
      type: "Registration Fee",
    });

    if (transactionError) {
      setLoading(false);
      setMessage("❌ Transaction error: " + transactionError.message);
      return;
    }

    const emailData = {
      full_name: cleanName,
      student_name: cleanName,
      student_email: cleanEmail,
      student_phone: cleanPhone,
      student_id: studentId,
      student_course: "Full Web Development",
      course_fee: formatFee(fee),
      fee_text: formatFee(fee),
      start_date: startDate,
      logo_url: "https://dummyimage.com/160x60/12306d/ffffff.png&text=EGA",
    };

    const adminEmailData = {
      email: cleanEmail,
      to_email: "i.gennex2026@gmail.com",
      name: cleanName,
      from_name: cleanName,
      student_name: cleanName,
      student_email: cleanEmail,
      phone: cleanPhone,
      student_phone: cleanPhone,
      course: "Full Web Development",
      fee: formatFee(fee),
      start_date: startDate,
      ...emailData,
    };

    const studentEmailData = {
      email: cleanEmail,
      to_email: cleanEmail,
      name: cleanName,
      from_name: cleanName,
      student_name: cleanName,
      student_email: cleanEmail,
      phone: cleanPhone,
      student_phone: cleanPhone,
      course: "Full Web Development",
      fee: formatFee(fee),
      start_date: startDate,
      ...emailData,
    };

    console.log("ADMIN TEMPLATE:", ADMIN_TEMPLATE_ID);
    console.log("STUDENT TEMPLATE:", STUDENT_TEMPLATE_ID);

    const emailResults = await Promise.allSettled([
      emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, adminEmailData, PUBLIC_KEY),
      emailjs.send(SERVICE_ID, STUDENT_TEMPLATE_ID, studentEmailData, PUBLIC_KEY),
    ]);

    const adminEmailOk = emailResults[0].status === "fulfilled";
    const studentEmailOk = emailResults[1].status === "fulfilled";

    if (adminEmailOk && studentEmailOk) {
      setMessage(
        `✅ Registration Successful — Admin and student emails sent for ${cleanName}\n\nStudent ID: ${studentId}\nPhone: ${cleanPhone}\n\nUse this Student ID and Phone to login to Learner Portal.`
      );
    } else {
      const errors = emailResults
        .map((result, index) => {
          if (result.status === "fulfilled") return "";
          const label = index === 0 ? "Admin email error" : "Student email error";
          const reason: any = result.reason;
          return label + ": " + (reason?.text || reason?.message || "Unknown email error");
        })
        .filter(Boolean)
        .join(" | ");

      setMessage("✅ Registered, but email issue: " + errors);
    }

    setFullName("");
    setPhone("");
    setEmail("");

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
