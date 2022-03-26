import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class Request {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }
}

export default Request;
