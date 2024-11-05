import { View, FlatList, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
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
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react-native";
import { Input } from "@gluestack-ui/themed";
import { InputField } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";
import Loading from "../components/Loading";

export default function Articles() {
  const commonDataService = new CommonDataService();
  const navigation = useNavigation();
  const [dataset, setDataset] = useState({ products: [], articles: [], loading:false });

  const Get_Fav = () => {
    // console.log("entered");
    // let dataset = {
    //   email: c?.email,
    //   password: c?.password,
    // };

    commonDataService
      .fetchData(SERVICE_ROUTE.GET_ARTICLES)
      .then((res) => {
        console.log("res")
        setDataset((c) => ({ ...c, articles: res?.data, loading:false }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setDataset(c=>({...c, loading:true}))
    Get_Fav();
  }, []);

  return  dataset.loading ? <Loading/> : (
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
          <Text bold>Articles</Text>
        </View>
        <View style={{ width: "35%" }}></View>
      </View>

      <Text bold style={{ marginHorizontal: "3%" }} size="xl" color="#000">
        Category
      </Text>

      <View style={{ height: "5%", marginVertical: 20 }}>
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
            borderColor={"#D0D5DD"}
            borderRadius={50}
            marginHorizontal={10}
          >
            <Text color="#D0D5DD" paddingHorizontal={20}>
              New
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
              Eco
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
              Tree
            </Text>
          </Box>
        </ScrollView>
      </View>

      <Text paddingVertical={20} paddingHorizontal={20}>Trending</Text>

      <View
        style={{
          height: "100%",
          marginVertical: 20,
          justifyContent:"center",
          alignContent:'center',
          alignItems:'center'
          
        }}
      >
  
        <FlatList
          data={dataset?.articles}
          style={{ paddingHorizontal: 10 , }}
  
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <>
              <Pressable style={{ width: "100%", paddingHorizontal: 10 }} onPress={()=> navigation.navigate("ArticleDetail",{
                data: item
              })}>
                <Image
                  style={{
                    backgroundColor: "yellow",
                    width: "100%",
                    height: undefined,
                    aspectRatio: 2,
                    borderRadius: 15,
                    resizeMode: "stretch",
                  }}
                  source={{ uri: item?.image }}
                  alt={"---"}
                />
                <View>
                  <Text bold size={"lg"}>
                    {item?.title}
                  </Text>
                  <View style={{ width: "100%" , alignItems:"flex-end"}}>
                    <Icon as={ChevronRightIcon} size="xl" />
                  </View>
                </View>
              </Pressable>
            </>
          )}
        />
      </View>

      <View style={{ height: "30%", marginVertical: 20 }}></View>
    </SafeAreaView>
  );
}
