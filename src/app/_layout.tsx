import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ 
            headerShown: true, 
            title:"Movies App",
            headerStyle: {
              backgroundColor: "#273646",
            },
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              color: "white",
            }, 
          }}
        />
        <Stack.Screen
          name="media-details"
          options={{
            headerShown: true,
            headerBackTitle: "Back to List", 
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}