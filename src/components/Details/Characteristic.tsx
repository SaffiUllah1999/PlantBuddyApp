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


export default function Characteristic() {
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
      Characteristics
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
        Careful
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
                1
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
          <Text color="#fff"> 312312321</Text>
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
          <Text color="#fff"> 312312321</Text>
        </View>
      </View>
    </View>

    <View
      style={{
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
        backgroundColor: "#036247",
      }}
    >
      <Text color="#fff" style={{ paddingVertical: 10 }}>
        Careful
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
                1
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
          <Text color="#fff"> 312312321</Text>
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
          <Text color="#fff"> 312312321</Text>
        </View>
      </View>
    </View>

    <View
      style={{
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
        backgroundColor: "#036247",
      }}
    >
      <Text color="#fff" style={{ paddingVertical: 10 }}>
        Careful
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
                1
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
          <Text color="#fff"> 312312321</Text>
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
          <Text color="#fff"> 312312321</Text>
        </View>
      </View>
    </View>
  </View>
  )
}