import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details, Home, Register, SignIn } from "../screens";

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={Details} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
