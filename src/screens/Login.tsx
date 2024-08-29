import { StyleSheet, View } from "react-native";
import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  Image,
  Input,
  InputField,
  Pressable,
} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [ dataset,setDataset]=useState({ tutorial:""})

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Tutorial');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setDataset(c=>({...c, tutorial: JSON.parse(value) }))
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveData()
    }, [])
  );
  
  return (
    <View>
      <View style={{ alignItems: "center", marginHorizontal: "4%" }}>
        <Image
          size="xl"
          source={require("../assets/logo.png")}
          alt="logo"
          style={{ marginTop: "15%" }}
        />

        <Text size={"xl"} style={{ color: "#004643" }}>
          Sign in to your account
        </Text>
        <View style={{ alignItems: "flex-start", marginTop: 10, width: "96%" }}>
          <Text style={{ marginVertical: "4%" }}>Email Address</Text>
          <Input
            borderRadius={10}
            minHeight={45}
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField placeholder="Enter your email address" />
          </Input>

          <Text style={{ marginVertical: "4%" }}>Password</Text>

          <Input
            borderRadius={10}
            variant="outline"
            size="md"
            minHeight={45}
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField placeholder="Enter your password" />
          </Input>

          <Text
            style={{ marginVertical: "4%", width: "100%" }}
            textAlign="right"
          >
            Forgot Password ?
          </Text>

          <Checkbox
            size="md"
            isInvalid={false}
            isDisabled={false}
            value="true"
            style={{ marginVertical: "7%" }}
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>
              I’ve read and agreed to User Agreement and Privacy Policy
            </CheckboxLabel>
          </Checkbox>

          <Button
            marginVertical={"5%"}
            borderRadius={20}
            width={"100%"}
            size="xl"
            bgColor="#004643"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={()=> dataset?.tutorial?.toString()==="true" ? navigation.navigate("Home"): navigation.navigate("Tutorial")}
          >
            <ButtonText>Sign In </ButtonText>
          </Button>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Don't have a account ? </Text>
            <Pressable onPress={() =>  navigation.navigate("Register")}>
              <Text bold>Create One</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
