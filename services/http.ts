import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
    .catch((error) => {
      throw new Error(error);
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
    .catch((error) => {
      throw new Error(error);
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
    .catch((error) => {
      throw new Error(error);
    })
}

const http = {
  get,
  post,
  put
}

export default http;