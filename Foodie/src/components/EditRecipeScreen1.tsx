import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {useLinkTo} from '@react-navigation/native';

export const EditRecipeScreen1 = () => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30, minWidth: '100%'}}>
          <Text style={styles.titleText}>Editar Receta</Text>
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
        onPress={() => linkTo('/EditRecipe2')}></PrimaryButton>
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

export default EditRecipeScreen1;
