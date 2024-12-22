import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./BottomNav";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Leaderboard from "../screens/Leaderboard";
import Order from "../screens/Order";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Home"  screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="My Orders" component={Order} />
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
    </Drawer.Navigator>
  );
}
