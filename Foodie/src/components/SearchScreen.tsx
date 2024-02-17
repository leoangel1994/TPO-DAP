import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import Icon from 'react-native-ico-material-design';
import test_data from './carrousel/test_data';
import ModalFiltros from './FiltersModal';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import RecipesFlatList from './RecipesFlatList';

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

  useEffect(() => {
    setFilters(
      route.params?.filtersApplied
        ? [...route.params?.filtersApplied]
        : [false, false, false, false, false, false, false, false, false],
    );
    setSearchText(route.params?.searchedText ?? '');
  }, [route.params?.filtersApplied, route.params?.searchedText]);
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
            marginBottom: 0,
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
      </View>
      <RecipesFlatList dataList={test_data}/>
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
});

export default SearchScreen;
