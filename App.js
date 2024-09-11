import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screens from "./src/navigation/Screens";
import "react-native-gesture-handler";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Screens></Screens>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});