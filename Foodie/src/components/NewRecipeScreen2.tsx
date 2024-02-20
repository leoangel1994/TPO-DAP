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

interface IngredienteForm {
  name: string;
  quantity: string;
}

export const NewRecipeScreen2 = ({navigation}: {navigation: any}) => {
  const route: any = useRoute(); // For searches received from Landing Screen
  const [portions, setPortions] = useState(0);
  const [preparationTime, setPreparationTime] = useState('');
  const [ingredients, setIngredients] = useState<IngredienteForm[]>([{name: "", quantity: ""}]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const addIngredient = () => {
    setIngredients([...ingredients, {name: '', quantity: ''}]);
  };

  const removeIngredient = () => {
    let ingredientes_copy = [...ingredients];
    ingredientes_copy.pop();
    setIngredients(ingredientes_copy);
  };

  const validateIngredients = () => {
    let any_empty = ingredients.some((ingredient : IngredienteForm) => {return ingredient.name.length == 0 || ingredient.quantity.length == 0})
    console.log("ANY EMPTY", any_empty)
    return !any_empty && ingredients.length > 0;
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

  const navigateToNextScreen = () => {
    navigation.navigate(Screens.NewRecipe3, {
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

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
            onChangeText={newText => {
              newText.replace(/[^0-9]/, '');
              setPortions(Number.parseInt(newText));
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo de preparación"
            onChangeText={newText => setPreparationTime(newText)}
          />
          <Text style={{...styles.titleText, marginTop: 32}}>Ingredientes</Text>

          {ingredients.map((ingredient, index) => (
            <View
              key={index}
              style={{
                marginTop: 8,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '55%'}}>
                {index === 0 && <Text style={styles.subTitleText}>Nombre</Text>}
                <TextInput
                  style={styles.input}
                  placeholder="Ingrediente"
                  value={ingredient.name}
                  onChangeText={text => handleIngredientNameChange(text, index)}
                />
              </View>
              <View style={{width: '35%'}}>
                {index === 0 && (
                  <Text style={styles.subTitleText}>Cantidad</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  value={ingredient.quantity}
                  onChangeText={text =>
                    handleIngredientQuantityChange(text, index)
                  }
                />
              </View>
            </View>
          ))}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={removeIngredient}>
              <Text style={styles.addButtonText}>-</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 8,
    marginRight: 16,
  },
  minusButton: {
    backgroundColor: Theme.colors.DANGER,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: Theme.colors.NEUTRAL_4,
    fontSize: 20,
  },
});

export default NewRecipeScreen2;
