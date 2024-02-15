import {PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {useLinkTo} from '@react-navigation/native';

export const NewRecipeScreen1 = () => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30, minWidth: '100%'}}>
          <Text style={styles.titleText}>Nueva Receta</Text>
          <Text style={styles.subTitleText}>
            Información principal sobre tu receta
          </Text>
          <TextInput style={styles.input} placeholder="Título"></TextInput>
          <TextInput style={styles.input} placeholder="Descripción"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Link a video"></TextInput>
        </View>
      </ScrollView>
      <PrimaryButton
        text="Siguiente"
        onPress={() => linkTo('/NewRecipe2')}></PrimaryButton>
      <View style={{padding: 10}}></View>{/* pequeño padding extra por el boton del tab bar que me jode*/}
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

export default NewRecipeScreen1;
