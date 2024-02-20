import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import RecipesFlatList from './RecipesFlatList';
import {Recipe} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const MyRecipesScreen = ({navigation}: {navigation: any}) => {
  const [recipesListData, setRecipesListData] = useState<Recipe[]>([]);

  const getRecipesListData = async () => {
    let session = await EncryptedStorage.getItem('user_session');
    let accessToken = '';
    if (session !== undefined) {
      const parsedSession = JSON.parse(session?.toString() ?? '');
      accessToken = 'Bearer ' + parsedSession.accessToken;
    }

    axios
      //.get('https://run.mocky.io/v3/fcd45b41-ff58-43f9-88b5-bba61ade04d6')
      .get('http://15.228.167.207:3000/users/recipes', {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        const item_data: Recipe[] = response.data;
        setRecipesListData(item_data);
        console.log('GET: OK');
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

export default MyRecipesScreen;
