// /api/CheckSurvey/getCheckSurveyCriteion?token=123
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

export const paramsDict = {
  mustBeJcTky: "是否需要基测",
  resetTkyFreq: "重置探空仪频点",
  poweronMaxTime: "上电最大时间（秒）",
  checkWaitTime: "检查时长（秒）",
  retryTimes: "重试时间（秒）",
  diffPressure: "压力差（hPa）",
  diffTemperature: "温度差（℃）",
  diffHumidity: "湿度差（%）",
  diffLng: "经度差（度）",
  diffLat: "纬度差（度）",
  diffAlt: "海拔差（米）",
};
export function getCheckSurveyCriteion() {
  let url = "/api/CheckSurvey/getCheckSurveyCriteion";
  const token = getToken();
  return IS_MOCK
    ? Promise.resolve({
        CheckSurveyCriteionInfo: {
          mustBeJcTky: false,
          resetTkyFreq: true,
          poweronMaxTime: 50,
          checkWaitTime: 180,
          retryTimes: 5,
          diffPressure: 50.0,
          diffTemperature: 5.0,
          diffHumidity: 10.0,
          diffLng: 0.2,
          diffLat: 0.2,
          diffAlt: 20.0,
          a: null,
          b: { a: 1 },
          c: [1, 2, 3],
        },
      })
    : request({
        url,
        method: "get",
        params: {
          token,
        },
      });
}

export function setCheckSurveyCriteion(params = {}) {
  const token = getToken();
  // /api/CheckSurvey/setCheckSurveyCriteion?token=123&mustBeJcTky=false&resetTkyFreq=true&poweronMaxTime=50&checkWaitTime=200&retryTimes=5&diffPressure=50&diffTemperature=5&diffHumidity=10&diffLng=0.2&diffLat=0.2&diffAlt=20
  let url = "/api/CheckSurvey/setCheckSurveyCriteion";
  return IS_MOCK
    ? Promise.resolve({ setCheckSurveyCriteion: true })
    : request.get(url, {
        params: {
          token,
          ...params,
        },
      });
}
