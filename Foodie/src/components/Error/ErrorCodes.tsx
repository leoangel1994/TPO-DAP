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

export const ERROR_CARROUSEL_GET: FoodieError = {
  errorCode: '1',
  errorMessage: 'Error al cargar el carrousel',
  nextScreen: Screens.Login,
};

export const ERROR_MY_RECIPES_GET: FoodieError = {
  errorCode: '2',
  errorMessage: 'Error al obtener recetas del usuario',
  nextScreen: Screens.Profile,
};

export const ERROR_USER_DATA_GET: FoodieError = {
  errorCode: '3',
  errorMessage: 'Error al obtener datos del usuario',
  nextScreen: Screens.Profile,
};

export const ERROR_PROFILE_IMAGE_OPEN_GALLERY: FoodieError = {
  errorCode: '4',
  errorMessage: 'Error al cargar imagen',
  nextScreen: Screens.Profile,
};

export const ERROR_PROFILE_IMAGE_POST: FoodieError = {
  errorCode: '5',
  errorMessage: 'Error al actualizar imagen del usuario',
  nextScreen: Screens.Profile,
};

export const ERROR_PROFILE_USER_PUT: FoodieError = {
  errorCode: '6',
  errorMessage: 'Error al actualizar datos del usuario',
  nextScreen: Screens.Profile,
};

export const ERROR_FAVORITES_GET: FoodieError = {
  errorCode: '7',
  errorMessage: 'Error al obtener recetas del usuario',
  nextScreen: Screens.Profile,
};

export const ERROR_RECETA_POST: FoodieError = {
  errorCode: '8',
  errorMessage: 'Error al crear receta, intente nuevamente',
  nextScreen: Screens.Landing,
};

export const ERROR_SHARE: FoodieError = {
  errorCode: '9',
  errorMessage: 'Error al intentar compartir la receta',
  nextScreen: Screens.Landing,
};

export const ERROR_SEARCH_GET: FoodieError = {
  errorCode: '10',
  errorMessage: 'Error al buscar recetas',
  nextScreen: Screens.Landing,
};

export const ERROR_RECIPE_DETAIL_GET: FoodieError = {
  errorCode: '11',
  errorMessage: 'Error al obtener detalle de la receta',
  nextScreen: Screens.Landing,
};
