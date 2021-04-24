import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/utils";

// const host = "http://sounding.r7tec.com:18082";
const host = import.meta.env.VITE_HOST;
// const IS_DEV = ["development", "dev"].includes(process.env.NODE_ENV);
const IS_MOCK = true; // 切换假数据开关

const request = axios.create({
  baseURL: host,
  timeout: 10 * 1000,
});
request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    ElMessage({
      type: "error",
      message: err.message,
      duration: 3000,
    });
    return Promise.reject(err);
  }
);

export function getSystemMode() {
  const url = `/api/environment/getSystemMode`;
  return IS_MOCK
    ? Promise.resolve({ SystemMode: "INITIALIZING" })
    : request.get(url, { params: { token: getToken() } });
}

export function setSystemMode(value) {
  const url = `/api/environment/setSystemMode`;
  return IS_MOCK
    ? Promise.resolve({ setSystemMode: true })
    : request.get(url, {
        params: {
          token: getToken(),
          ModeName: value,
        },
      });
}
