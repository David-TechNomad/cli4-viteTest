import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/utils";

const IS_MOCK = true;
// const host = process.env.VUE_APP_HOST;
const host = import.meta.env.VITE_HOST;
const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
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

export const deviceEnableDict = {
  YSRP: "接收机",
  YBMB: "基测箱",
  YGPS: "GPS",
  YP7: "7针",
  YPM: "电源管理",
  YINF: "充气系统",
  YEMS: "环境检测系统（原氢气检测）",
  YAWS: "地面自动气象站",
};

/**
 * 获取全部设备使能状态
 */
export function getDeviceEnable() {
  let url = `/api/environment/getDeviceEnable`;
  const token = getToken();

  return IS_MOCK
    ? Promise.resolve([
        { YINF: true },
        { YP7: false },
        { YAWS: true },
        { YPM: false },
        { YBMB: true },
        { YGPS: true },
        { YEMS: true },
        { YSRP: false },
      ])
    : request.get(url, { params: { token } });
}

/**
 * 关闭对应设备使能
 * @param {object} param 参数对象
 * @param {string} param.token token
 * @param {string} param.Dtype Dtype
 */
export function closeDeviceEnable(param) {
  const token = getToken();
  let url = `/api/environment/closeDeviceEnable`;

  return IS_MOCK
    ? Promise.resolve({ closeDeviceEnable: true })
    : request.get(url, { params: { token, Dtype: param.Dtype } });
}

/**
 * 开启对应设备使能
 * @param {object} param 参数对象
 * @param {string} param.token token
 * @param {string} param.Dtype Dtype
 */
export function openDeviceEnable(param) {
  const token = getToken();
  let url = `/api/environment/openDeviceEnable`;
  return IS_MOCK
    ? Promise.resolve({ openDeviceEnable: true })
    : request.get(url, { params: { token, Dtype: param.Dtype } });
}
