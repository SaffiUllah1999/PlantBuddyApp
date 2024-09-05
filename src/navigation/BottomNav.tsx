import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu from "./Menu";
import { Camera } from 'lucide-react-native';
import { Icon } from "@gluestack-ui/themed";

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
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: {
      backgroundColor: '#FCFCFD', // Background color of the tab bar
    }, }} >
      <Tab.Screen name="Home" component={Menu} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
                backgroundColor: "white" ,
                marginBottom: 20 ,
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
      <Tab.Screen name="Settings1" component={SettingsScreen} />
      <Tab.Screen name="Settings2" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
