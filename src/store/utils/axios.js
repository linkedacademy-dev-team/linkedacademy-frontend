import axios from "axios";
import state from "../state";
const encoded = btoa(`${state.userToken}:${state.passToken}`);

const http = axios.create({
  baseURL: state.url_linked_academy,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInterceptor = (config) => {
  config.headers.Authorization = "Basic " + encoded;
  return config;
};

http.interceptors.request.use(authInterceptor);

const tokenInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${state.authToken}`;
  return config;
};

export const privateHttp = axios.create({
  baseURL: state.url_linked_academy,
  headers: {
    "Content-Type": "application/json",
  },
});

privateHttp.interceptors.request.use(tokenInterceptor);

export default http;
