import {get, post, put, deleteResource} from './ApiManager';

export const getRecipeById = async (recipeId: string) =>
  await get('/recipes/' + recipeId);

export const getRecipesForLoggedUser = async () => await get('/users/recipes');

export const getRecipesForCarousel = async () => await get('/recipes/carousel');

export const postRecipe = async (recipe: any) => await post('/recipes', recipe);

export const putRecipe = async (recipeId: string, recipe: any) =>
  await put('/recipes/' + recipeId, recipe);

export const deleteRecipeById = async (recipeId: string) =>
  await deleteResource('/recipes/' + recipeId);

export const postRecipeRating = async (recipeId: string, rateData: any) =>
  await post('/recipes/' + recipeId + '/rating', rateData);

export const getRecipesByFilters = async (tags: string[], text: string) => {
  let params = {
    tags: tags.join(','),
    search: text,
  };
  return await get('/recipes', params);
};
