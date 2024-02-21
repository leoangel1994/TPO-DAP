import axios from "axios";

const ApiManager = axios.create({
    baseURL: "http://15.228.167.207:3000",
    responseType: "json",
    withCredentials: true
});

export default ApiManager;