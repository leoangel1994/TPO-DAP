import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import RecipesFlatList from './RecipesFlatList';
import {Recipe} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import { getRecipesForLoggedUser } from '../api/ApiRecipes';

const MyRecipesScreen = ({navigation}: {navigation: any}) => {
  const [mensajeCargando, setMensajeCargando] = useState('Sin Recetas cargadas');
  const [recipesListData, setRecipesListData] = useState<Recipe[]>([]);

  const getRecipesListData = async () => {
    setMensajeCargando('Cargando...');
    getRecipesForLoggedUser()
      .then(recipes => {
        const item_data: Recipe[] = recipes;
        setRecipesListData(item_data);
        console.log('GET: OK');
        if(item_data.length == 0)
          setMensajeCargando('Sin Recetas cargadas');
      })
      .catch(() => {
        navigation.navigate(Screens.ErrorScreen, {
          errorCode: '2',
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
        <Text style={styles.titleText}>Mis Recetas</Text>
      </View>
      {recipesListData.length != 0 ? (
        <RecipesFlatList
          dataList={recipesListData}
          onNextPress={(recipeId: string, userId: string) =>
            navigation.navigate(Screens.RecipeDetails, {
              recipeId: recipeId,
              userId: userId,
            })
          }
        />
      ) : (
        <Text style={{...styles.subTitleText, marginLeft: 'auto', marginRight: 'auto', paddingTop: '30%'}}>{mensajeCargando}</Text>
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

export default MyRecipesScreen;
