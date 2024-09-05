import {Alert, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
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
import * as yup from "yup";
import { Text } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

export default function Login() {
  const navigation = useNavigation();
  const [dataset, setDataset] = useState({ tutorial: "" });

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Tutorial");
      if (value !== null) {
        // We have data!!
        console.log(value);
        setDataset((c) => ({ ...c, tutorial: JSON.parse(value) }));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [])
  );

  const validationSchema = () => {
    {
      return yup.object().shape({
        email: yup.string().email("Invalid Email").required("email required"),
        password: yup.string().required("Phone Number required"),
      });
    }
  };
  const handleFormSubmit = (values) => {
    dataset?.tutorial?.toString() === "true"
      ? navigation.navigate("Home")
      : navigation.navigate("Tutorial");
    // Register_Call(values);
  };

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
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: "",
            password: "",
            checked: false,
          }}
          // validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View
              style={{ alignItems: "flex-start", marginTop: 10, width: "96%" }}
            >
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
                <InputField
                  placeholder="Enter your email address"
                 
                  onChangeText={handleChange("email")}
                />
              </Input>

              {touched.email && errors.email && (
                <Text color={"$red400"}>Please valid email address</Text>
              )}

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
                <InputField
                  placeholder="Enter your password"
                   type="password"
                  onChangeText={handleChange("password")}
                />
              </Input>

              {touched.password && errors.password && (
                <Text color={"$red400"}>Please enter password</Text>
              )}

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
                onChange={(c) => setFieldValue("checked", c)}
              >
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon}   color="$white"
                    bgColor="$green800"
                    borderColor="$green800"
                    $active-borderColor="$green800"/>
                </CheckboxIndicator>
                <CheckboxLabel style={{ marginHorizontal: "5%" }}>
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
                onPress={() =>   values.checked
                  ? handleSubmit() :  Alert.alert(
                    "Error",
                    "Please accept terms & conditions !",
                    [
                      {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                      },
                    ]
                  )}
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
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text bold>Create One</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
