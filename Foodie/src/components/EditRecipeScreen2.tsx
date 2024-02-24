import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import {PrimaryButton} from './PrimaryButton';
import ProgressBar from './ProgressBar';
import {Screens} from '../navigation/RootNavigator';
import {useRoute} from '@react-navigation/native';
import {Recipe, RecipeIngredients} from './FoodApiInterfaces/interfaces';

interface IngredienteForm {
  name: string;
  amount: string;
}

export const EditRecipeScreen2 = ({navigation}: {navigation: any}) => {
  const route: any = useRoute(); // For searches received from Landing Screen
  const [portions, setPortions] = useState(0);
  const [preparationTime, setPreparationTime] = useState('');
  const [ingredients, setIngredients] = useState<IngredienteForm[]>([
    {name: '', amount: ''},
  ]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const addIngredient = () => {
    setIngredients([...ingredients, {name: '', amount: ''}]);
  };

  const removeIngredient = (index: number) => {
    let ingredientes_copy = [...ingredients];
    ingredientes_copy.splice(index, 1);
    setIngredients(ingredientes_copy);
  };

  const validateIngredients = () => {
    let any_empty = ingredients.some((ingredient: IngredienteForm) => {
      return ingredient.name.length == 0 || ingredient.amount.length == 0;
    });
    return !any_empty && ingredients.length > 0;
  };

  const handleIngredientNameChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].name = text;
    setIngredients(updatedIngredients);
  };

  const handleIngredientQuantityChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].amount = text;
    setIngredients(updatedIngredients);
  };

  const navigateToNextScreen = () => {
    navigation.navigate(Screens.EditRecipe3, {
      recipe: route.params.recipe,
      imagesForDeletion: route.params.imagesForDeletion,
      step1: route.params.step1,
      step2: {
        portions: portions,
        preparationTime: preparationTime,
        ingredients: ingredients,
      },
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    // initial values from recipe
    const recipe: Recipe = route.params.recipe;

    setPortions(recipe.portions);
    setPreparationTime(recipe.preparationTime);
    setIngredients(recipe.ingredients);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [route.params?.recipe]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>Preparación</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Cantidad de Platos"
            defaultValue={portions.toString()}
            onChangeText={newText => {
              newText.replace(/[^0-9]/, '');
              setPortions(Number.parseInt(newText));
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo de preparación"
            defaultValue={preparationTime}
            onChangeText={newText => setPreparationTime(newText)}
          />
          <Text style={{...styles.titleText, marginTop: 32}}>Ingredientes</Text>

          <View
            style={{
              marginTop: 8,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              maxHeight: 28,
            }}>
            <View style={{width: '45%'}}>
              {ingredients.length !== 0 && (
                <Text style={styles.subTitleText}>Nombre</Text>
              )}
            </View>
            <View style={{width: '35%'}}>
              {ingredients.length !== 0 && (
                <Text style={styles.subTitleText}>Cantidad</Text>
              )}
            </View>
            <View style={{width: '10%'}}></View>
          </View>

          {ingredients.map((ingredient, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 72,
                maxHeight: 72,
              }}>
              <View style={{width: '45%'}}>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrediente"
                  value={ingredient.name}
                  onChangeText={text => handleIngredientNameChange(text, index)}
                />
              </View>
              <View style={{width: '35%'}}>
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  value={ingredient.amount}
                  onChangeText={text =>
                    handleIngredientQuantityChange(text, index)
                  }
                />
              </View>
              <View style={{width: '10%'}}>
                <TouchableOpacity
                  style={styles.minusButton}
                  onPress={() => {
                    removeIngredient(index);
                  }}>
                  <Text style={styles.addButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{height: 160}}>
        {!isKeyboardOpen && <ProgressBar currentStep={2} />}
        <View style={{height: 36}} />

        <PrimaryButton
          text="Siguiente"
          backgroundColor={
            portions && preparationTime && validateIngredients()
              ? Theme.colors.SECONDARY_2
              : Theme.colors.NEUTRAL_3
          }
          onPress={() => {
            if (portions && preparationTime && validateIngredients())
              navigateToNextScreen();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: 30,
    minWidth: '100%',
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  input: {
    ...CommonStyle.input,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: Theme.colors.SECONDARY_2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  minusButton: {
    backgroundColor: Theme.colors.DANGER,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  addButtonText: {
    color: Theme.colors.NEUTRAL_4,
    fontSize: 20,
  },
});

export default EditRecipeScreen2;
