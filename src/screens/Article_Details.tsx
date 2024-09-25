import { View, FlatList, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
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
  ChevronRightIcon,
} from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";

export default function Article_Details({ route }) {
  const commonDataService = new CommonDataService();
  const navigation = useNavigation();
  const [dataset, setDataset] = useState({ products: [], articles: [] });

  // const Get_Fav = () => {
  //   // console.log("entered");
  //   // let dataset = {
  //   //   email: c?.email,
  //   //   password: c?.password,
  //   // };

  //   commonDataService
  //     .fetchData(SERVICE_ROUTE.GET_ARTICLES)
  //     .then((res) => {
  //       setDataset((c) => ({ ...c, articles: res?.data }));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   Get_Fav();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <View style={{ flexDirection: "row", height: "10%" }}>
        <View style={{ width: "35%", justifyContent: "center" }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 10 }}
          >
            <Icon as={ChevronLeftIcon} size="xl" />
          </Pressable>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text bold>Detail </Text>
        </View>
      </View>

      <View
        style={{
          height: "100%",
          marginVertical: 20,

          paddingHorizontal: 10,
        }}
      >
        <Text paddingVertical={20} bold>
          {" "}
          {route?.params?.data?.title}
        </Text>

        <Pressable style={{ width: "100%", paddingHorizontal: 10 }}>
          <Image
            style={{
              backgroundColor: "yellow",
              width: "100%",
              height: undefined,
              aspectRatio: 2,
              borderRadius: 15,
              resizeMode: "stretch",
            }}
            source={{
              uri: `data:image/png;base64,${route?.params?.data?.image}`,
            }}
            alt={"---"}
          />
        </Pressable>
        <Text style={{ paddingHorizontal: 10, paddingVertical:10}}>{route?.params?.data?.description}</Text>
      </View>
    
    </SafeAreaView>
  );
}
