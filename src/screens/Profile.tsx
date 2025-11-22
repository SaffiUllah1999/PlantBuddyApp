import { View, FlatList, useWindowDimensions } from "react-native";
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
  Image,
} from "@gluestack-ui/themed";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  MapPin,
  Heart,
  Plus,
  ShoppingCart,
  Grid2X2,
  UserSquare,
  ChevronLeft,
} from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { SERVICE_ROUTE } from "../services/endpoints";
import CommonDataService from "../services/common_data";
import { useData } from "../hooks/useData";

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
];

export default function Profile() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [current, setCurrent] = useState(1);
  const { userData, setUserData } = useData();
  const [loading, setloading] = useState(true);
  const [dataset, setDataset] = useState();
  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState("");

  const commonDataService = new CommonDataService();

  const FirstRoute = () => (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={dataset}
      numColumns={3}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      renderItem={({ item }) => (
        <Pressable style={{ flex: 1 / 3 }}>
          <Image
            style={{
              marginVertical: 10,
              marginHorizontal: 5,
              width: 120,
              height: 120,
              aspectRatio: 1,
              resizeMode: "cover",
            }}
            source={{ uri: item?.image }}
            alt={"---"}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  useFocusEffect(
    React.useCallback(() => {
      Get_Feed();
    }, [])
  );

  const Get_Feed = () => {
    let dataset = {
      email: userData?.email,
    };

    console.log(dataset);
    commonDataService
      .fetchData_3(SERVICE_ROUTE.GET_PERSONAL_PICTURES, dataset)
      .then((res) => {
        setDataset(res?.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setloading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <View
        style={{
          height: "100%",
        }}
      >
        <View style={{ height: "30%" }}>
          <ImageBackground
            source={require("./../assets/green_Pattern.jpg")}
            resizeMode="stretch"
            alt="ImageBackground"
            style={{ height: "100%" }}
          >
            <View style={{ flexDirection: "row", height: "30%" }}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                 <View style={{ width: "5%", paddingVertical: 20 }}>
                 <Icon
                    borderColor="#000"
                    fill={"#000"}
                    as={ChevronLeft}
                    size="md"
                  />
                 </View>
                <View style={{ width: "90%", paddingVertical: 20 }}>
                 
                  <Text color={"#000"} bold>
                    Profile
                  </Text>
                </View>
                <View style={{ width: "10%" }}></View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                height: "50%",
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Avatar</AvatarFallbackText>
                </Avatar>
              </View>
              <View
                style={{ paddingHorizontal: 10, justifyContent: "flex-end" }}
              >
                <Text bold color={"black"}>
                  {userData?.name}
                </Text>
                {/* <Button bg={"white"}>
                  <ButtonText color={"black"}>Edit Profile</ButtonText>
                </Button> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                height: "11%",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "#008000",
              }}
            >
              <View>
                <Text color={"white"} bold>
                  posts
                </Text>
              </View>
              <View>
                <Text color={"white"} bold>
                  followers
                </Text>
              </View>
              <View>
                <Text color={"white"} bold>
                  following
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: "8%",
                justifyContent: "space-evenly",
                backgroundColor: "rbga(0,0,0,1)",
              }}
            >
              <View>
                <Text color={"black"}>1</Text>
              </View>
              <View>
                <Text color={"black"}>50</Text>
              </View>
              <View>
                <Text color={"black"}>100</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
              indicatorStyle={{
                backgroundColor: "#000",
              }}
              {...props}
              renderLabel={({ route, color, focused }) =>
                route.key === "first" ? (
                  <Icon color={"#000"} as={UserSquare} size="xl" />
                ) : (
                  <Icon color={"#000"} as={Grid2X2} size="xl" />
                )
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
