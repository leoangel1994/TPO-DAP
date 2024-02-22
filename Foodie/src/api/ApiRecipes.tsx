import {get, post, put, deleteResource} from "./ApiManager";

export const getRecipeById = async (recipeId: string) => 
    await get("/recipes/"+recipeId)
            .catch((error) => { console.error("Error: ", error) });

export const getRecipesForLoggedUser = async () =>
    await get('/users/recipes')
        .catch((error) => { console.error("Error: ", error) });

export const getRecipesForCarousel = async () =>
    await get('/recipes/carousel')
        .catch((error) => { console.error("Error: ", error) });

export const postRecipe = async (recipe: any) =>
    await post('/recipes', recipe)
        .catch((error) => { console.error("Error: ", error) });

export const putRecipe = async (recipeId: string, recipe: any) =>
    await put('/recipes/'+recipeId, recipe)
        .catch((error) => { console.error("Error: ", error) });

export const deleteRecipeById = async (recipeId: string) =>
    await deleteResource('/recipes/'+recipeId)
        .catch((error) => { console.error("Error: ", error) });

export const postRecipeRating = async (recipeId: string, rateData: any) =>
    await post('/recipes/'+recipeId+'/rating', rateData)
        .catch((error) => { console.error("Error: ", error) });

export const getRecipesByFilters = async (tags: string[], text: string) => 
{
    let params = {
        tags: tags.join(","),
        search: text
    };
    try {
        return await get('/recipes', params);
    }
    catch (error){
        console.log("Error: ", error);
    }
}
   