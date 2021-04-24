import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "../utils/utils";

// const host = process.env.VUE_APP_HOST;
const host = import.meta.env.VITE_HOST;
console.log("🚀 ~ file: index.js ~ host", host);
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

// /api/history/getTkyInfo?startTime=2020-11-11 12:23:23&endTime=2020-11-19 23:00:15
/**
 * 根据放球时间获取探空仪id列表
 * @param {string} st 开始时间
 * @param {string} et 结束时间
 * @returns [{探空仪id: '123123'}]
 */
export const getTkyInfoByFQTime = async (st, et) => {
  const token = getToken();
  const url = `/api/history/getTkyInfo`;
  if (!IS_MOCK) {
    return request.get(url, { params: { token, startTime: st, endTime: et } });
  }
  const tkyinfo = await import("../data/tkyinfo.js");
  return Promise.resolve(tkyinfo.default.data);
};
/**
 * 根据基测时间获取探空仪id列表
 * @param {string} st 开始时间
 * @param {string} et 结束时间
 */
export async function getTkyInfoByJCTime(st, et) {
  const token = getToken();
  const url = "/api/history/getTkyInfoByJCTime";
  if (!IS_MOCK) {
    return request.get(url, { params: { token, startTime: st, endTime: et } });
  }
  const result = await import("../data/tkyidarr");
  return Promise.resolve(result.tkyidarr);
}
/**
 * 根据检测时间获取探空仪id列表
 * @param {string} st 开始时间
 * @param {string} et 结束时间
 */
export async function getTkyInfoByCheckTime(st, et) {
  const token = getToken();
  const url = "/api/history/getTkyInfoByCheckTime";
  if (!IS_MOCK) {
    return request.get(url, { params: { token, startTime: st, endTime: et } });
  }
  const result = await import("../data/tkyidarr.js");
  return Promise.resolve(result.tkyidarr);
}

/**
 * 获取检测报告
 * @param {string} tkyid 探空仪id
 * @returns {Promise} Promise
 */
export function getCheckReport(tkyid) {
  const token = getToken();
  const url = "/api/history/getCheckReport";
  return IS_MOCK
    ? Promise.resolve({
        tkyid: "20707999",
        envPressure: 1011.983495088971039876923896372318267822265625,
        envTemperature: 19.4,
        envHumidity: 25.3,
        envLng: 116.4700887,
        envLat: 39.8065693,
        envAlt: 35.7,
        tkyPressure: 1014.51600000000007639755494892597198486328125,
        tkyTemperature: 16.4200000000000017053025658242404460906982421875,
        tkyHumidity: 36.34080000000000154614099301397800445556640625,
        tkyLng: 116.470001220703125,
        tkyLat: 39.80658676147461250138803734444081783294677734375,
        tkyAlt: 35.34400000000000119371179607696831226348876953125,
        diffPressure: 2.532504911029036520631052553653717041015625,
        diffTemperature: -2.9799999999999982946974341757595539093017578125,
        diffHumidity: 11.04080000000000154614099301397800445556640625,
        diffLng: -0.000087479296875,
        diffLat: 0.00001746147461250138803734444081783294677734375,
        diffAlt: -0.35599999999999880628820392303168773651123046875,
        passedPressure: true,
        passedTemperature: true,
        passedHumidity: false,
        passedLng: true,
        passedLat: true,
        passedAlt: true,
        passedBatteryVol: null,
        passedLocating: null,
        passedRssi: null,
        passed: false,
        ctime: null,
      })
    : request.get(url, {
        params: {
          token,
          tkyid,
        },
      });
}

// /api/history/getBaseTestReport?tkyid=11
/**
 * 获取基测报告
 * @param {string} tkyid 探空仪id
 * @returns
 */
export const getBaseTestReport = async (tkyid) => {
  console.log("tkyid: ", tkyid);
  const token = getToken();
  const url = `/api/history/getBaseTestReport`;
  if (!IS_MOCK) {
    return request.get(url, { params: { token, tkyid } });
  }
  const baseTestReport = await import("../data/baseTestReport");
  return Promise.resolve(baseTestReport.default.data);
};

// /api/history/getInstantInfo?tkyid=11
/**
 * 瞬时值
 * @param {string} tkyid 探空仪id
 * @returns
 */
export const getInstantInfo = async (tkyid) => {
  console.log("tkyid: ", tkyid);
  const url = `/api/history/getInstantInfo`;
  const token = getToken();
  if (!IS_MOCK) {
    return request.get(url, { params: { token, tkyid } });
  }
  const instantInfo = await import("../data/instantInfo.js");
  return Promise.resolve(instantInfo.default.data);
};

// /api/history/getTkyData?
// tkyid=00230067&startTime=2020-11-18 02:23:23&endTime=2020-11-20 18:00:15&pageSize=10&pageNumber=1
/**
 * 获取探空仪数据
 * @param {object} param 参数对象
 * @param {object} param.tkyid 探空仪id
 * @param {object} param.startTime 开始时间
 * @param {object} param.endTime 结束时间
 * @param {object} param.pageSize 每页条数
 * @param {object} param.pageNumber 页数
 * @returns
 */
