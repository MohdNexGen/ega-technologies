import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function FullWebPage() {
  return (
    <View style={styles.container}>
      <Link href="/explore" style={styles.back}>← Back to Courses</Link>
      <Text style={styles.title}>💻 Full Web Development</Text>
      <Text style={styles.text}>HTML, CSS, JavaScript, React, Expo, and deployment.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f3f4f6" },
  back: { fontSize: 16, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  text: { fontSize: 18 },
});