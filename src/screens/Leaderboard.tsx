import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallbackText,
  Icon,
  Text,
  Pressable,
  Box,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "lucide-react-native";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";


export default function Leaderboard() {
  const commonDataService = new CommonDataService();
  const [dataset, setDataset] = useState({ data: [], loading: true });

  const Get_Fav = () => {
    commonDataService
      .fetchData(SERVICE_ROUTE.GET_LEADERBOARD_DATA)
      .then((res) => {
        // Sort data by score in ascending order
        // const sortedData = res?.data.sort((a, b) => a.score - b.score);
        setDataset({ data: res?.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
        setDataset({ data: [], loading: false });
      });
  };


  useFocusEffect(
    React.useCallback(() => {
      Get_Fav();
    }, [])
  );

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4EF" }}>
      <View style={{ flexDirection: "row", height: "10%" }}>
        <View style={{ width: "40%" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={ChevronLeftIcon} size="xl" />
          </Pressable>
        </View>
        <View style={{ width: "30%" }}>
          <Text bold>Leaderboard</Text>
        </View>
        <View style={{ width: "30%" }}></View>
      </View>
      
      <View style={{ height: "30%", flexDirection: "row" }}>
        {dataset.data.slice(0, 3).map((user, index) => (
          <View
            key={user.id} // Ensure this key is unique
            style={{
              width: index === 1 ? "40%" : "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{index + 1}</Text>
            <Avatar 
              bgColor="$amber600" 
              size={index === 1 ? "2xl" : "xl"} 
              borderRadius="$full" 
              source={{ uri: user.avatar }} // Use base64 image
            >
              <AvatarFallbackText>{user.name || "Avatar"}</AvatarFallbackText>
            </Avatar>
            <Text>{user.name || "Hello"}</Text>
            <Text>{"Score : "+user.Score || "000"}</Text>
          </View>
        ))}
      </View>
      
      <View style={{ height: "60%" }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={dataset.data.slice(3)} // Exclude top 3 users
          renderItem={({ item }) => (
            <Pressable flex={1}>
              <Box bg="#fff" p="$5" margin={5} borderRadius={13}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar 
                    bgColor="$amber600" 
                    size="sm" 
                    borderRadius="$full" 
                    source={{ uri: item?.avatar }} // Use base64 image
                  >
                    <AvatarFallbackText>{item.name || "Avatar"}</AvatarFallbackText>
                  </Avatar>
                  <Text paddingHorizontal={10}>{item.name || "Hee"}</Text>
                  <Text paddingHorizontal={10}>{item.Score || "00"}</Text>
                </View>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