export const getTkyData = async ({
  tkyid,
  startTime,
  endTime,
  pageSize,
  pageNumber,
}) => {
  console.log(tkyid, startTime, endTime, pageSize, pageNumber);
  const url = `/api/history/getTkyData`;
  const token = getToken();
  if (!IS_MOCK) {
    return request.get(url, {
      params: {
        token,
        tkyid,
        startTime,
        endTime,
        pageSize,
        pageNumber,
      },
    });
  }
  const tkyData = await import("../data/tkyData.js");
  return Promise.resolve(tkyData.default.data);
};

export async function getWarningAlarmLevel() {
  let url = `/api/history/getWarningAlarmLevel`;
  if (!IS_MOCK) {
    return request.get(url, { params: { token: getToken() } });
  }
  const levels = await import("../data/levels.js");
  return Promise.resolve(levels.default.data);
}

export async function getWarningAlarmComponent() {
  const url = `/api/history/getWarningAlarmComponent`;
  if (!IS_MOCK) {
    return request.get(url, { params: { token: getToken() } });
  }
  const types = await import("../data/types.js");
  return Promise.resolve(types.default.data);
}

// /api/history/getActiveWarningMessage
export async function getActiveWarningMessage() {
  const url = `/api/history/getActiveWarningMessage`;
  if (!IS_MOCK) {
    return request.get(url, { params: { token: getToken() } });
  }
  const activeWarningMessage = await import("../data/activeWarningMessage");
  return Promise.resolve(activeWarningMessage.default.data);
}

// /api/history/getWarningMessage
// ?typeCode=2&startTime=2020-11-10 12:23:23&endTime=2020-11-27 23:00:15&pageSize=10&pageNumber=1&level=2
export async function getWarningMessage({
  startTime,
  endTime,
  level,
  typeCode,
  pageNumber,
  pageSize,
}) {
  console.log(startTime, endTime, level, typeCode, pageNumber, pageSize);
  const url = `/api/history/getWarningMessage`;
  if (!IS_MOCK) {
    return request.get(url, {
      params: {
        token: getToken(),
        startTime,
        endTime,
        level,
        typeCode,
        pageNumber,
        pageSize,
      },
    });
  }
  const warningMessage = await import("../data/warningMessage");
  return Promise.resolve(warningMessage.default.data);
}
/**
 * 告警确认
 * @description /api/environment/ackAlarm?id=1
 * @param {string|number} id Id数据  在告警信息里有
 * @returns {object} {"ackAlarm":true}是否成功
 */
export function ackAlarm(id) {
  const url = `/api/environment/ackAlarm`;
  return IS_MOCK
    ? Promise.resolve({ ackAlarm: true })
    : request.get(url, {
        params: {
          token: getToken(),
          id,
        },
      });
}

/**
 * 报警级别字典
 */
export const levelsDict = {
  INFO: { number: "等级 0", text: "运行信息", key: "INFO" },
  SLIGHT: { number: "等级 1", text: "轻微", key: "SLIGHT" },
  GENERAL: { number: "等级 2", text: "一般", key: "GENERAL" },
  SERIOUS: { number: "等级 3", text: "严重", key: "SERIOUS" },
  VERY_SERIOUS: { number: "等级 4", text: "非常严重", key: "VERY_SERIOUS" },
};
/**
 * 报警源名字字典
 */
export const componentNameDict = {
  SYSTEM: { text: "自动探空系统", key: "SYSTEM" },
  RECEIVER: { text: "接收机", key: "RECEIVER" },
  JCX: { text: "基测箱", key: "JCX" },
  AWS: { text: "自动气象站", key: "AWS" },
  GPS: { text: "GPS", key: "GPS" },
  P7: { text: "七针激活装置", key: "P7" },
  POWER_CONTROL: { text: "电源管理模块", key: "POWER_CONTROL" },
  GAS_CHARGING: { text: "充气系统", key: "GAS_CHARGING" },
  GAS_CHECHING: { text: "环境检测系统", key: "GAS_CHECHING" },
  GAS_CHECHING_SHELTER: {
    text: "环境检测系统-放舱",
    key: "GAS_CHECHING_SHELTER",
  },
  GAS_CHECHING_GAS_ROOM: {
    text: "环境检测系统-氢气房",
    key: "GAS_CHECHING_GAS_ROOM",
  },
  GAS_CHECHING_VALVE: { text: "环境检测系统-阀门", key: "GAS_CHECHING_VALVE" },
};

/**
 * 保留几位小数的字典
 */
export const toFixedPropertyDict = {
  // 探测数据
  freqz: 2,
  lng: 2,
  lat: 2,
  nspeed: 2,
  espeed: 2,
  vspeed: 2,
  batteryVol: 2,
  altitude: 1,
  temperature: 1,
  boxTemperature: 1,
  humidity: 0,
  pressure: 0,
  satellitesNum: 0,
  // 检测报告
  envPressure: 0,
  envTemperature: 1,
  envHumidity: 0,
  envLng: 2,
  envLat: 2,
  envAlt: 1,
  tkyPressure: 0,
  tkyTemperature: 1,
  tkyHumidity: 0,
  tkyLng: 2,
  tkyLat: 2,
  tkyAlt: 1,
  // 基测报告
  jcxPressure: 0,
  jcxTemperature: 1,
  jcxHumidity: 0,
  tkyPressure: 0,
  tkyTemperature: 1,
  tkyHumidity: 0,
  // 瞬时值
  pressure: 0,
  temperature: 1,
  humidity: 0,
  windSpeed: 2,
};
