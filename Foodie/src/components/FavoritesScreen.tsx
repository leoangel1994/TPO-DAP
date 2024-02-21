import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import RecipesFlatList from './RecipesFlatList';
import {Screens} from '../navigation/RootNavigator';
import {Recipe} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import {getRecipesForLoggedUser} from '../api/ApiRecipes';

const FavoritesScreen = ({navigation}: {navigation: any}) => {
  const [favRecipesListData, setFavRecipesListData] = useState<Recipe[]>([]);

  const getRecipesListData = async () => {
    getRecipesForLoggedUser()
      .then(recipes => {
        const item_data: Recipe[] = recipes;
        setFavRecipesListData(item_data);
        console.log('GET: OK');
      })
      .catch(() => {
        navigation.navigate(Screens.ErrorScreen, {
          errorCode: '3',
          errorMessage: 'Error al obtener recetas del usuario',
          nextScreen: Screens.Profile,
        });
      });
  };

  useEffect(() => {
    getRecipesListData();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Mis Favoritos</Text>
      </View>
      {favRecipesListData.length != 0 ? (
        <RecipesFlatList
          dataList={favRecipesListData}
          onNextPress={(recipeId: string, userId: string) =>
            navigation.navigate(Screens.RecipeDetails, {
              recipeId: recipeId,
              userId: userId,
            })
          }
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: CommonStyle.mainContainer,

  backgroundTabBar: {
    backgroundColor: Theme.colors.SECONDARY_2,
    width: '100%',
    height: 64,
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  buttonPosition: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
});

export default FavoritesScreen;
