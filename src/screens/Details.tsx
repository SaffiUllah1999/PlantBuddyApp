import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
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
import Carefull from "../components/Details/Carefull";
import Place from "../components/Details/Place";
import Characteristic from "../components/Details/Characteristic";
import { Alert } from "react-native";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";
import { useData } from "../hooks/useData";
import moment from "moment";

const FirstRoute = () => (
  <ScrollView>
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 10,
      }}
    >
      <Text bold size={"xl"}>
        Careful
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
                <Icon borderColor="#fff" fill={"#fff"} as={Droplet} size="md" />
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
                <Icon borderColor="#fff" fill={"#fff"} as={Droplet} size="md" />
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
  </ScrollView>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const Third = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: Third,
});

export default function Details({ route }) {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [current, setCurrent] = useState(1);
  const { userData, setUserData } = useData();
  const commonDataService = new CommonDataService();
  const [quantity, setQuantity] = useState("1");

  const Add_Score = (c) => {
    console.log("entered");
    let data_set = {
      email: userData?.email,
      scoreToAdd: 100,
    };

    console.log(JSON.stringify(data_set));

    commonDataService
      .executeApiCall(SERVICE_ROUTE.ADD_SCORE, data_set)
      .then((res) => {
        // setShowModal(true)
      })
      .catch(function (error) {
        if (error) {
          console.log(JSON.stringify(error.response?.data));
          Alert.alert(
            "Error", // Title of the alert
            error?.response?.data?.message, // Message of the alert
            [{ text: "OK" }] // Buttons array, with an OK button
          );
        }
      });
  };

  const PlaceOrder = () => {
    const orders = [
      {
        email: userData?.email,
        product_id: route?.params?.data?._id,
        added_date: moment().format(),
        name: route?.params?.data?.name,
        price: route?.params?.data?.price,
        quantity: parseInt(quantity),
      },
    ];

    commonDataService
      .executeApiCall(SERVICE_ROUTE.PLACE_ORDER, { orders })
      .then((res) => {
        Alert.alert("Success", "Order placed successfully!", [{ text: "OK" }]);
      })
      .catch((error) => {
        Alert.alert("Error", error?.response?.data?.message, [{ text: "OK" }]);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: "#F0F4EF", paddingTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View style={{ width: "20%", alignItems: "center" }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icon as={ChevronLeftIcon} size="xl" />
              </Pressable>
            </View>
            <View style={{ width: "60%" }}>
              <Image
                style={{
                  width: "100%",
                  height: undefined,
                  aspectRatio: 1,
                  resizeMode: "contain",
                }}
                source={route?.params?.data?.image}
                alt={"---"}
              />
            </View>
            <View style={{ width: "20%", alignItems: "center" }}>
              <Icon fill={"#000"} as={Heart} size="xl" />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,

            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 30,
              marginVertical: 30,
            }}
          >
            <View style={{ width: "70%" }}>
              <Text>{route?.params?.data?.name}</Text>
              <Text>Rs{route?.params?.data?.price}</Text>
            </View>
            <View style={{ width: "30%" }}>
              <View
                style={{
                  backgroundColor: "#F0F4EF",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: 100,
                  padding: 5,
                }}
              >
                <Pressable
                  style={{
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                  onPress={() => setQuantity(parseInt(quantity) + 1)}
                >
                  <Icon
                    fill={"#B5C9AD"}
                    as={CirclePlus}
                    color={"#fff"}
                    size="xl"
                  />
                </Pressable>
                <View
                  style={{ marginHorizontal: 10, justifyContent: "center" }}
                >
                  <Text>{quantity}</Text>
                </View>
                <Pressable
                  style={{
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                  onPress={() =>
                    parseInt(quantity) > 0
                      ? setQuantity((parseInt(quantity) - 1)?.toString())
                      : ""
                  }
                >
                  <Icon
                    fill={"#B5C9AD"}
                    as={CircleMinus}
                    color={"#fff"}
                    size="xl"
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <Text>Details</Text>
            <Text>...</Text>
          </View>
          <View
            style={{
              marginHorizontal: 30,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 30,
            }}
          >
            <Button
              size="lg"
              variant="solid"
              action="primary"
              bg="#475E3E"
              isDisabled={false}
              isFocusVisible={false}
              borderRadius={20}
              onPress={() => PlaceOrder()}
            >
              <ButtonText>Buy Now </ButtonText>
            </Button>

            <Button
              size="lg"
              variant="solid"
              action="primary"
              bg="#475E3E"
              borderRadius={20}
              isDisabled={false}
              isFocusVisible={false}
              onPress={() =>
                Alert.alert(
                  "Alert",
                  "are you sure to donate plant ?",
                  [
                    { text: "cancel" },
                    { text: "OK", onPress: () => Add_Score() },
                  ] // Buttons array, with an OK button
                )
              }
            >
              <ButtonText>Donate Plant </ButtonText>
            </Button>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Pressable onPress={() => setCurrent(1)}>
              <Box
                bg={current === 1 ? "#475E3E" : "#fff"}
                justifyContent="center"
                borderRadius={40}
                marginHorizontal={10}
              >
                <Text
                  color={current === 1 ? "#fff" : "#D0D5DD"}
                  paddingHorizontal={20}
                  paddingVertical={10}
                >
                  Careful
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => setCurrent(2)}>
              <Box
                bg={current === 2 ? "#475E3E" : "#fff"}
                justifyContent="center"
                borderColor={"#D0D5DD"}
                borderRadius={50}
                marginHorizontal={10}
              >
                <Text
                  color={current === 2 ? "#fff" : "#D0D5DD"}
                  paddingHorizontal={20}
                  paddingVertical={10}
                >
                  Place
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => setCurrent(3)}>
              <Box
                bg={current === 3 ? "#475E3E" : "#fff"}
                borderColor={"#D0D5DD"}
                justifyContent="center"
                borderRadius={50}
                marginHorizontal={10}
              >
                <Text
                  color={current === 3 ? "#fff" : "#D0D5DD"}
                  paddingHorizontal={20}
                  paddingVertical={10}
                >
                  Characteristics
                </Text>
              </Box>
            </Pressable>
          </ScrollView>
          {current === 1 ? (
            <Carefull/>
          ) : current === 2 ? (
            <Place/>
          ) : (
            <Characteristic/>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
