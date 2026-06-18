import { router } from "expo-router";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";

export default function CoursesScreen() {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.backButtonText}>← Home</Text>
        </Pressable>

        <Text style={styles.title}>📚 Courses</Text>

        <Text style={styles.subtitle}>
          Learn professional skills at EGA Technologies
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.course}>💻 Full Web Development</Text>
        <Text>HTML, CSS, JavaScript, React</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.course}>🌐 Arabic Web Development</Text>
        <Text>Programming in Arabic</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.course}>🇸🇴 Somali Web Development</Text>
        <Text>Programming in Somali</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.course}>🖥️ Computer Skills</Text>
        <Text>Windows, Word, Excel, PowerPoint</Text>
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
    paddingTop: 100,
    paddingBottom: 40,
    alignItems: "center",
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

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
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

  course: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 8,
  },
});