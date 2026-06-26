import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HTMLAdvancedCertificate() {
  const { score } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.badge}>🏆</Text>
      <Text style={styles.title}>Advanced HTML Certificate</Text>

      <Text style={styles.text}>This certifies that the student has successfully completed</Text>
      <Text style={styles.course}>Advanced HTML Quiz</Text>
      <Text style={styles.score}>Final Score: {score || "Passed"}%</Text>
      <Text style={styles.text}>with EGA Technologies.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/html-lecture")}>
        <Text style={styles.buttonText}>Back to HTML Lecture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: "#f4f8fb", alignItems: "center", minHeight: "100%" },
  badge: { fontSize: 70, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#003366", textAlign: "center", marginBottom: 25 },
  text: { fontSize: 20, textAlign: "center", marginBottom: 12 },
  course: { fontSize: 28, fontWeight: "bold", color: "#b8860b", textAlign: "center", marginVertical: 20 },
  score: { fontSize: 24, fontWeight: "bold", color: "#28a745", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#003366", padding: 16, borderRadius: 12, marginTop: 30, width: "100%" },
  homeButton: { backgroundColor: "#28a745", padding: 16, borderRadius: 12, marginTop: 12, width: "100%" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
