import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import Icon from 'react-native-ico-material-design';
import data from './carrousel/test_data';
import ModalFiltros from './FiltersModal';
import {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';

const Item = ({title}: any) => (
  <View style={styles.listItem}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SearchScreen = ({navigation}: {navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const route : any = useRoute() // For searches received from Landing Screen
  const initFilters = route.params?.filtersApplied;
  const initSearchText = route.params?.searchedText;
  
  // TODO: HELP WANTED - solo funciona cuando aun no se entro a la pantalla... como hago en general?
  console.log("search test: ", initSearchText)
  console.log("Init Filter: ", initFilters)
  const [searchText, setSearchText] = useState(initSearchText ? initSearchText : '');
  const [filters, setFilters] = useState( initFilters ? [...initFilters] : [false, false, false, false, false, false, false, false, false]);
  console.log("setted Filter: ", filters)
  console.log(searchText)

  useEffect(()=>{}, [searchText])
  return (
    <View style={styles.background}>
      <View style={{padding: 30}}>
        <Text style={styles.titleText}>Buscá Recetas</Text>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            minWidth: '100%',
            minHeight: 64,
            maxHeight: 64,
            marginTop: 16,
            marginBottom: 24,
          }}>
          <TextInput
            style={styles.input}
            onChangeText={newText => setSearchText(newText)}
            defaultValue={searchText}
            placeholder="Hoy quiero..."
            onSubmitEditing={() => {
              navigation.navigate(Screens.Search);
            }}></TextInput>
          <View
            style={{
              width: '20%',
              paddingLeft: 16,
              justifyContent: 'center',
              flex: 2,
            }}>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: Theme.colors.SECONDARY_2,
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
                height: 48,
                width: 48,
              }}>
              <Icon
                style={{marginLeft: 'auto', marginRight: 'auto'}}
                name="filter-results-button"
                height={20}
                width={20}
                color={Theme.colors.NEUTRAL_1}
              />
            </Pressable>
          </View>
        </View>
        <SafeAreaView style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => String(item.id)}
          />
        </SafeAreaView>
      </View>
      <ModalFiltros
        initialState={[...filters]}
        visible={modalVisible}
        onFiltersChanged={(index: number, value: boolean) => {
          let newFilters = [...filters]
          newFilters[index] = value;
          setFilters(newFilters)
        }}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    alignItems: 'flex-start',
  },
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
  listItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default SearchScreen;
