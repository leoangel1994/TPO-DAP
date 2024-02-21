import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import Icon from 'react-native-ico-material-design';
import ModalFiltros from './FiltersModal';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import RecipesFlatList from './RecipesFlatList';
import {Recipe} from './FoodApiInterfaces/interfaces';
import { getRecipesForLoggedUser } from '../api/ApiRecipes';

const SearchScreen = ({navigation}: {navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const route: any = useRoute(); // For searches received from Landing Screen

  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [searchResultRecipesListData, setSearchResultRecipesListData] =
    useState<Recipe[]>([]);

  const getRecipesListData = async () => {
    getRecipesForLoggedUser()
      .then(recipes => {
        const item_data: Recipe[] = recipes;
        setSearchResultRecipesListData(item_data);
        console.log('GET: OK');
      })
      .catch(() => {
        navigation.navigate(Screens.ErrorScreen, {
          errorCode: '6',
          errorMessage: 'Error al obtener recetas',
          nextScreen: Screens.Landing,
        });
      });
  };

  useEffect(() => {
    setFilters(
      route.params?.filtersApplied
        ? [...route.params?.filtersApplied]
        : [false, false, false, false, false, false, false, false, false],
    );
    setSearchText(route.params?.searchedText ?? '');
    getRecipesListData(); // TODO: pasar filtros y texto...
  }, [route.params?.filtersApplied, route.params?.searchedText]);
  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Buscá Recetas</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            onChangeText={newText => setSearchText(newText)}
            defaultValue={searchText}
            placeholder="Hoy quiero..."
            onSubmitEditing={() => {
              navigation.navigate(Screens.Search);
            }}></TextInput>
          <View style={styles.searchButtonContainer}>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.filterButton}>
              <Icon
                style={styles.filterIcon}
                name="filter-results-button"
                height={20}
                width={20}
                color={Theme.colors.NEUTRAL_1}
              />
            </Pressable>
          </View>
        </View>
      </View>
      {searchResultRecipesListData.length != 0 ? (
        <RecipesFlatList
          dataList={searchResultRecipesListData}
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
      <ModalFiltros
        initialState={[...filters]}
        visible={modalVisible}
        onFiltersChanged={(index: number, value: boolean) => {
          let newFilters = [...filters];
          newFilters[index] = value;
          setFilters(newFilters);
        }}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      />
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
  input: {...CommonStyle.input, width: '80%'},
  listContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    minWidth: '100%',
    minHeight: 64,
    maxHeight: 64,
    marginTop: 16,
    marginBottom: 36,
  },
  searchButtonContainer: {
    width: '20%',
    paddingLeft: 16,
    justifyContent: 'center',
    flex: 2,
  },
  filterButton: {
    backgroundColor: Theme.colors.SECONDARY_2,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    height: 48,
    width: 48,
  },
  filterIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default SearchScreen;
