import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function CoursesScreen() {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Courses</Text>
        <Text style={styles.subtitle}>
          Learn professional skills at Najash College
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