import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1e3a8a",
        tabBarStyle: {
          backgroundColor: "white",
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Courses",
          tabBarIcon: () => <Text>📚</Text>,
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: () => <Text>📝</Text>,
        }}
      />

      <Tabs.Screen
        name="portal"
        options={{
          title: "Portal",
          tabBarIcon: () => <Text>🎓</Text>,
        }}
      />

      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: () => <Text>💳</Text>,
        }}
      />
    </Tabs>
  );
}