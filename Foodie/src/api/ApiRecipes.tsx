import ApiManager from "./ApiManager";
import {getUserSession} from "./ApiUser";

async function getBearerToken(){
    try 
    {
        let session: any = await getUserSession();
        return 'Bearer ' + session.accessToken;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

async function get(url: string, params: any = {}) 
{
    try 
    {
        let accessToken = await getBearerToken();
        const result = await ApiManager.get(url,{
            headers: {
                Authorization: accessToken, 
                ResponseType: "json",
                CacheControl: "no-cache"
            },
            params
        });
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

async function post(url: string, data: any) 
{
    try 
    {
        let accessToken = await getBearerToken();
        const result = await ApiManager.post(url,data,{
        headers: {
            Authorization: accessToken, 
            ResponseType: "json"},
          }
        );
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

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

export const getRecipesByFilters = async (tags: string[], text: string) => 
{
    let params = {
        tags: tags.join(","),
        search: text
    };
    try{
        return await get('/recipes', params);
    }
    catch (error){
        console.log("Error: ", error);
    }
}
   