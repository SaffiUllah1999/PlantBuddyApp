import { StyleSheet, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { ChevronRightIcon, Icon, Text } from "@gluestack-ui/themed";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { ChevronsRightIcon } from "@gluestack-ui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export default function Tutorial() {
  const navigation = useNavigation();

  const storeData = async () => {
   
    try {
        console.log("true")
      await AsyncStorage.setItem("Tutorial", "true");
    } catch (error) {
      // Error saving data
      console.log("error")
    }
  };

  return (
    <Animated.View entering={SlideInLeft.duration(1000)}>
      <View style={{ height: "100%" }}>
        <ImageBackground
          source={require("./../assets/tuttorial.png")}
          resizeMode="stretch"
          alt="ImageBackground"
          style={{ height: "100%" }}
        >
          <View
            style={{
              marginTop: "30%",
              marginLeft: 15,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text size="5xl" color={"014738"}>
                Welcome
              </Text>
              <Text size={"xl"} color={"014738"} marginLeft={10}>
                Let's Start
              </Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Pressable
                onPress={() => (storeData(), navigation.navigate("Home"))}
              >
                <Icon as={ChevronRightIcon} size="xl" />
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
