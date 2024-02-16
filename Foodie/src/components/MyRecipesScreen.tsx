import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import { Screens } from '../navigation/RootNavigator';

const MyRecipesScreen = ({navigation}: {navigation: any}) => {

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30}}>
          <Text style={styles.titleText}>Mis Recetas</Text>
          <Text style={styles.subTitleText}>TODO</Text>
        </View>
        <PrimaryButton text="Detalle Receta X" onPress={() => navigation.navigate(Screens.RecipeDetails)}></PrimaryButton>
        <PrimaryButton text="Editar Receta X" onPress={() => navigation.navigate(Screens.EditRecipe1)}></PrimaryButton>
      </ScrollView>
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
});

export default MyRecipesScreen;
