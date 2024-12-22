import { View, FlatList, Alert, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallbackText,
  Icon,
  CalendarDaysIcon,
  Text,
  MenuIcon,
  Pressable,
  Box,
  CloseIcon,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  MapPin,
  Heart,
  Plus,
  ShoppingCart,
  ChevronLeft,
  Trash2,
  Edit,
} from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { Image } from "@gluestack-ui/themed";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";
import { useData } from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";
import { Modal } from "@gluestack-ui/themed";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { ModalBody } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import AnimatedLottieView from "lottie-react-native";
import moment from "moment";

export default function Order() {
  const { userData, setUserData } = useData();
  const commonDataService = new CommonDataService();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [review, setReview] = useState(false);
  const [currentData, setCurrentData] = useState();
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const [dataset, setDataset] = useState({
    active_category: 1,
    products: [],
    favourites: [],
    modal: false,
    item_selected: {},
    quantity: 0,
  });

  const Get_Products = () => {
    console.log("entered");
    // let dataset = {
    //   email: c?.email,
    //   password: c?.password,
    // };

    commonDataService
      .fetchData(SERVICE_ROUTE.GET_ALL_ORDERS)
      .then((res) => {
        setDataset((c) => ({ ...c, products: res?.data?.data }));
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SubmitReview = (c) => {
    console.log("entered");
    let data_set = {
      _id: c?._id,
      product_id: c?.product_id,
      email: c?.email,
      comment: review,
      review_date: moment().format(),
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.SAVE_REVIEW, data_set)
      .then((res) => {
        console.log(JSON.stringify(res));
        res?.data ? ( setShowModal(false),setSuccess(true)) : "";
      })
      .catch(function (error) {
         console.log(JSON.stringify(error?.response?.data));
        // if (error) {
        //   setloading(false);
       
        //   Alert.alert(
        //     "Error", // Title of the alert
        //     error?.response?.data, // Message of the alert
        //     [{ text: "OK" }] // Buttons array, with an OK button
        //   );
        // }
      });
  };


    useFocusEffect(
      React.useCallback(() => {
        Get_Products();
      }, [])
    );
  

  return (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
      <Modal
        isOpen={success}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton onPress={() => setSuccess(false)}>
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
                Review Submitted Successfully
              </Text>
            </View>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton onPress={() => setShowModal(false)}>
              <Icon as={CloseIcon} size="xl" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text bold alignSelf="flex-start">
                Please Enter the Review
              </Text>
              <Input
                style={{ marginTop: 10 }}
                borderRadius={10}
                minHeight={45}
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Please enter review"
                  onChangeText={(c) => setReview(c)}
                />
              </Input>
              <Button
                marginVertical={"5%"}
                borderRadius={20}
                width={"60%"}
                size="sm"
                bgColor="#004643"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => SubmitReview(currentData)}
              >
                <ButtonText>Submit </ButtonText>
              </Button>
            </View>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <View
        style={{
          height: "10%",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // width: "20%",
            // alignItems: "center",
            // justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              alignContent: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Icon as={ChevronLeft} size="xl" />
            </Pressable>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>My Orders</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <View style={{ height: "5%" }}></View>
      <View style={{ height: "85%" }}>
        <FlatList
          data={dataset?.products
            ?.filter((c) => c?.email === userData?.email)
            ?.map((x) => {
              console.log("->"+ x?.review);
              return x;
            })}
          style={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <Pressable flex={1}>
              <Box bg="#F0F4EF" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row" }}>
                  {/* <View style={{ width: "20%" }}>
                    <Image
                      style={{ aspectRatio: 4, resizeMode: "contain" }}
                      source={{
                        uri: `data:image/png;base64,${item?.data?.image}`,
                      }}
                      alt={"---"}
                    />
                  </View> */}
                  <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                    <View style={{ width: "80%" }}>
                      <Text color="#000" bold>
                        Product Name : {item?.name}
                      </Text>
                      <Text color="#000" bold>
                        Quantity: {item?.quantity}
                      </Text>
                      <Text>Rs {parseFloat(item?.price) * item?.quantity}</Text>
                      <Text>
                        Date of Order : {item?.added_date?.substring(0, 10)}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Order Status : </Text>
                        <Text
                          bold
                          color={
                            item?.status === "complete" ? "$green600" : "black"
                          }
                        >
                          {item?.status}
                        </Text>
                      </View>
                      {
                        item?.review?.length > 0  ? <Text>Review : {item?.review[0]?.comment}</Text> : <></>
                      }
                    </View>

                    <View style={{ width: "20%", alignItems: "center" }}>
                      {item?.status === "complete" &&  item?.review?.length <1 ?  ( 
                        <Pressable
                          style={{ alignItems: "center" }}
                          onPress={() => (
                            setCurrentData(item), setShowModal(true)
                          )}
                        >
                          <Icon color={"silver"} as={Edit} size="xl" />
                          <Text
                            fontSize={"$sm"}
                            style={{
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            write review
                          </Text>
                        </Pressable>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </View>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
