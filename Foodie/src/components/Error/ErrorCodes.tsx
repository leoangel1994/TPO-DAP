import {Screens} from '../../navigation/RootNavigator';

interface FoodieError {
  errorCode: string;
  errorMessage: string;
  nextScreen: string;
}

export const ErrorNavigate = (navigation: any, error: FoodieError) => {
  navigation.navigate(Screens.ErrorScreen, error);
};

// ERROR CODE LIST

export const ERROR_PROFILE_IMAGE_LOAD: FoodieError = {
  errorCode: '10',
  errorMessage: 'Error al cargar imagen',
  nextScreen: Screens.Profile,
};
