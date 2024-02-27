import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import Icon from 'react-native-ico-material-design';
import ModalFiltros from './FiltersModal';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import RecipesFlatList from './RecipesFlatList';
import {Recipe} from './FoodApiInterfaces/interfaces';
import {getRecipesByFilters} from '../api/ApiRecipes';
import {ERROR_SEARCH_GET, ErrorNavigate} from './Error/ErrorCodes';

function mapTagsFilters(filters: string[]) {
  if (filters == undefined || filters.length == 0) return [];
  console.log(filters);
  let filterNames: string[] = [
    'Rápida Preparación',
    'Vegetarianas',
    'Vegana',
    'Aptas Celiacos',
    'Estimula el Sistema Inmune',
    'Promueve la Flora Intestinal',
    'Antiinflamatoria',
    'Baja en Sodio',
    'Baja en Carbohidratos',
  ];

  let selectedFilters: string[] = [];

  for (let i = 0; i < filters.length; i++) {
    if ((filters[i] as unknown) == true) {
      selectedFilters.push(filterNames[i]);
    }
  }
  return selectedFilters;
}

const SearchScreen = ({navigation}: {navigation: any}) => {
  const [mensajeCargando, setMensajeCargando] = useState(
    'Sin Recetas encontradas',
  );
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

  const getRecipesListData = async (tags: string[], searchText: string) => {
    setMensajeCargando('Cargando...');
    let mappedFilters = mapTagsFilters(tags);
    getRecipesByFilters(mappedFilters, searchText)
      .then(recipes => {
        const item_data: Recipe[] = recipes ?? [];
        setSearchResultRecipesListData(item_data);
        console.log('GET: OK');
        if (item_data.length == 0)
          setMensajeCargando('Sin Recetas encontradas');
      })
      .catch(() => {
        ErrorNavigate(navigation, ERROR_SEARCH_GET);
      });
  };

  useEffect(() => {
    setFilters(
      route.params?.filtersApplied
        ? [...route.params?.filtersApplied]
        : [false, false, false, false, false, false, false, false, false],
    );
    setSearchText(route.params?.searchedText ?? '');
    if ((route.params?.searchedText?.length ?? 0) > 0)
      getRecipesListData(
        route.params?.filtersApplied,
        route.params?.searchedText,
      );
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
              navigation.navigate(Screens.Search, {
                searchedText: searchText,
                filtersApplied: [...filters],
              });
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
