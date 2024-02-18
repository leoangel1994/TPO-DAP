import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import CarouselCards from './carrousel/CarrouselCard';
import Icon from 'react-native-ico-material-design';
import {useEffect, useState} from 'react';
import {Screens} from '../navigation/RootNavigator';
import ModalFiltros from './FiltersModal';
import axios from 'axios';
import {Recipe} from './FoodApiInterfaces/interfaces';

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
  const [carrouselData, setCarrouselData] = useState<Recipe[]>([]);

  const getCarrouselData = () => {
    axios
      //.get('https://run.mocky.io/v3/fcd45b41-ff58-43f9-88b5-bba61ade04d6')
      .get('http://15.228.167.207:3000/recipes/carousel')
      .then(response => {
        const item_data: Recipe[] = response.data;
        setCarrouselData(item_data);
        console.log('GET: OK');
      })
      .catch(() => {
        console.log('TODO: Pantalla manejo de error');
      });
  };

  useEffect(() => {
    getCarrouselData();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Hola ~Usuario~</Text>
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

export default LandingScreen;
