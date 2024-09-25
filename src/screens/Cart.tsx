import { View, FlatList, useWindowDimensions, Alert } from "react-native";
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
  ChevronLeftIcon,
  UserSquare,
  Navigation,
  Trash2,
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
import { useFocusEffect } from "@react-navigation/native";
import { useData } from "../hooks/useData";

export default function Cart() {
  const commonDataService = new CommonDataService();
  const { userData, setUserData } = useData();
  const [dataset, setDataset] = useState({ products: [], totalPrice: "" });

  const Get_Products = () =>(c) => {
    console.log("entered");
    let dataset = {
      email: userData?.email,
    };
    commonDataService
      .fetchData_2(SERVICE_ROUTE.GET_CART_DATA, data)
      .then((res) => {
        setDataset((c) => ({ ...c, products: res?.data }));
        setDataset((c) => ({
          ...c,
          totalPrice: calculateTotalPrice(res?.data)?.toString(),
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Remove_Cart = (c) => {
    console.log(c);
    let dataset = {
      _id: c,
      email: userData?.email
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.REMOVE_DATA_CART, dataset)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));
        Get_Products()
        // setShowModal(true)
      })
      .catch(function (error) {
        if (error) {

          Alert.alert(
            "Error", // Title of the alert
            error?.response?.data?.message, // Message of the alert
            [{ text: "OK" }] // Buttons array, with an OK button
          );
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      Get_Products();
    }, [])
  );

  const navigation = useNavigation();

  const calculateTotalPrice = (c) => {
    return c.reduce(
      (total, item) => total + (parseFloat(item?.data?.price) || 0),
      0
    );
  };

  // const totalPrice = calculateTotalPrice();

  return (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", height: "15%" }}>
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
          <Text bold>Cart</Text>
        </View>
        <View style={{ width: "35%" }}></View>
      </View>
      <View style={{ height: "5%" }}>
        <Text bold size={"2xl"} paddingHorizontal={10} color={"#0D986A"}>
          Your Bag
        </Text>
      </View>
      <View style={{ height: "50%", paddingVertical: 10 }}>
        <FlatList
          data={dataset?.products}
          style={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Details")} flex={1}>
              <Box bg="#F0F4EF" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "20%" }}>
                    <Image
                      style={{
                        aspectRatio: 4,
                        resizeMode: "contain",
                      }}
                      source={{
                        uri: `data:image/png;base64,${item?.data?.image}`,
                      }}
                      alt={"---"}
                    />
                  </View>

                  <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                    <View style={{ width: "80%" }}>
                      <Text color="#000" bold>
                        {item?.data?.name}
                      </Text>
                      <Text>Rs{item?.data?.price}</Text>
                    </View>
                    <View style={{ width: "0%" }}>
                      <Pressable onPress={()=>Remove_Cart(item?.data?._id)}>
                      <Icon color={"red"} as={Trash2} size="xl" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          height: "25%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            bold
            size={"2xl"}
            paddingHorizontal={10}
            paddingVertical={10}
            color={"#0D986A"}
          >
            Total
          </Text>
        </View>
        <View>
          <Text
            bold
            size={"xl"}
            paddingHorizontal={10}
            paddingVertical={10}
            color={"#0D986A"}
          >
            Rs {dataset?.totalPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}
