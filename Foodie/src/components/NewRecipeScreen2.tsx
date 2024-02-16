import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import {Screens} from '../navigation/RootNavigator';

export const NewRecipeScreen2 = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30, minWidth: '100%'}}>
          <Text style={styles.titleText}>Preparación</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de Platos"
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo de preparación"
          />
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
              <TextInput
                style={styles.input}
                placeholder="Nombre del Ingrediente"
              />
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.subTitleText}>Cantidad</Text>
              <TextInput
                style={styles.input}
                placeholder="Cantidad del Ingrediente"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        text="Siguiente"
        onPress={() => navigation.navigate(Screens.NewRecipe3)}
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
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: {
    ...CommonStyle.input,
    marginTop: 8,
  },
});

export default NewRecipeScreen2;

