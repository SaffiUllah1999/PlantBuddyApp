import { StyleSheet, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { Text } from "@gluestack-ui/themed";
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  BounceOutLeft,
  BounceOutRight,
  FadeIn,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutUp,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

export default function Tutorial() {
  return (
    <Animated.View entering={SlideInLeft.duration(1000)}>
      <View style={{ height: "100%" }}>
        <ImageBackground
          source={require("./../assets/tuttorial.png")}
          resizeMode="stretch"
          style={{ height: "100%" }}
        >
          <View style={{ marginTop: "30%", marginLeft: 15 ,borderWidth:1,flexDirection:"row"}}>
            <View>
            <Text size="5xl" color={"014738"}>Welcome</Text>
            <Text size={"xl"} color={"014738"} marginLeft={10}>Let's Start</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
