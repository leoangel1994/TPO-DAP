import ApiManager from './ApiManager';
import {getUserSession} from './ApiManager';
import mime from 'mime';

async function post(url: string, data: any) {
  let apiManager = await ApiManager();
  let session: any = await getUserSession();
  let accessToken = 'Bearer ' + session.accessToken;
  const result = await apiManager.post(url, data, {
    headers: {
      Authorization: accessToken,
      ResponseType: 'json',
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log();
  return result.data;
}

const imgForm = async (recipeId: string, images: string[]) => {
  let imgData: FormData = new FormData();
  images.forEach((img: string) => {
    const newImageUri = 'file:///' + img.split('file:/').join('');
    imgData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
  });
  return imgData;
};

export const postRecipeImages = async (recipeId: string, images: string[]) => {
  images.forEach(async (img: string) => {
    console.log('imgasdasda', img);
    let imgData = await imgForm(recipeId, [img]);
    return await post('/recipes/' + recipeId + '/image', imgData);  }
)};

export const postProfileImages = async (recipeId: string, images: string[]) => {
  let imgData = await imgForm(recipeId, images);
  return await post('/users/image', imgData);
};
