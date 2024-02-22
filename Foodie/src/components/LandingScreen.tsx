import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import CarouselCards from './carrousel/CarrouselCard';
import Icon from 'react-native-ico-material-design';
import {useEffect, useState} from 'react';
import {Screens} from '../navigation/RootNavigator';
import ModalFiltros from './FiltersModal';
import {Recipe} from './FoodApiInterfaces/interfaces';
import { getUserSession } from '../api/ApiManager';
import { getRecipesForCarousel } from '../api/ApiRecipes';

const LandingScreen = ({navigation}: {navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
  const [userName, setUserName] = useState('');
  const [carrouselData, setCarrouselData] = useState<Recipe[]>([]);

  const getCarrouselData = () => {
    getRecipesForCarousel()
      .then(recipes => {
        const item_data: Recipe[] = recipes;
        setCarrouselData(item_data);
        console.log('GET: OK');
      })
      .catch(() => {
        navigation.navigate(Screens.ErrorScreen, {
          errorCode: '1',
          errorMessage: 'Error al cargar el carrousel',
          nextScreen: Screens.Login,
        });
      });
  };

  const getUsername = () => {
    getUserSession()
      .then((session: any) => {
        setUserName(session.username);
      }).catch((error) => {console.log(error);});
  }

  useEffect(() => {
    getCarrouselData();
    getUsername();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Hola {userName}</Text>
        <Text style={styles.subTitleText}>¿Qué vas a preparar hoy?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Hoy quiero..."
            onChangeText={newText => setSearchText(newText)}
            defaultValue={searchText}
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
        <Text style={styles.subTitleText}>Los mejores calificados</Text>
        {carrouselData.length != 0 ? (
          <CarouselCards navigation={navigation} data={carrouselData} />
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>
      <ModalFiltros
        visible={modalVisible}
        initialState={[...filters]}
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
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  searchInput: {...CommonStyle.input, width: '80%'},
  mainContainer: CommonStyle.mainContainer,
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    minWidth: '100%',
    minHeight: 64,
    maxHeight: 64,
    marginTop: 16,
    marginBottom: 24,
  },
  searchButtonContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
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

export default LandingScreen;
