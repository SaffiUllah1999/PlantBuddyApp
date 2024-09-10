import { View, FlatList, useWindowDimensions } from "react-native";
import React from "react";
import {
  Avatar,
  AvatarFallbackText,
  Icon,
  CalendarDaysIcon,
  Text,
  MenuIcon,
  Pressable,
  Box,
  Image,
} from "@gluestack-ui/themed";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  MapPin,
  Heart,
  Plus,
  ShoppingCart,
  Grid2X2,
  UserSquare,
  ChevronLeftIcon,
} from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function Articles() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <View style={{ flexDirection: "row", height: "10%" }}>
        <View style={{ width: "40%" }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 10 }}
          >
            <Icon as={ChevronLeftIcon} size="xl" />
          </Pressable>
        </View>
        <View style={{ width: "30%" }}>
          <Text bold>Articles</Text>
        </View>
        <View style={{ width: "30%" }}></View>
      </View>
      <Text bold style={{ marginHorizontal: "3%" }} size="xl" color="#000">
        Category
      </Text>
      <View style={{ height: "5%", marginVertical: 20 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Box
            bg="#475E3E"
            justifyContent="center"
            borderRadius={40}
            marginHorizontal={10}
          >
            <Text color="white" paddingHorizontal={20}>
              All
            </Text>
          </Box>
          <Box
            bg="#fff"
            justifyContent="center"
            borderColor={"#D0D5DD"}
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="#D0D5DD" paddingHorizontal={20}>
              New
            </Text>
          </Box>
          <Box
            bg="#fff"
            borderWidth={1}
            borderColor={"#D0D5DD"}
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="#D0D5DD" paddingHorizontal={20}>
              Eco
            </Text>
          </Box>
          <Box
            bg="#fff"
            borderWidth={1}
            borderColor={"#D0D5DD"}
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="#D0D5DD" paddingHorizontal={20}>
              Tree
            </Text>
          </Box>
        </ScrollView>
      </View>

      <View
        style={{
          height: "40%",
          marginVertical: 20,

          paddingHorizontal: 10,
        }}
      >
        <Text paddingVertical={20}>Trending</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Pressable style={{ height: "100%", width: 300 }}>
            <Image
              style={{
                backgroundColor: "yellow",
                width: "100%",
                height: undefined,
                aspectRatio: 2,
                borderRadius: 15,
                resizeMode: "contain",
              }}
              source={require("../assets/images/image.png")}
              alt={"---"}
            />
            <Text bold size={"lg"}>
              dasdadsadasd
            </Text>
            <Text>dasdadsadasd</Text>
          </Pressable>
          <Pressable
            style={{ height: "100%", width: 300, marginHorizontal: 10 }}
          >
            <Image
              style={{
                backgroundColor: "red",
                width: "100%",
                borderRadius: 15,
                height: undefined,
                aspectRatio: 2,
                resizeMode: "contain",
              }}
              source={require("../assets/images/image.png")}
              alt={"---"}
            />
            <Text bold size={"lg"}>
              dasdadsadasd
            </Text>
            <Text>dasdadsadasd</Text>
          </Pressable>
          <Pressable style={{ height: "100%", width: 300 }}>
            <Image
              style={{
                backgroundColor: "yellow",
                width: "100%",
                borderRadius: 15,
                height: undefined,
                aspectRatio: 2,
                resizeMode: "contain",
              }}
              source={require("../assets/images/image.png")}
              alt={"---"}
            />
            <Text bold size={"lg"}>
              dasdadsadasd
            </Text>
            <Text>dasdadsadasd</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View style={{ height: "30%", marginVertical: 20 }}>
        {/* <Image
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 1,
            resizeMode: "contain",
          }}
          source={require("../assets/images/image.png")}
          alt={"---"}
        /> */}
      </View>
    </SafeAreaView>
  );
}
