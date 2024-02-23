import {Share} from 'react-native';
import {Screens} from '../navigation/RootNavigator';
import { Recipe } from './FoodApiInterfaces/interfaces';

const onRecipeShare = async (navigation: any, recipe: Recipe) => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
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
    navigation.navigate(Screens.ErrorScreen, {
      errorCode: '9',
      errorMessage: 'Error al intentar compartir la receta',
      nextScreen: Screens.Landing,
    });
  }
};

export default onRecipeShare;
