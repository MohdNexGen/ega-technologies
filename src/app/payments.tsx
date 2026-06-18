import { Text, View, StyleSheet } from "react-native";

export default function PaymentsScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>💳 Payments</Text>
      <Text style={styles.text}>
        Course Fee: 3000 ETB
      </Text>
      <Text style={styles.text}>
        Payment system coming next.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  text: {
    fontSize: 16,
    color: "#475569",
    marginTop: 12,
    textAlign: "center",
  },
});