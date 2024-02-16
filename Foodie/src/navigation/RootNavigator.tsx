import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../components/LoginScreen';
import NewRecipeScreen1 from '../components/NewRecipeScreen1';
import NewRecipeScreen2 from '../components/NewRecipeScreen2';
import NewRecipeScreen3 from '../components/NewRecipeScreen3';
import NewRecipeScreen4 from '../components/NewRecipeScreen4';
import {Theme} from '../../Theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from '../components/LandingScreen';
import SearchScreen from '../components/SearchScreen';
import FavoritesScreen from '../components/FavoritesScreen';
import ProfileScreen from '../components/ProfileScreen';
import Icon from 'react-native-ico-material-design';
import EditProfileScreen from '../components/EditProfileScreen';
import MyRecipesScreen from '../components/MyRecipesScreen';
import EditRecipeScreen1 from '../components/EditRecipeScreen1';
import EditRecipeScreen2 from '../components/EditRecipeScreen2';
import EditRecipeScreen3 from '../components/EditRecipeScreen3';
import EditRecipeScreen4 from '../components/EditRecipeScreen4';
import RecipeDetailsScreen from '../components/RecipeDetails';
import {View} from 'react-native';

export const Screens = {
  Login: 'Login',
  TabNavigator: 'TabNavigator', // Tabs
  Landing: 'Landing',
  Search: 'Search',
  Favorites: 'Favorites',
  Profile: 'Profile',
  MyRecipes: 'MyRecipes',
  EditProfile: 'EditProfile',
  PlusButton: 'PlusButton',
  NewRecipe1: 'NewRecipe1',
  NewRecipe2: 'NewRecipe2',
  NewRecipe3: 'NewRecipe3',
  NewRecipe4: 'NewRecipe4',
  EditRecipe1: 'EditRecipe1',
  EditRecipe2: 'EditRecipe2',
  EditRecipe3: 'EditRecipe3',
  EditRecipe4: 'EditRecipe4',
  RecipeDetails: 'RecipeDetails',
};

// workaround para el + button del tabbar
export const PlusButtonNullComponent = () => {
  return <></>;
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.Landing}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: Theme.colors.SECONDARY_3},
        tabBarInactiveTintColor: Theme.colors.PRIMARY_1,
        tabBarActiveTintColor: Theme.colors.PRIMARY_2,
      }}>
      <Tab.Screen
        name={Screens.Landing}
        component={LandingScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({size, color}) => (
            <Icon name="home-button" height={size} width={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Search}
        component={SearchScreen}
        options={{
          title: 'Buscar',
          tabBarIcon: ({size, color}) => (
            <Icon
              name="searching-magnifying-glass"
              height={size}
              width={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.PlusButton}
        component={PlusButtonNullComponent}
        options={{
          title: '',
          tabBarIcon: ({size, color}) => (
            <View
              style={{
                position: 'absolute',
                bottom: 10, // space from bottombar
                height: 58,
                width: 58,
                borderRadius: 58,
                backgroundColor: Theme.colors.SECONDARY_2,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: Theme.colors.PRIMARY_3,
              }}>
              <Icon
                name="add-plus-button"
                height={size}
                width={size}
                color={Theme.colors.NEUTRAL_4}
              />
            </View>
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); //workaround porque no logré que funcione de otra manera.
            navigation.navigate(Screens.NewRecipe1);
          },
        })}
      />
      <Tab.Screen
        name={Screens.Favorites}
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({size, color}) => (
            <Icon
              name="mark-as-favorite-star"
              height={size}
              width={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Profile}
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({size, color}) => (
            <Icon name="user-shape" height={size} width={size} color={color} />
          ),
        }}
      />
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
        <Stack.Group>
          <Stack.Screen
            name={Screens.TabNavigator}
            component={TabNavigator}
            options={{}}
          />
          <Stack.Screen
            name={Screens.EditProfile}
            component={EditProfileScreen}
            options={{
              title: 'Editar Perfil',
              headerShown: true,
              headerStyle: {
                backgroundColor: Theme.colors.SECONDARY_3,
              },
            }}
          />
          <Stack.Screen
            name={Screens.MyRecipes}
            component={MyRecipesScreen}
            options={{
              title: 'Mis Recetas',
              headerShown: true,
              headerStyle: {
                backgroundColor: Theme.colors.SECONDARY_3,
              },
            }}
          />
          <Stack.Screen
            name={Screens.RecipeDetails}
            component={RecipeDetailsScreen}
            options={{
              title: 'Detales Receta',
              headerShown: true,
              headerStyle: {
                backgroundColor: Theme.colors.SECONDARY_3,
              },
            }}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            title: 'Nueva Receta',
            headerShown: true,
            headerStyle: {
              backgroundColor: Theme.colors.SECONDARY_3,
            },
          }}>
          <Stack.Screen
            name={Screens.NewRecipe1}
            component={NewRecipeScreen1}
            options={{}}
          />
          <Stack.Screen
            name={Screens.NewRecipe2}
            component={NewRecipeScreen2}
            options={{}}
          />
          <Stack.Screen
            name={Screens.NewRecipe3}
            component={NewRecipeScreen3}
            options={{}}
          />
          <Stack.Screen
            name={Screens.NewRecipe4}
            component={NewRecipeScreen4}
            options={{}}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            title: 'Editar Receta',
            headerShown: true,
            headerStyle: {
              backgroundColor: Theme.colors.SECONDARY_3,
            },
          }}>
          <Stack.Screen
            name={Screens.EditRecipe1}
            component={EditRecipeScreen1}
            options={{}}
          />
          <Stack.Screen
            name={Screens.EditRecipe2}
            component={EditRecipeScreen2}
            options={{}}
          />
          <Stack.Screen
            name={Screens.EditRecipe3}
            component={EditRecipeScreen3}
            options={{}}
          />
          <Stack.Screen
            name={Screens.EditRecipe4}
            component={EditRecipeScreen4}
            options={{}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
