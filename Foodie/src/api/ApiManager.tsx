import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import base64 from 'react-native-base64';
global.atob = base64.decode;
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const baseUrl = 'http://15.228.167.207:3000';
const ApiManager = async () => {
  let session = await getUserSession();
  let accessToken = session?.accessToken ?? '';

  let axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {Authorization: `Bearer ${accessToken}`, CacheControl: 'no-cache'},
    responseType: 'json',
    timeout: 5000,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(async req => {
    const decodedToken: any = jwtDecode(accessToken);
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(`${baseUrl}/users/refreshToken/`, {
      refreshToken: session.refreshToken,
    });

    session.accessToken = response.data.accessToken;
    await EncryptedStorage.setItem('user_session', JSON.stringify(session));
    req.headers.Authorization = `Bearer ${session.accessToken}`;

    return req;
  });

  return axiosInstance;
};

const getUserSession = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session !== undefined) {
    const parsedSession = JSON.parse(session?.toString() ?? '');
    return parsedSession;
  }
};

const userLogin = async (idToken: string) => {
  const result = await axios.post(
    `${baseUrl}/users/login`,
    {},
    {
      headers: {Authorization: 'Bearer ' + idToken},
    },
  );
  return result.data;
};

const userLogout = async () => {
  let apiManager = await ApiManager();
  const result = await apiManager.post(`${baseUrl}/users/logout`, {});
  if (result.status === 204) {
    await EncryptedStorage.removeItem('user_session');
    await GoogleSignin.signOut();
    return true;
  }
  return result.data;
};

const storeUserSession = async (accessToken: string, refreshToken: string) => {
  let result = await axios.get(`${baseUrl}/users`, {
    headers: {Authorization: 'Bearer ' + accessToken},
  });
  let session = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    username: result.data.userName,
    profileId: result.data.profileId,
  };
  await EncryptedStorage.setItem('user_session', JSON.stringify(session));
  return session;
};

const get = async (url: string, params: any = {}) => {
  let apiManager = await ApiManager();
  const result = await apiManager.get(url, {params});
  return result.data;
};

const post = async (url: string, data: any) => {
  let apiManager = await ApiManager();
  const result = await apiManager.post(url, data);
  return result.data;
};

const put = async (url: string, data: any) => {
  let apiManager = await ApiManager();
  const result = await apiManager.put(url, data);
  return result.data;
};

const deleteResource = async (url: string) => {
  let apiManager = await ApiManager();
  const result = await apiManager.delete(url);
  return result.data;
};

export default ApiManager;
export {getUserSession};
export {storeUserSession};
export {userLogin, userLogout};
export {get, post, put, deleteResource};
