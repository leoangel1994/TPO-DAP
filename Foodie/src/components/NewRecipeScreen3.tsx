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
import ProgressBar from './ProgressBar'; // Importa el componente ProgressBar
import {Screens} from '../navigation/RootNavigator';
import {useRoute} from '@react-navigation/native';

const NewRecipeScreen3 = ({navigation}: {navigation: any}) => {
  const route: any = useRoute();
  const [steps, setSteps] = useState<string[]>(['']);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index] = text;
    setSteps(newSteps);
  };

  const navigateToNextScreen = () => {
    navigation.navigate(Screens.NewRecipe4, {
      step1: route.params.step1,
      step2: route.params.step2,
      step3: {
        steps: steps,
      },
    });
  };

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
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
          <Text style={styles.titleText}>Pasos</Text>
          <Text style={styles.subTitleText}>
            Contanos paso a paso como se hace
          </Text>

          {steps.map((step, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Paso ${index + 1}`}
              value={step}
              onChangeText={text => updateStep(index, text)}
            />
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addStep}>
            <Text style={{fontSize: 20, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{height: 160}}>
        {!isKeyboardOpen && <ProgressBar currentStep={3} />}
        <View style={{height: 36}} />
        <PrimaryButton
          text="Siguiente"
          backgroundColor={
            steps[0] && steps[0].length > 0
              ? Theme.colors.SECONDARY_2
              : Theme.colors.NEUTRAL_3
          }
          onPress={() => {
            if (steps[0] && steps[0].length > 0) navigateToNextScreen();
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
    marginBottom: 8,
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
  },
});

export default NewRecipeScreen3;
