import { View } from "react-native";
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
import { MapPin } from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={{ height: "100%" }}>
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
            <Icon as={CalendarDaysIcon} size="xl" />
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
        <ScrollView horizontal={true}>
          <Box
            bg="$primary500"
            justifyContent="center"
            borderRadius={40}
            marginHorizontal={10}
          >
            <Text color="white" paddingHorizontal={20}>All</Text>
          </Box>
          <Box
            bg="$primary500"
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}

          >
            <Text color="white" paddingHorizontal={20}>Indoor</Text>
          </Box>
          <Box
            bg="$primary500"
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="white" paddingHorizontal={20}>Outdoor</Text>
          </Box>
          <Box
            bg="$primary500"
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="white"> is the Box</Text>
          </Box>
          <Box
            bg="$primary500"
            justifyContent="center"
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="white">This is the </Text>
          </Box>
        </ScrollView>
      </View>
      <View style={{ height: "60%", borderWidth:2 }}>
       
      </View>
    </View>
  );
}
