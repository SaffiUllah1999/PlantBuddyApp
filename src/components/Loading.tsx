import { View, Text, Image } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        height:"100%",
        width:"100%",
        bottom: 0,
        justifyContent: "center",
        alignItems:"center",
        right: 0,
        left: 0,
        backgroundColor: "rgba(52, 52, 52, 0.2)",
      }}
    >
      <AnimatedLottieView
        speed={1}
        autoPlay
        loop={true}
        // ref={animation}
        style={{ width: 100, height: 100 }}
        resizeMode="cover"
        source={require("../assets/Loading.json")}
      />
    </View>
  );
};

export default Loading;
