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
} from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

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

const FirstRoute = () => (
  <FlatList
    contentContainerStyle={{ flexGrow: 1 }}
    data={DATA}
    numColumns={3}
    // refreshControl={
    //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    // }
    renderItem={({ item }) => (
      <Pressable flex={0.5}>
        <Box bg="#F0F4EF" p="$5" margin={5} borderRadius={13}>
          <Image
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
            source={require("../assets/images/image.png")}
            alt={"---"}
          />
        </Box>
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

export default function Profile() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <View
        style={{
          height: "100%",
        }}
      >
        <View style={{ height: "30%" }}>
          <ImageBackground
            source={require("./../assets/images/profileCover.png")}
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
                <View style={{ width: "90%", paddingVertical: 20 }}>
                  <Text color={"#fff"}>Profile</Text>
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
                <Text bold color={"white"}>
                  Ali
                </Text>
                {/* <Button bg={"white"}>
                  <ButtonText color={"black"}>Edit Profile</ButtonText>
                </Button> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                height: "10%",
                justifyContent: "space-evenly",
                borderWidth: 1,
                backgroundColor: "#000",
              }}
            >
              <View>
                <Text color={"white"}>posts</Text>
              </View>
              <View>
                <Text color={"white"}>followers</Text>
              </View>
              <View>
                <Text color={"white"}>following</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: "10%",
                justifyContent: "space-evenly",
                backgroundColor: "rbga(0,0,0,1)",
              }}
            >
              <View>
                <Text color={"white"}>1</Text>
              </View>
              <View>
                <Text color={"white"}>50</Text>
              </View>
              <View>
                <Text color={"white"}>100</Text>
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
