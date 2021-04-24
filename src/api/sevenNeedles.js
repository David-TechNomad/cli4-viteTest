import axios from "axios";
import { getToken } from "../utils/utils";
import { ElMessage } from "element-plus";

// const host = process.env.VUE_APP_HOST;
const host = import.meta.env.VITE_HOST;

// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
// 切换假数据开关
const IS_MOCK = true;

const request = axios.create({
  baseURL: host,
  timeout: 10000,
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    ElMessage({
      type: "error",
      message: error.message,
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

/**
 * 激活探空仪
 * @description /api/sevenPin/powerOn
 * @returns 返回值:{"powerOn":true}
 */
export function powerOn() {
  const url = `/api/sevenPin/powerOn`;
  return IS_MOCK
    ? Promise.resolve({ powerOn: true })
    : request.get(url, { params: { token: getToken() } });
}

/**
 * 关闭探空仪
 * @description /api/sevenPin/powerOff
 * @returns 返回值:{"powerOff":true}
 */
export function powerOff() {
  const url = `/api/sevenPin/powerOff`;
  return IS_MOCK
    ? Promise.resolve({ powerOff: true })
    : request.get(url, { params: { token: getToken() } });
}

/**
 * 获取探空仪频点
 * @description /api/sevenPin/getSondeFreq
 * @returns 返回值:{"SondeFreq":403.452}
 */
export function getSondeFreq() {
  const url = `/api/sevenPin/getSondeFreq`;
  return IS_MOCK
    ? Promise.resolve({ SondeFreq: 403.452 })
    : request.get(url, { params: { token: getToken() } });
}

/**
 * 获取探空仪id
 * @description /api/sevenPin/getSondeId
 * @returns 返回值:{"SondeId":"2983472397434"}
 */
export function getSondeId() {
  const url = `/api/sevenPin/getSondeId`;
  return IS_MOCK
    ? Promise.resolve({ SondeId: "2983472397434" })
    : request.get(url, { params: { token: getToken() } });
}

/**
 * 设置探空仪频点
 * @param {number|string} sondeFreq 探空仪频点
 * @returns 返回值:{"setSondeFreq":true}
 */
export function setSondeFreq(sondeFreq) {
  const url = `/api/sevenPin/setSondeFreq`;
  return IS_MOCK
    ? Promise.resolve({ setSondeFreq: true })
    : request.get(url, {
        params: {
          token: getToken(),
          sondeFreq,
        },
      });
}

/**
 * 获取探空仪功率
 */
export function getSondePower() {
  const url = `/api/sevenPin/getSondePower`;
  return IS_MOCK ? Promise.resolve({ sondePower: 123 }) : request.get(url);
}
