import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../components/LandingScreen';
import LoginScreen from '../components/LoginScreen';

const Stack = createNativeStackNavigator();

export const Screens = {
  Login: 'Login',
  Landing: 'Landing',
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Login}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Screens.Login} component={LoginScreen} options={{}} />
        <Stack.Screen name={Screens.Landing} component={LandingScreen} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
