// /api/environment/getReleaseStep

import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/utils";

// const host = process.env.VUE_APP_HOST;
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

export function getReleaseStep() {
  const url = `/api/environment/getReleaseStep`;
  return IS_MOCK
    ? Promise.resolve({ ReleaseStep: "SOUNDING_TERMINATED" })
    : request.get(url, { params: { token: getToken() } });
}

export function resetReleaseStep() {
  const url = `/api/environment/resetReleaseStep`;
  return IS_MOCK
    ? Promise.resolve({ resetReleaseStep: true })
    : request.get(url, { params: { token: getToken() } });
}
