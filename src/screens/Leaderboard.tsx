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

export default function Leaderboard() {
  const navigation = useNavigation();
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <View style={{ flexDirection: "row", height: "10%" }}>
        <View style={{ width: "40%" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={ChevronLeftIcon} size="xl" />
          </Pressable>
        </View>
        <View style={{ width: "30%" }}>
          <Text bold>Leaderboard</Text>
        </View>
        <View style={{ width: "30%" }}></View>
      </View>
      <View style={{ height: "30%", flexDirection: "row" }}>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>2</Text>
          <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
            <AvatarFallbackText>Avatar</AvatarFallbackText>
          </Avatar>
          <Text>Hello</Text>
        </View>
        <View style={{ width: "40%", alignItems: "center" }}>
          <Text>1</Text>
          <Avatar bgColor="$amber600" size="2xl" borderRadius="$full">
            <AvatarFallbackText>Avatar</AvatarFallbackText>
          </Avatar>
          <Text>Hello</Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>3</Text>
          <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
            <AvatarFallbackText>Avatar</AvatarFallbackText>
          </Avatar>
          <Text>Hello</Text>
        </View>
      </View>
      <View style={{ height: "60%" }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={DATA}
          style={{ height: "100%" }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <Pressable flex={1}>
              <Box bg="#fff" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar bgColor="$amber600" size="sm" borderRadius="$full">
                    <AvatarFallbackText>Avatar</AvatarFallbackText>
                  </Avatar>
                  <Text paddingHorizontal={10}>Hee</Text>
                </View>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
