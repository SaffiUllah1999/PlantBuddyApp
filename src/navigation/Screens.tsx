import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./Menu";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../screens/Register";
import BottomNav from "./BottomNav";
import Tutorial from "../screens/Tutorial";
import Home from "../screens/Home";
import Details from "../screens/Details";

const Stack = createStackNavigator();

export default function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="Home" component={BottomNav} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
