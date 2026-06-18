import { router } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

export default function PortalScreen() {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>← Home</Text>
        </Pressable>

        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.title}>Learner Portal</Text>
        <Text style={styles.subtitle}>
          Login to view progress and certificate
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Student ID</Text>

        <TextInput
          style={styles.input}
          placeholder="Example: EGA-2026-0001"
        />

        <Text style={styles.label}>Phone Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Example: 0912345678"
          keyboardType="phone-pad"
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Information</Text>
        <Text style={styles.info}>Name: Not logged in</Text>
        <Text style={styles.info}>Course: Web Development</Text>
        <Text style={styles.info}>Quiz Score: 0%</Text>
        <Text style={styles.info}>Certificate Status: Not Ready</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#eef3ff",
  },

  header: {
    backgroundColor: "#1e3a8a",
    paddingTop: 80,
    paddingBottom: 45,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    zIndex: 999,
  },

  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  logo: {
    fontSize: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: "white",
    margin: 16,
    padding: 22,
    borderRadius: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#facc15",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#1e3a8a",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 10,
  },

  info: {
    fontSize: 16,
    color: "#334155",
    marginTop: 8,
  },
});