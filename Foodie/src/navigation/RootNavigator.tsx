import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../components/LandingScreen';
import LoginScreen from '../components/LoginScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{}} />
        <Stack.Screen name="Landing" component={LandingScreen} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
