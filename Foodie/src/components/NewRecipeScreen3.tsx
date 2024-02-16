import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';

export const NewRecipeScreen3 = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30}}>
          <Text style={styles.titleText}>Pasos</Text>
          <Text style={styles.subTitleText}>
            Contanos paso a paso como se hace
          </Text>
          <TextInput style={styles.input} placeholder="Paso 1"></TextInput>
          <PrimaryButton // cambiar a un componente que sea boton redondo +...
            text="+"
            onPress={() =>
              console.log('yo agrego un TextInput arriba. ok.')
            }></PrimaryButton>
        </View>
      </ScrollView>
      <PrimaryButton
        text="Siguiente"
        onPress={() => navigation.navigate(Screens.NewRecipe4)}></PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    alignItems: 'flex-start',
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: CommonStyle.input,
});

export default NewRecipeScreen3;
