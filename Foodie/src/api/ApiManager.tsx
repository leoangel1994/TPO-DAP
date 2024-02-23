import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import  base64   from "react-native-base64";
global.atob = base64.decode;
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const baseUrl = "http://15.228.167.207:3000";
const ApiManager = async () => {
    let session = await getUserSession();
    let accessToken = session?.accessToken ?? '';

    let axiosInstance = axios.create({
        baseURL: baseUrl,
        headers:{Authorization: `Bearer ${accessToken}`, CacheControl: "no-cache"},
        responseType: "json",
        timeout: 5000,
        withCredentials: true,
        
    });

    axiosInstance.interceptors.request.use(async req => {
        const decodedToken :any = jwtDecode(accessToken);
        const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
        if(!isExpired) return req
        
        try {       
            const response = await axios.post(`${baseUrl}/users/refreshToken/`, {
                refreshToken: session.refreshToken
            });
            
            session.accessToken = response.data.accessToken;
            await EncryptedStorage.setItem(
                'user_session',
                JSON.stringify(session),
            );    
            req.headers.Authorization = `Bearer ${session.accessToken}`;
        } 
        catch (error) { console.log(error); }
        
        return req
    })

    return axiosInstance;
}

const getUserSession = async () => {
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

const userLogin = async (idToken: string) => {
    try 
    {
        const result = await axios.post(`${baseUrl}/users/login`,{},
        {
            headers: { Authorization: 'Bearer ' + idToken } 
        });
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
};

const userLogout = async () => {
    try 
    {
        let apiManager = await ApiManager();
        const result = await apiManager.post(`${baseUrl}/users/logout`,{});
        if (result.status === 204) {
            await EncryptedStorage.removeItem('user_session');
            await GoogleSignin.signOut();                
            return true;
        }
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
};

const storeUserSession = async(accessToken :string, refreshToken: string) => {
    let result = await axios.get(`${baseUrl}/users`,
      {
        headers: { 'Authorization': 'Bearer ' + accessToken } 
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

const get = async (url: string, params: any = {}) => 
{
    try 
    {
        let apiManager = await ApiManager();
        const result = await apiManager.get(url,{params});
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

const post = async (url: string, data: any) =>
{
    try 
    {
        let apiManager = await ApiManager();
        const result = await apiManager.post(url,data);
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

const put = async (url: string, data: any) =>
{
    try 
    {
        let apiManager = await ApiManager();
        const result = await apiManager.put(url,data);
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

const deleteResource = async (url: string) =>
{
    try 
    {
        let apiManager = await ApiManager();
        const result = await apiManager.delete(url);
        return result.data;
    }catch (error) 
    {
        console.error("Error: ", error);
    }
}

export default ApiManager;
export {getUserSession};
export {storeUserSession};
export {userLogin, userLogout};
export {get, post, put, deleteResource};
