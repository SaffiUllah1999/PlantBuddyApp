import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "@gluestack-ui/themed";
import { Icon, CalendarDaysIcon } from "@gluestack-ui/themed";
import {
  ChevronLeftIcon,
  CircleMinus,
  CirclePlus,
  Droplet,
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

export default function Browse({ route }) {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [current, setCurrent] = useState(1);
  const { userData, setUserData } = useData();
  const [loading, setloading] = useState(true);

  const [dataset, setDataset] = useState();

  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState("");

  const commonDataService = new CommonDataService();

  useEffect(() => {
    Get_Feed();
  }, []);

  const Get_Feed = () => {
   
    let dataset = {
      email: userData?.email,
    };

    console.log(dataset);
    commonDataService
      .fetchData_3(SERVICE_ROUTE.GET_FEED,dataset)
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
      <View style={{ flexDirection: "row", height: "80%" }}>
        <FlatList
          data={dataset}
          style={{ paddingHorizontal: 10 }}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <Pressable flex={1}>
              <View style={{ width: "100%", margin:5, alignItems: "flex-start" }}>
                <Avatar bgColor="$amber600" size="sm" borderRadius="$full">
                  <AvatarFallbackText>Avatar</AvatarFallbackText>
                </Avatar>
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
              <Pressable onPress={() => pickImage()}>
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
