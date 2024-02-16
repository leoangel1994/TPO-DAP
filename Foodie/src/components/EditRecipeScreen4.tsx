import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';

export const EditRecipeScreen4 = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30}}>
          <Text style={styles.titleText}>Otros Datos</Text>
          <Text style={styles.subTitleText}>
            Agrega más información para que otros puedan encotrar tu receta
            facilmente
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de calorías"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de proteínas"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de grasas totales"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Soy el dropdown de tags..."></TextInput>
        </View>
      </ScrollView>
      <PrimaryButton
        text="Siguiente"
        onPress={() => navigation.navigate(Screens.Landing)}></PrimaryButton>
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

export default EditRecipeScreen4;
