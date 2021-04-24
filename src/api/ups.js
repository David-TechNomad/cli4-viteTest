import axios from "axios";
import { getToken } from "../utils/utils";

import upsData from "../data/ups.js";

// const host = process.env.VUE_APP_HOST;
const host = import.meta.env.VITE_HOST;
let IS_MOCK = true;
const request = axios.create({
  timeout: 10 * 1000,
  baseURL: host,
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export function getPowerParam() {
  const url = `/api/power/getPowerParam?token=${getToken()}`;
  return IS_MOCK ? Promise.resolve(upsData.data) : request.get(url);
}

export function getPowerStatus() {
  const url = `/api/power/getPowerStatus?token=${getToken()}`;
  return IS_MOCK ? Promise.resolve(upsData.state) : request.get(url);
}

export function powerOn(powerType) {
  const url = `/api/power/powerOn?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ powerOn: true })
    : request.get(url, {
        params: {
          powerType,
        },
      });
}

export function powerOff(powerType) {
  const url = `/api/power/powerOff?token=${getToken()}`;
  return IS_MOCK
    ? Promise.resolve({ powerOff: true })
    : request.get(url, {
        params: {
          powerType,
        },
      });
}
