import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../components/LoginScreen';
import NuevaReceta1 from '../components/NuevaReceta1';
import NuevaReceta2 from '../components/NuevaReceta2';
import NuevaReceta3 from '../components/NuevaReceta3';
import NuevaReceta4 from '../components/NuevaReceta4';
import {Theme} from '../../Theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from '../components/LandingScreen';
import SearchScreen from '../components/SearchScreen';
import FavoritesScreen from '../components/FavoritesScreen';
import ProfileScreen from '../components/ProfileScreen';

export const Screens = {
  Login: 'Login',
  TabNavigator: 'TabNavigator', // Tabs
  Landing: 'Landing',
  Search: 'Search',
  Favorites: 'Favorites',
  Profile: 'Profile',
  NuevaReceta1: 'NuevaReceta1',
  NuevaReceta2: 'NuevaReceta2',
  NuevaReceta3: 'NuevaReceta3',
  NuevaReceta4: 'NuevaReceta4',
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.Landing}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: Theme.colors.SECONDARY_3},
      }}>
      <Tab.Screen name={Screens.Landing} component={LandingScreen} />
      <Tab.Screen name={Screens.Search} component={SearchScreen} />
      <Tab.Screen name={Screens.Favorites} component={FavoritesScreen} />
      <Tab.Screen name={Screens.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

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
          name={Screens.TabNavigator}
          component={TabNavigator}
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
          <Stack.Screen
            name={Screens.NuevaReceta2}
            component={NuevaReceta2}
            options={{}}
          />
          <Stack.Screen
            name={Screens.NuevaReceta3}
            component={NuevaReceta3}
            options={{}}
          />
          <Stack.Screen
            name={Screens.NuevaReceta4}
            component={NuevaReceta4}
            options={{}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
