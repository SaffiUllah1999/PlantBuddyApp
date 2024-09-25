import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu from "./Menu";
import { BookOpen, Camera, Globe, House, UserRound } from "lucide-react-native";
import { Icon } from "@gluestack-ui/themed";
import Profile from "../screens/Profile";
import Articles from "../screens/Articles";
import Browse from "../screens/Browse";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FCFCFD", // Background color of the tab bar
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Menu}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: {
            color: "#000"
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Icon
                as={House}
                size="lg"
                fill={focused ? "#0ACF83" :"#fff"}
                // color={focused ? colors.primary : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Article"
        component={Articles}
        options={{
          tabBarLabel: "Article",
          headerShown: false,
          tabBarLabelStyle: {
            color: "#000"
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Icon
                as={BookOpen}
                size="lg"
                fill={focused ? "#0ACF83" :"#fff"}
                // color={focused ? colors.primary : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings_"
        component={SettingsScreen}
        options={{
          tabBarLabel: "",
          headerShown: false,
      
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderWidth: 20,
                borderColor: "white",
                alignItems: "center",
                borderRadius: 100,
                backgroundColor: "white",
                marginBottom: 20,
                marginTop: focused ? 0 : 12,
              }}
            >
              <Icon
                as={Camera}
                size="lg"
                // color={focused ? colors.primary : "white"}
              />
              {focused ? (
                <></>
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: 12,
                    marginTop: 5,
                  }}
                >
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarLabel: "Browse",
          headerShown: false,
          tabBarLabelStyle: {
            color: "#000"
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Icon
                as={Globe}
                size="lg"
                fill={focused ? "#0ACF83" :"#fff"}
                // color={focused ? colors.primary : "white"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: {
            color: "#000"
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Icon
                as={UserRound}
                size="lg"
                fill={focused ? "#0ACF83" :"#fff"}
                // color={focused ? colors.primary : "white"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
