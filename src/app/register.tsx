import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.backButtonText}>← Home</Text>
        </Pressable>

        <Text style={styles.title}>📝 Register</Text>

        <Text style={styles.subtitle}>
          EGA Technologies Student Registration
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Registration</Text>

        <Text style={styles.text}>
          Student registration form coming next.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Course Fee</Text>

        <Text style={styles.amount}>Contact EGA</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Available Courses</Text>

        <Text style={styles.text}>💻 Full Web Development</Text>
        <Text style={styles.text}>🌐 Arabic Web Development</Text>
        <Text style={styles.text}>🇸🇴 Somali Web Development</Text>
        <Text style={styles.text}>🖥️ Computer Skills</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },

  header: {
    backgroundColor: "#1e3a8a",
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
    position: "relative",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },

  card: {
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 10,
  },

  amount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16a34a",
  },

  text: {
    fontSize: 16,
    color: "#475569",
    marginTop: 6,
  },
});