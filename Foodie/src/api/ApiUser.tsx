import {get, post, put, deleteResource} from './ApiManager';

export const getUser = async () => await get('/users/');

export const getUserById = async (profileId: string) =>
  await get('/users/profile/' + profileId);

export const putUser = async (userData: any) => await put('/users/', userData);

export const deleteUser = async () => await deleteResource('/users/');
