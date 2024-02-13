import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {useLinkTo} from '@react-navigation/native';

export const NewRecipeScreen2 = () => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30, minWidth: '100%'}}>
          <Text style={styles.titleText}>Preparación</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de Platos"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Tiempo de preparación"></TextInput>
          <Text style={{...styles.titleText, marginTop: 32}}>Ingredientes</Text>
          <View
            style={{
              marginTop: 8,
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            <View style={{width: '50%'}}>
              <Text style={styles.subTitleText}>Nombre</Text>
            </View>
            <Text style={styles.subTitleText}>Cantidad</Text>
          </View>

          <View style={{width: '50%'}}></View>
        </View>
      </ScrollView>
      <PrimaryButton
        text="Siguiente"
        onPress={() => linkTo('/NewRecipe3')}></PrimaryButton>
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

export default NewRecipeScreen2;
