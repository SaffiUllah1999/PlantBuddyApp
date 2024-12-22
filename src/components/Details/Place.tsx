import { StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import { Image } from "@gluestack-ui/themed";
import { Icon, CalendarDaysIcon } from "@gluestack-ui/themed";
import {
  ChevronLeftIcon,
  CircleMinus,
  CirclePlus,
  Droplet,
  Heart,
  Navigation,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, ScrollView } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import { AddIcon } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Box } from "@gluestack-ui/themed";


export default function Place(props) {
  return (
    <View
    style={{
      flex: 1,
      paddingBottom: 20,
      backgroundColor: "#fff",
      marginHorizontal: 20,
      marginTop: 10,
    }}
  >
    <Text bold size={"xl"}>
      Place
    </Text>
    <View
      style={{
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        backgroundColor: "#036247",
      }}
    >
      <Text color="#fff" style={{ paddingVertical: 10 }}>
        Careful About
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "20%", alignItems: "flex-start" }}>
          <Pressable onPress={() => {}}>
            <View
              style={{
                backgroundColor: "#0ACF83",
                borderRadius: 1000,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text bold color={"#fff"}>
                
              </Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            width: "80%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text color="#fff"> {props?.data?.place1Data ? props?.data?.place1Data : "Room Temperate and Sunlight"}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ width: "20%", alignItems: "flex-start" }}>
          <Pressable onPress={() => {}}>
            <View
              style={{
                backgroundColor: "#0ACF83",
                borderRadius: 1000,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                borderColor="#fff"
            
                fill={"#fff"}
                as={Droplet}
                size="md"
              />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            width: "80%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text color="#fff"> {props?.data?.place2Data ? props?.data?.place2Data : "Avoid From"}</Text>
        </View>
      </View>
    </View>

  </View>
  )
}