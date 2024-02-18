import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import RecipesFlatList from './RecipesFlatList';
import {Recipe} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import axios from 'axios';

const MyRecipesScreen = ({navigation}: {navigation: any}) => {
  const [recipesListData, setRecipesListData] = useState<Recipe[]>([]);

  const getRecipesListData = () => {
    axios
      .get('https://run.mocky.io/v3/fcd45b41-ff58-43f9-88b5-bba61ade04d6')
      .then(response => {
        const item_data: Recipe[] = response.data;
        setRecipesListData(item_data);
        console.log('GET: OK');
      })
      .catch(() => {
        console.log('TODO: Pantalla manejo de error');
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
          onNextPress={() => navigation.navigate(Screens.RecipeDetails)}
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
