import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Network from "expo-network";

const GetIp = async () => {
  let ip = await Network.getIpAddressAsync();
  return ip
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
});

// const {userData, userNIN} = useData();

axiosInstance.interceptors.request.use(
  async function (config: any) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const REACT_APP_API_URL = "http://192.168.1.11:3000"; // FDP Local
export default class CommonDataService {
  executeApiCall(path, data) {
    console.log(`${REACT_APP_API_URL}${path}` + JSON.stringify(data));
    return axiosInstance
      .post(`${REACT_APP_API_URL}${path}`, data)
      .then((res) => res);
  }

  removeCall(path,) {
    return axiosInstance
      .delete(`${REACT_APP_API_URL}${path}`)
      .then((res) => res);
  }

  fetchData(path) {
    return axiosInstance.get(`${REACT_APP_API_URL}${path}`).then((res) => res);
  }

  fetchData_2(path, data) {
    return axiosInstance
    .get(`${REACT_APP_API_URL}${path}`,data)
    .then((res) => res);
  }
  fetchData_3(path, data) {
    return axiosInstance
    .get(`${REACT_APP_API_URL}${path}`,{ params: data })
    .then((res) => res);
  }
}
