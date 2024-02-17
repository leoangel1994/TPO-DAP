import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { CommonStyle, Theme } from '../../Theme';
import { PrimaryButton } from './PrimaryButton';
import { Screens } from '../navigation/RootNavigator';

export const NewRecipeScreen2 = ({ navigation }: { navigation: any }) => {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleIngredientNameChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].name = text;
    setIngredients(updatedIngredients);
  };

  const handleIngredientQuantityChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].quantity = text;
    setIngredients(updatedIngredients);
  };

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{ padding: 30, minWidth: '100%' }}>
          <Text style={styles.titleText}>Preparación</Text>
          <TextInput style={styles.input} placeholder="Cantidad de Platos" />
          <TextInput style={styles.input} placeholder="Tiempo de preparación" />
          <Text style={{ ...styles.titleText, marginTop: 32 }}>Ingredientes</Text>

          {ingredients.map((ingredient, index) => (
            <View key={index} style={{ marginTop: 8, flex: 1, flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                {index === 0 && <Text style={styles.subTitleText}>Nombre</Text>}
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del Ingrediente"
                  value={ingredient.name}
                  onChangeText={(text) => handleIngredientNameChange(text, index)}
                />
              </View>
              <View style={{ width: '50%' }}>
                {index === 0 && <Text style={styles.subTitleText}>Cantidad</Text>}
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad del Ingrediente"
                  value={ingredient.quantity}
                  onChangeText={(text) => handleIngredientQuantityChange(text, index)}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

          {/* Botón Siguiente */}
          <PrimaryButton text="Siguiente" onPress={() => navigation.navigate(Screens.NewRecipe3)} />
        </View>
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
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: {
    ...CommonStyle.input,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: Theme.colors.SECONDARY_1,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: Theme.colors.WHITE,
    fontSize: 20,
  },
});

export default NewRecipeScreen2;
