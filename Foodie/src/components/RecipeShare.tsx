import {Share} from 'react-native';
import {Screens} from '../navigation/RootNavigator';
import {Recipe} from './FoodApiInterfaces/interfaces';
import { ERROR_SHARE, ErrorNavigate } from './Error/ErrorCodes';

const onRecipeShare = async (navigation: any, recipe: Recipe) => {
  try {
    const result = await Share.share({
      message: `Mirá esta receta que encontré en Foodie!

${recipe.title}
${recipe.description}

Porciones: ${recipe.portions}
Tiempo: ${recipe.preparationTime}

Ingredientes:
${recipe.ingredients.map(ing => ing.name + ' (' + ing.amount + ')').join('\n')}

Pasos:
${recipe.steps.join('\n')}

Encontrá más recetas como esta en Foodie!
`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    ErrorNavigate(navigation, ERROR_SHARE)
  }
};

export default onRecipeShare;
