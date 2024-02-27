import {get, post, put, deleteResource} from './ApiManager';

export const getUser = async () => await get('/users/');

export const getUserById = async (profileId: string) =>
  await get('/users/profile/' + profileId);

export const putUser = async (userData: any) => await put('/users/', userData);

export const deleteUser = async () => await deleteResource('/users/');

export const getUserFavourites = async () => await get("/users/favourites/");

export const postUserFavourite = async (recipeId: string) => 
    await post('/users/favourites/' + recipeId, {});

export const deleteUserFavourite = async (recipeId: string) =>
    await deleteResource('/users/favourites/' + recipeId);
