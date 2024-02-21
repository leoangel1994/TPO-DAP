import ApiManager from "./ApiManager";
import EncryptedStorage from 'react-native-encrypted-storage';

export const userLogin = async (idToken: string) => {
    try 
    {
        const result = await ApiManager.post("/users/login",{},{
        headers: { 
            Authorization: 'Bearer ' + idToken, 
            ResponseType: "json"},
          }
        );
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
};

export async function storeUserSession(accessToken :string, refreshToken: string) {
    let result = await ApiManager.get('/users',
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        } 
      });

    let session = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: result.data.userName,
        profileId: result.data.profileId,
    };
    try {
        await EncryptedStorage.setItem(
            'user_session',
            JSON.stringify(session),
        );
        return session;
    } catch (error) {
         console.error('Error: ', error); 
    }
  }

export const getUserSession = async () => {
    try {
        const session = await EncryptedStorage.getItem('user_session');
        if (session !== undefined) {
            const parsedSession = JSON.parse(session?.toString() ?? '');
            return parsedSession;
        }
    } catch (error) {
        console.log(error);
    }
}
