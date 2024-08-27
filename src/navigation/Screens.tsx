import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./Menu";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false}}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
