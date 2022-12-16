import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { SITE_URL } from "lib/constants";
import { Message } from "types/message";

export type HttpError = {
  response: {
    data: Message,
    status: number
  }
}

const newAixos = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

// refreshToken을 쿠키로 전달 위함
newAixos.defaults.baseURL = SITE_URL;
newAixos.defaults.withCredentials = true;

const handleResponse = (error: AxiosError) => {
  return Promise.reject(error.response);
  // if ([401, 403].includes(error.response.status)) {
  //   authApi.logout();
  // }

  // return Promise.reject(error.response.data.message);
};

const get = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> => {
  return newAixos
    .get(url, config)
    .then((response) => {
      return response.data;
    })
    .catch(handleResponse);
};

const post = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>): Promise<R> => {
  return newAixos
    .post(url, data, config)
    .then((response) => {
      return response.data;
    })
    .catch(handleResponse);
};

const put = <T = any, R = AxiosResponse<T>, D = any>(
  url: string, 
  data?: D,
  config?: AxiosRequestConfig<D>): Promise<R> => {
  return newAixos
    .put(url, data, config)
    .then((response) => {
      return response.data;
    })
    .catch(handleResponse)
};

const del = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> => {
  return newAixos
    .delete(url, config)
    .then((response) => {
      return response.data;
    })
    .catch(handleResponse)
}

export const setAuthorization = (accessToken: string) => {
  newAixos.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

const http = {
  get,
  post,
  put,
  del
}

export default http;