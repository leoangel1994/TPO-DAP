import {StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';

export const EditRecipeScreen3 = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
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
      <PrimaryButton
        text="Siguiente"
        onPress={() =>
          navigation.navigate(Screens.EditRecipe4)
        }></PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: CommonStyle.mainContainer,
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: CommonStyle.input,
});

export default EditRecipeScreen3;
