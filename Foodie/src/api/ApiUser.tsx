import {get, post, put, deleteResource} from "./ApiManager";

export const getUser = async () =>
    await get("/users/")
            .catch((error) => { console.error("Error: ", error) });

export const getUserById = async (profileId: string) => 
    await get("/users/"+profileId)
        .catch((error) => { console.error("Error: ", error) });

export const putUser = async (userData: any) =>
    await put('/users/', userData)
        .catch((error) => { console.error("Error: ", error) });

export const deleteUser = async () =>
    await deleteResource('/users/')
        .catch((error) => { console.error("Error: ", error) });