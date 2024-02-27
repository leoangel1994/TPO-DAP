import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import RecipesFlatList from './RecipesFlatList';
import {Screens} from '../navigation/RootNavigator';
import {Recipe} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import {getUserFavourites} from '../api/ApiUser';
import {ERROR_FAVORITES_GET, ErrorNavigate} from './Error/ErrorCodes';

const FavoritesScreen = ({navigation}: {navigation: any}) => {
  const [mensajeCargando, setMensajeCargando] = useState(
    'No tenés recetas favoritas',
  );
  const [favRecipesListData, setFavRecipesListData] = useState<Recipe[]>([]);

  const getRecipesListData = async () => {
    setMensajeCargando('Cargando...')
    getUserFavourites()
      .then(recipes => {
        const item_data: Recipe[] = recipes;
        setFavRecipesListData(item_data);
        console.log('GET: OK');
        if(item_data?.length === 0)
          setMensajeCargando('No tenés recetas favoritas')
      })
      .catch(() => {
        ErrorNavigate(navigation, ERROR_FAVORITES_GET);
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
        <Text
          style={{
            ...styles.subTitleText,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: '30%',
          }}>
          {mensajeCargando}
        </Text>
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
