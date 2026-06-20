import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function ArabicWebPage() {
  return (
    <View style={styles.container}>
      <Link href="/explore" style={styles.back}>← Back to Courses</Link>
      <Text style={styles.title}>🌐 Arabic Web Development</Text>
      <Text style={styles.text}>Learn web development with Arabic explanations.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f3f4f6" },
  back: { fontSize: 16, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 18 },
});