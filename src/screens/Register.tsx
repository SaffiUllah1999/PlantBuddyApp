import { StyleSheet, View } from "react-native";
import React from "react";
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
} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";

export default function Register() {
  const navigation = useNavigation();
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
        <View style={{ alignItems: "flex-start", marginTop: 10, width: "96%" }}>
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
            <InputField placeholder="Enter your password" />
          </Input>



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
          >
            <ButtonText>Sign Up</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
