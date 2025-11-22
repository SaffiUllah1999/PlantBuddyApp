import { Alert, ImageBackground, StyleSheet, View } from "react-native";
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
import CommonDataService from "../services/common_data";
import { SERVICE_ROUTE } from "../services/endpoints";
import { useData } from "../hooks/useData";
import Loading from "../components/Loading";

export default function WelcomeScreen() {
    const { setUserData } = useData();
    const navigation = useNavigation();
    const [dataset, setDataset] = useState({ tutorial: "" });
    const commonDataService = new CommonDataService();
    const [loading, setloading] = useState(false)

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

    const handle_Login = (c) => {
        console.log("entered");
        let data_set = {
            email: c?.email,
            password: c?.password,
        };

        commonDataService
            .executeApiCall(SERVICE_ROUTE.LOGIN, data_set)
            .then((res) => {
                console.log("Resend :" + JSON.stringify(res));
                setUserData((c) => ({ ...c, email: data_set?.email, name: res?.data?.name }));
                setloading(false)
                dataset?.tutorial
                    ? navigation.navigate("Home")
                    : navigation.navigate("Tutorial");
            })
            .catch(function (error) {
                if (error) {
                    setloading(false)
                    console.log(JSON.stringify(error.response?.data));
                    Alert.alert(
                        "Error", // Title of the alert
                        error.response?.data, // Message of the alert
                        [{ text: "OK" }] // Buttons array, with an OK button
                    );
                }
            });
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
        setloading(true)
        handle_Login(values);

        // Register_Call(values);
    };

    return loading ? <Loading /> : (
        <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={{height:"100%"}}>
            <View style={{ alignItems: "center", }}>
                <Text size={"xl"} style={{ color: "#004643", marginTop: "20%" }} >
                    Welcome To Plant Buddy
                </Text>
                <Image
                    size="2xl"
                    source={require("../assets/logo.png")}
                    alt="logo"
                    style={{ marginTop: "20%" }}
                />



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
                            style={{ alignItems: "flex-start", marginTop: 10, width: "95%", marginHorizontal: 10 }}
                        >

                            <Button
                                marginVertical={"3%"}
                                borderRadius={10}
                                width={"100%"}
                                size="xl"
                                bgColor="#004643"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                onPress={() =>
                                    navigation.navigate("login")
                                }
                            >
                                <ButtonText size="md"> Login </ButtonText>
                            </Button>

                            <Button

                                borderRadius={10}
                                width={"100%"}
                                size="xl"
                                style={{ borderColor: "#004643", borderWidth: 1 }}
                                bgColor="#ffff"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                onPress={() =>
                                    navigation.navigate("Register")}
                            >
                                <ButtonText color="#004643" size="md">Register a new Account</ButtonText>
                            </Button>


                        </View>
                    )}
                </Formik>
                <Text size={"md"} style={{ color: "#004643", marginTop: "10%" }} >
                    All rights reserved @2026
                </Text>
            </View >

        </ImageBackground >
    );
}

const styles = StyleSheet.create({});
