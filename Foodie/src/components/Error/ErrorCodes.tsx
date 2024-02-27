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
  errorMessage: 'Error al cargar el carrousel.',
  nextScreen: Screens.Login,
};

export const ERROR_MY_RECIPES_GET: FoodieError = {
  errorCode: '2',
  errorMessage: 'Error al obtener tus recetas.',
  nextScreen: Screens.Profile,
};

export const ERROR_USER_DATA_GET: FoodieError = {
  errorCode: '3',
  errorMessage: 'Error al obtener tus datos de usuario.',
  nextScreen: Screens.Landing,
};

export const ERROR_PROFILE_IMAGE_OPEN_GALLERY: FoodieError = {
  errorCode: '4',
  errorMessage: 'Error al intentar cargar la imagen de tu galería.',
  nextScreen: Screens.Profile,
};

export const ERROR_PROFILE_IMAGE_POST: FoodieError = {
  errorCode: '5',
  errorMessage: 'Error al intentar actualizar tu imagen de perfil.',
  nextScreen: Screens.Profile,
};

export const ERROR_PROFILE_USER_PUT: FoodieError = {
  errorCode: '6',
  errorMessage: 'Error al intentar actualizar tus datos de usuario.',
  nextScreen: Screens.Profile,
};

export const ERROR_FAVORITES_GET: FoodieError = {
  errorCode: '7',
  errorMessage: 'Error al obtener tus recetas favoritas.',
  nextScreen: Screens.Landing,
};

export const ERROR_RECIPE_POST: FoodieError = {
  errorCode: '8',
  errorMessage: 'Error al crear receta, intentá nuevamente más tarde.',
  nextScreen: Screens.Landing,
};

export const ERROR_SHARE: FoodieError = {
  errorCode: '9',
  errorMessage: 'Error al intentar compartir la receta.',
  nextScreen: Screens.Landing,
};

export const ERROR_SEARCH_GET: FoodieError = {
  errorCode: '10',
  errorMessage: 'Error al intentar buscar recetas.',
  nextScreen: Screens.Landing,
};

export const ERROR_RECIPE_DETAIL_GET: FoodieError = {
  errorCode: '11',
  errorMessage: 'Error al obtener detalle de la receta',
  nextScreen: Screens.Landing,
};

export const ERROR_RECIPE_IMAGE_POST: FoodieError = {
  errorCode: '12',
  errorMessage: 'Error al intentar subir la imagen de la receta.',
  nextScreen: Screens.Landing,
};

export const ERROR_RECIPE_PUT: FoodieError = {
  errorCode: '13',
  errorMessage: 'Error al actualizar receta, intentá nuevamente más tarde.',
  nextScreen: Screens.Landing,
};

export const ERROR_RECIPE_IMAGE_POST_2: FoodieError = {
  errorCode: '14',
  errorMessage: 'Error al intentar cambiar una imagen de la receta.',
  nextScreen: Screens.Profile,
};

export const ERROR_GET_USER_IN_RECIPE_DETAILS: FoodieError = {
  errorCode: '15',
  errorMessage: 'Error al obtener datos de tu usuario',
  nextScreen: Screens.Profile,
};