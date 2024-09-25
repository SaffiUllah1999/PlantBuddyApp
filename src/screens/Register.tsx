import { Alert, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ModalContent,
} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";
import { Formik } from "formik";
import * as yup from "yup";
import { Modal } from "@gluestack-ui/themed";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";
import { ModalBody } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import AnimatedLottieView from "lottie-react-native";

export default function Register() {
  const navigation = useNavigation();
  const commonDataService = new CommonDataService();
  const [showModal, setShowModal] = useState(false);

  const validationSchema = () => {
    {
      return yup.object().shape({
        email: yup.string().email("Invalid Email").required("email required"),
        password: yup.string().required("Phone Number required"),
        confirm_Password: yup.string().required(),
      });
    }
  };
  const handleFormSubmit = (values) => {
    Register_Call(values);
  };

  const Register_Call = (c) => {
    console.log("entered");
    let dataset = {
      email: c?.email,
      password: c?.password,
      Score: 0,
    };

    commonDataService
      .executeApiCall(SERVICE_ROUTE.REGISTER, dataset)
      .then((res) => {
        console.log("Resend :" + JSON.stringify(res));
        setShowModal(true);
      })
      .catch(function (error) {
        if (error) {
          console.log(JSON.stringify(error.response?.data));
          Alert.alert(
            "Error", // Title of the alert
            error?.response?.data?.message, // Message of the alert
            [{ text: "OK" }] // Buttons array, with an OK button
          );
        }
      });
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
          Create new account
        </Text>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: "",
            password: "",
            confirm_Password: "",
            checked: false,
          }}
          validationSchema={validationSchema}
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
              <Modal
                isOpen={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
              >
                <ModalBackdrop />
                <ModalContent>
                  <ModalHeader>
                    <ModalCloseButton
                      onPress={() => navigation.navigate("login")}
                    >
                      <Icon as={CloseIcon} size="xl" />
                    </ModalCloseButton>
                  </ModalHeader>
                  <ModalBody>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <AnimatedLottieView
                        speed={1}
                        duration={5000}
                        autoPlay
                        loop={true}
                        // ref={animation}
                        style={{ width: 250, height: 250 }}
                        resizeMode="cover"
                        source={require("../assets/animation/Success.json")}
                      />
                      <Text bold alignSelf="center">
                        Account Created Successfully
                      </Text>
                    </View>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
              <Text style={{ marginVertical: "4%" }}>Enter Email Address</Text>
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
                <Text color={"$red400"}>Please Enter Password</Text>
              )}

              <Text style={{ marginVertical: "4%" }}>Confirm Password</Text>

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
                  onChangeText={handleChange("confirm_Password")}
                />
              </Input>

              {touched.password && errors.password && (
                <Text color={"$red400"}>Please Enter Password</Text>
              )}

              <Checkbox
                size="md"
                isInvalid={false}
                isDisabled={false}
                value="true"
                style={{ marginVertical: "7%" }}
                onChange={(c) => setFieldValue("checked", c)}
              >
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon
                    as={CheckIcon}
                    color="$white"
                    bgColor="$green800"
                    borderColor="$green800"
                    $active-borderColor="$green800"
                  />
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
                onPress={() =>
                  values.checked
                    ? values?.password === values?.confirm_Password
                      ? handleSubmit()
                      : Alert.alert(
                          "Error",
                          "Password & confirm password must be same!",
                          [
                            {
                              text: "OK",
                              onPress: () => console.log("OK Pressed"),
                            },
                          ]
                        )
                    : Alert.alert(
                        "Error",
                        "Please accept terms & conditions !",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      )
                }
              >
                <ButtonText>Sign Up</ButtonText>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
