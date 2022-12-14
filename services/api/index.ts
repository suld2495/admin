import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SITE_URL } from "lib/constants";
import { Message } from "types/message";

type HttpError = {
  response: {
    data: Message
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

const get = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> => {
  return newAixos
    .get(url, config)
    .then((response) => {
      return response.data;
    })
    .catch((error: HttpError) => {
      throw new Error(error.response.data.message);
    });
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
    .catch((error: HttpError) => {
      throw new Error(error.response.data.message);
    });
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
    .catch((error: HttpError) => {
      throw new Error(error.response.data.message);
    })
};

const delete = () => {

}

export const setAuthorization = (accessToken: string) => {
  newAixos.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

const http = {
  get,
  post,
  put
}

export default http;