import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./Menu";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../screens/Register";
import BottomNav from "./BottomNav";
import Tutorial from "../screens/Tutorial";
import Home from "../screens/Home";
import Details from "../screens/Details";
import Cart from "../screens/Cart";
import Article_Details from "../screens/Article_Details";
import Browse from "../screens/Browse";

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
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ArticleDetail" component={Article_Details} />
        <Stack.Screen name="Browse" component={Browse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
