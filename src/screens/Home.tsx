import { View, FlatList } from "react-native";
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
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MapPin, Heart, Plus, ShoppingCart } from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { Image } from "@gluestack-ui/themed";

export default function Home() {
  const navigation = useNavigation();

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

  return (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
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
              <Text bold>Ali</Text>
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
            <Icon as={ShoppingCart} size="xl" />
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
            <Text color="#D0D5DD"> is the Box</Text>
          </Box>
          <Box
            bg="#fff"
            borderWidth={1}
            borderColor={"#D0D5DD"}
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="#D0D5DD">This is the </Text>
          </Box>
        </ScrollView>
      </View>
      <View style={{ height: "60%" }}>
        <FlatList
          data={DATA}
          numColumns={2}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <Pressable onPress={()=> navigation.navigate("Details")} flex={1}>
              <Box bg="#F0F4EF" p="$5"  margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "80%" }}>
                   
                  </View>
                  <View style={{ width: "20%" }}>
                    <Icon fill={"#000"} as={Heart} size="xl" />
                  </View>
                </View>
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
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "80%" }}>
                  <Text color="#000" bold>Alo</Text>
                    <Text>Name</Text>
                    <Text>Rs 249</Text>
                  </View>
                  <View style={{ width: "0%" }}>
                    <Icon fill={"#000"} as={Plus} size="xl" />
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
