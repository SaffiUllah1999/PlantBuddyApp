import { View, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Icon,
  Text,
  Pressable,
  Box,
  Image,
  Button,
  ButtonText,
  ModalContent,
} from "@gluestack-ui/themed";
import { ChevronLeftIcon, Trash2 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";
import { useFocusEffect } from "@react-navigation/native";
import { useData } from "../hooks/useData";
import moment from "moment";
import { Modal } from "@gluestack-ui/themed";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";
import { ModalBody } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import AnimatedLottieView from "lottie-react-native";

export default function Cart() {
  const commonDataService = new CommonDataService();
  const { userData } = useData();
  const [dataset, setDataset] = useState({ products: [], totalPrice: "" });
  const [showModal, setShowModal] = useState(false);

  const Get_Products = () => {
    const dataset = { email: userData?.email };
    commonDataService
      .fetchData_3(SERVICE_ROUTE.GET_CART_DATA, dataset)
      .then((res) => {
        setDataset({
          products: res?.data,
          totalPrice: calculateTotalPrice(res?.data)?.toString(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Remove_Cart = (productId) => {
    const dataset = {
      _id: productId,
      email: userData?.email,
    };
    commonDataService
      .executeApiCall(SERVICE_ROUTE.REMOVE_DATA_CART, dataset)
      .then(() => {
        Get_Products();
      })
      .catch((error) => {
        Alert.alert("Error", error?.response?.data?.message, [{ text: "OK" }]);
      });
  };

  const PlaceOrder = () => {
    const orders = dataset.products.map((item) => ({
      email: userData?.email,
      product_id: item?.data?._id,
      added_date: moment().format(),
      name: item?.data?.name,
      price: item?.data?.price,
      quantity: item?.quantity,
      status : "complete"
    }));

    commonDataService
      .executeApiCall(SERVICE_ROUTE.PLACE_ORDER, { orders })
      .then((res) => {
        Alert.alert("Success", "Order placed successfully!", [{ text: "OK" }]);
        Get_Products(); // Refresh the cart
      })
      .catch((error) => {
        Alert.alert("Error", error?.response?.data?.message, [{ text: "OK" }]);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      Get_Products();
    }, [])
  );

  const calculateTotalPrice = (products) => {
    return products.reduce(
      (total, item) =>
        total + (parseFloat(item?.data?.price) * item?.quantity || 0),
      0
    );
  };

  const navigation = useNavigation();

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
      </View>
      <View style={{ height: "5%" }}>
        <Pressable onPress={() => Get_Products()}>
          <Text bold size={"2xl"} paddingHorizontal={10} color={"#0D986A"}>
            Your Bag
          </Text>
        </Pressable>
      </View>
      <View style={{ height: "50%", paddingVertical: 10 }}>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton onPress={() => navigation.navigate("login")}>
                <Icon as={CloseIcon} size="xl" />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AnimatedLottieView
                  speed={1}
                  duration={5000}
                  autoPlay
                  loop={true}
                  // ref={animation}
                  style={{ width: 250, height: 250 }}
                  resizeMode="cover"
                  source={require("../assets/animation/Success.json")}
                />
                <Text bold alignSelf="center">
                  Order Placed Successfully
                </Text>
              </View>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        <FlatList
          data={dataset?.products}
          style={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <Pressable flex={1}>
              <Box bg="#F0F4EF" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "20%" }}>
                    <Image
                      style={{ aspectRatio: 4, resizeMode: "contain" }}
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
                      <Text color="#000" bold>
                        Quantity: {item?.quantity}
                      </Text>
                      <Text>
                        Rs {parseFloat(item?.data?.price) * item?.quantity}
                      </Text>
                    </View>
                    <Pressable onPress={() => Remove_Cart(item?.data?._id)}>
                      <Icon color={"red"} as={Trash2} size="xl" />
                    </Pressable>
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
          height: "10%",
          justifyContent: "space-between",
        }}
      >
        <Text bold size={"2xl"} paddingVertical={10} color={"#0D986A"}>
          Total
        </Text>
        <Text bold size={"xl"} paddingVertical={10} color={"#0D986A"}>
          Rs {dataset?.totalPrice}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 10,
        }}
      >
        <Button bg="#0D986A" onPress={PlaceOrder}>
          <ButtonText>Place Order</ButtonText>
        </Button>
      </View>
    </View>
  );
}
