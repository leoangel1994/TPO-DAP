import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {Screens} from '../navigation/RootNavigator';
import RecipesFlatList from './RecipesFlatList';
import test_data from './carrousel/test_data';

const MyRecipesScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Mis Recetas</Text>
      </View>
      <RecipesFlatList dataList={test_data} onNextPress={() => navigation.navigate(Screens.RecipeDetails)}/>
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
