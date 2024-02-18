import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import RecipesFlatList from './RecipesFlatList';
import {Screens} from '../navigation/RootNavigator';
import {RecipesListItemType} from './FoodApiInterfaces/interfaces';
import {useEffect, useState} from 'react';
import axios from 'axios';

const FavoritesScreen = ({navigation}: {navigation: any}) => {
  const [favRecipesListData, setFavRecipesListData] = useState<RecipesListItemType[]>(
    [],
  );

  const getRecipesListData = () => {
    axios
      .get('https://run.mocky.io/v3/a9cf908b-d545-4ab3-950f-c4c9330c8761')
      .then(response => {
        const item_data: RecipesListItemType[] = response.data;
        setFavRecipesListData(item_data);
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
      <View style={{padding: 30}}>
        <Text style={styles.titleText}>Mis Favoritos</Text>
      </View>
      {favRecipesListData.length != 0 ? (
        <RecipesFlatList
          dataList={favRecipesListData}
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
