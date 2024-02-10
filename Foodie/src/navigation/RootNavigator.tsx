import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../components/LandingScreen';
import LoginScreen from '../components/LoginScreen';
import NuevaReceta1 from '../components/NuevaReceta1';
import { Theme } from '../../Theme';

const Stack = createNativeStackNavigator();

export const Screens = {
  Login: 'Login',
  Landing: 'Landing',
  NuevaReceta1: 'NuevaReceta1',
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Login}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={Screens.Login}
          component={LoginScreen}
          options={{}}
        />
        <Stack.Screen
          name={Screens.Landing}
          component={LandingScreen}
          options={{}}
        />
        <Stack.Group
          screenOptions={{
            title: 'Nueva Receta',
            headerShown: true,
            headerStyle: {
              backgroundColor: Theme.colors.SECONDARY_3,
            },
          }}>
          <Stack.Screen
            name={Screens.NuevaReceta1}
            component={NuevaReceta1}
            options={{}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
