import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Order from "../screens/Order";
import Leaderboard from "../screens/Leaderboard";

const Drawer = createDrawerNavigator();
 

// ---------------- CUSTOM DRAWER CONTENT ----------------
function CustomDrawerContent(props) {
  const { state, navigation } = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      {/* 🔵 Top Image */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}   // Change to your image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 🔵 Drawer Items */}
      {state.routeNames.map((route, index) => {
        const isActive = state.index === index;

        return (
          <DrawerItem
            key={route}
            label={route}
            onPress={() => navigation.navigate(route)}
            labelStyle={{
              color: isActive ? "#fff" : "#888",
              fontSize: 16,
            }}
            style={{
              backgroundColor: isActive ? "#1a1a1a" : "transparent",
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 4,
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

// ---------------- MAIN DRAWER NAVIGATOR ----------------
export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerType="slide"
      overlayColor="transparent"
      sceneContainerStyle={{ backgroundColor: "#000" }}
      drawerStyle={{
        flex: 1,
        width: "60%",
        backgroundColor: "transparent",
        borderRightWidth: 0,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="My Orders" component={Order} />
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
    </Drawer.Navigator>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
