import {StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';

export const EditRecipeScreen1 = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Editar Receta</Text>
        <Text style={styles.subTitleText}>
          Información principal sobre tu receta
        </Text>
        <TextInput style={styles.input} placeholder="Título"></TextInput>
        <TextInput style={styles.input} placeholder="Descripción"></TextInput>
        <TextInput style={styles.input} placeholder="Link a video"></TextInput>
      </View>
      <PrimaryButton
        text="Siguiente"
        onPress={() =>
          navigation.navigate(Screens.EditRecipe2)
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

export default EditRecipeScreen1;
