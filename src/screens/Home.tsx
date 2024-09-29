import { View, FlatList, Alert,BackHandler } from "react-native";
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
import { MapPin, Heart, Plus, ShoppingCart } from "lucide-react-native";
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

export default function Home() {
  const { userData, setUserData } = useData();
  const commonDataService = new CommonDataService();
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [dataset, setDataset] = useState({
    products: [],
    favourites: [],
    modal: false,
    item_selected: {},
    quantity: 0,
  });
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  const ref = React.useRef(null);

  const Get_Products = () => {
    // console.log("entered");
    // let dataset = {
    //   email: c?.email,
    //   password: c?.password,
    // };

    commonDataService
      .fetchData(SERVICE_ROUTE.GET_PRODUCTS)
      .then((res) => {
        setDataset((c) => ({ ...c, products: res?.data }));
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Add_To_Cart = (c, quantity) => {
    console.log("entered");
    let dataset = {
      _id: c?._id,
      email: userData?.email,
      quantity: quantity,
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.ADD_TO_CART, dataset)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));
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

  const Add_To_Fav = (c) => {
    console.log("entered");
    let data_set = {
      _id: c,
      email: userData?.email,
    };

    console.log(JSON.stringify(data_set));

    commonDataService
      .executeApiCall(SERVICE_ROUTE.ADD_FAV, data_set)
      .then((res) => {
        // setShowModal(true)
        Get_Fav();
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

  const Get_Fav = () => {
    let dataset = {
      email: userData?.email,
    };

    commonDataService
      .fetchData_3(SERVICE_ROUTE.GET_FAV, dataset)
      .then((res) => {
        setDataset((c) => ({ ...c, favourites: res?.data }));
        Get_Products();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Del_Fav = (c) => {
    // console.log("entered");
    let dataset = {
      _id: c,
      email: userData?.email,
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.DEL_FAV, dataset)
      .then((res) => {
        setDataset((c) => ({ ...c, favourites: res?.data }));
        Get_Fav();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    Get_Fav();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Alert", "are you sure to logout?", [
          {text:'cancel', onPress: () => console.log('')},
          {
            text: 'logout',
            onPress: () => (
          
              navigation.reset({index: 0, routes: [{name: 'login'}]})
            ),
          },
        ]);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );


  return loading ? (
    <Loading />
  ) : (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
      <Modal
        isOpen={dataset?.modal}
        onClose={() => {
          setDataset((c) => ({ ...c, modal: false }));
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Add to cart</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Quantity</Text>
            <Input>
              <InputField placeholder="Enter Text here" onChangeText={(x)=> setDataset(c=>({...c, quantity: parseFloat(x)}))}/>
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                Add_To_Cart(dataset?.item_selected, dataset?.quantity);
                setDataset((c) => ({ ...c, modal: false }));
              }}
            >
              <ButtonText>Submit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <View
        style={{
          height: "15%",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ flexDirection: "row", width: "80%", alignItems: "center" }}
          >
            <View style={{ marginLeft: 10 }}>
              <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                <AvatarFallbackText>Avatar</AvatarFallbackText>
              </Avatar>
            </View>
            <View style={{ paddingHorizontal: 10, justifyContent: "flex-end" }}>
              <Text>Welcome</Text>
              <Text bold>{userData?.name}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Pressable onPress={() => navigation.navigate("Cart")}>
              <Icon as={ShoppingCart} size="xl" />
            </Pressable>
            <Pressable onPress={() => navigation.openDrawer()}>
              <Icon as={MenuIcon} size="xl" />
            </Pressable>
          </View>
        </View>
      </View>

      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{
          marginVertical: "5%",
          marginHorizontal: "3%",
          borderRadius: 15,
        }}
      >
        <InputField placeholder="Enter Text here" />
      </Input>

      <Text bold style={{ marginHorizontal: "3%" }} size="xl" color="#000">
        Category
      </Text>
      <View style={{ height: "6%", marginVertical: 20 }}>
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
            borderWidth={1}
            borderColor={"#D0D5DD"}
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="#D0D5DD" paddingHorizontal={20}>
              Indoor
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
              Outdoor
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
              Favourite
            </Text>
          </Box>
        </ScrollView>
      </View>
      <View style={{ height: "60%" }}>
        <FlatList
          data={dataset?.products}
          numColumns={2}
          style={{ paddingHorizontal: 10 }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("Details", { data: item })}
              flex={1}
            >
              <Box bg="#F0F4EF" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "80%" }}></View>
                  <View style={{ width: "20%" }}>
                    <Pressable
                      onPress={() =>
                        dataset?.favourites.length > 0
                          ? dataset?.favourites?.find((c) =>
                              c?.data?._id === item?._id
                                ? Del_Fav(c?._id?.toString())
                                : Add_To_Fav(item?._id?.toString())
                            )
                          : Add_To_Fav(item?._id?.toString())
                      }
                    >
                      <Icon
                        fill={
                          dataset?.favourites?.length > 0
                            ? dataset?.favourites?.find(
                                (c) => c?.data?._id === item?._id
                              )
                              ? "#D22B2B"
                              : "#fff"
                            : "#fff"
                        }
                        color={
                          dataset?.favourites?.length > 0
                            ? dataset?.favourites?.find(
                                (c) => c?.data?._id === item?._id
                              )
                              ? "#D22B2B"
                              : "#000"
                            : "#000"
                        }
                        as={Heart}
                        size="xl"
                      />
                    </Pressable>
                  </View>
                </View>
                <Image
                  style={{
                    marginVertical: 10,
                    width: "100%",
                    height: undefined,
                    aspectRatio: 2,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                  alt={"---"}
                />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "80%" }}>
                    <Text color="#000" bold>
                      {item?.name}
                    </Text>
                    {/* <Text>Name</Text> */}
                    <Text>Rs{item?.price}</Text>
                  </View>
                  <View style={{ width: "0%" }}>
                    <Pressable
                      onPress={() =>
                        setDataset((c) => ({
                          ...c,
                          modal: true,
                          item_selected: item,
                        }))
                      }
                    >
                      <Icon fill={"#000"} as={Plus} size="xl" />
                    </Pressable>
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
