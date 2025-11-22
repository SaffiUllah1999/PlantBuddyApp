import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, Image, InputField, ModalBody } from "@gluestack-ui/themed";
import { Icon, CalendarDaysIcon } from "@gluestack-ui/themed";
import {
  ChevronLeftIcon,
  CircleMinus,
  CirclePlus,
  Droplet,
  Heading,
  Heart,
  Navigation,
  Plus,
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
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import Loading from "../components/Loading";
import { FlatList } from "react-native";
import { Avatar } from "@gluestack-ui/themed";
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Actionsheet } from "@gluestack-ui/themed";
import { ActionsheetBackdrop } from "@gluestack-ui/themed";
import { ActionsheetItemText } from "@gluestack-ui/themed";
import { Modal } from "@gluestack-ui/themed";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import { Input } from "@gluestack-ui/themed";

export default function Browse({ route }) {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [current, setCurrent] = useState(1);
  const { userData, setUserData } = useData();
  const [loading, setloading] = useState(true);
  const [showActionsheet, setshowActionsheet] = useState(false)
  const [postData, setPostData] = useState('')

  const [dataset, setDataset] = useState();
  const [showModal, setShowModal] = useState(false)

  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState("");

  const commonDataService = new CommonDataService();

  useEffect(() => {
    Get_Feed();
  }, []);

  //imageId, userEmail

  const handle_Like = (c, image) => {
    console.log(image);
    let dataset = {
      userEmail: c?.email,
      imageId: image,
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.LIKE, dataset)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));
        Get_Feed();
        // setUserData((c) => ({ ...c, email: dataset?.email }));
        // setloading(false);
      })
      .catch(function (error) {
        if (error) {
          console.log(error)
          setloading(false);
          // console.log(JSON.stringify(error?.response?.data));
          // Alert.alert(
          //   "Error", // Title of the alert
          //   error?.response?.data, // Message of the alert
          //   [{ text: "OK" }] // Buttons array, with an OK button
          // );
        }
      });
  };
  //email, name, text 
  const handleContinuePost = (c) => {
    console.log(image);
    let dataset = {
      email: c?.email,
      name: c?.name,
      text: postData
    };

    setloading(true)

    commonDataService
      .executeApiCall(SERVICE_ROUTE.POSTTEXT, dataset)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));

        setShowModal(false)
        Alert.alert(
          "Alert", // Title of the alert
          res?.data?.message, // Message of the alert
          [{ text: "OK" }] // Buttons array, with an OK button
        );
        setloading(false)
        Get_Feed();
        // setUserData((c) => ({ ...c, email: dataset?.email }));
        // setloading(false);
      })
      .catch(function (error) {
        if (error) {
          console.log(error)
          setloading(false);
          // console.log(JSON.stringify(error?.response?.data));
          // Alert.alert(
          //   "Error", // Title of the alert
          //   error?.response?.data, // Message of the alert
          //   [{ text: "OK" }] // Buttons array, with an OK button
          // );
        }
      });
  };


  const handleCLose = () => {
    setshowActionsheet(false)
  }

  const Get_Feed = () => {

    let dataset = {
      email: userData?.email,
    };

    console.log(dataset);
    commonDataService
      .fetchData_3(SERVICE_ROUTE.GET_FEED, dataset)
      .then((res) => {
        setDataset(res?.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setloading(false);
      });
  };

  const handle_Upload = (c, image) => {
    console.log("entered");
    let dataset = {
      email: c?.email,
      name: c?.name,
      image: image,
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPLOAD_PICTURES, dataset)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));
        setUserData((c) => ({ ...c, email: dataset?.email }));
        setloading(false);
      })
      .catch(function (error) {
        if (error) {
          setloading(false);
          console.log(JSON.stringify(error.response?.data));
          Alert.alert(
            "Error", // Title of the alert
            error.response?.data, // Message of the alert
            [{ text: "OK" }] // Buttons array, with an OK button
          );
        }
      });
  };

  const pickImage = async () => {
    // Request permission to access media library
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Convert image to Base64
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        handle_Upload(userData, reader.result);
        setBase64String(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text>Post</Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Enter The Details to share</Text>
            <Input
              borderRadius={10}
              minHeight={45}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                placeholder="Enter Data to share"
                onChangeText={(c) => setPostData(c)}
              />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              marginVertical={"5%"}
              borderRadius={20}
              width={"100%"}
              size="xl"
              bgColor="#004643"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() =>
                postData
                  ? handleContinuePost(userData)
                  : Alert.alert(
                    "Error",
                    "Please enter the data first",
                    [
                      {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                      },
                    ]
                  )
              }
            >
              <ButtonText>Upload</ButtonText>
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>

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
          <Text bold>Feed </Text>
        </View>
      </View>
      <Actionsheet isOpen={showActionsheet} onClose={handleCLose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={() => (setshowActionsheet(false), pickImage())}>
            <ActionsheetItemText>Upload Image</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => (setshowActionsheet(false), setShowModal(true))}>
            <ActionsheetItemText>Upload text</ActionsheetItemText>
          </ActionsheetItem>

        </ActionsheetContent>
      </Actionsheet>
      <View style={{ flexDirection: "row", height: "80%" }}>
        <FlatList
          data={dataset}
          style={{ paddingHorizontal: 10 }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <Pressable flex={1}>
              <View style={{ width: "100%", margin: 5, alignItems: "flex-start", flexDirection: "row" }}>
                <Avatar bgColor="$amber600" size="sm" borderRadius="$full">
                  <AvatarFallbackText>Avatar</AvatarFallbackText>
                </Avatar>
                <Text style={{ marginLeft: 10 }}>{item?.name}</Text>
              </View>
              <Box bg="#fff" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row" }}></View>
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
                  <Pressable onPress={() => handle_Like(userData, item?._id)} style={{ flexDirection: "row" }}>
                    <Ionicons
                      name={item?.likes.includes(userData?.email) ? "heart" : "heart-outline"}
                      size={25}
                      color={item?.likes.includes(userData.email) ? "red" : "#000"}
                    />
                    <Text>{item?.likesCount}</Text>
                  </Pressable>
                  <Ionicons name="chatbubble-ellipses-outline" size={25} color={"#000"} style={{ marginLeft: 10 }} />
                </View>

              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ flexDirection: "row", height: "10%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 10 }}
          >
            <View
              style={{
                backgroundColor: "#0ACF83",
                padding: 10,
                borderRadius: 500,
              }}
            >
              <Pressable onPress={() => setshowActionsheet(true)}>
                <Icon as={Plus} size="xl" color="#fff" />
              </Pressable>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
