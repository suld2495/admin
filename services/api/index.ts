import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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

const get = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> => {
  return newAixos
    .get(url, config)
    .then((response) => {
      return response.data;
    })
    .catch((error: HttpError) => {
      throw new Error(error.response.data.code);
    });
}

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
      throw new Error(error.response.data.code);
    });
}

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
      throw new Error(error.response.data.code);
    })
}

const http = {
  get,
  post,
  put
}

export default http;