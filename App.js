import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screens from "./src/navigation/Screens";
import 'react-native-gesture-handler';

export default function App() {
  return <Screens></Screens>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
