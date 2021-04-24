export const envInfo = {
  id: null,
  deviceDiIdVersion: "YEMS_001_001",
  stationNumber: "",
  gasThickness1: 0, // 放球仓氢气1浓度（ppm）
  gasThickness2: 0, // 放球仓氢气2浓度（ppm）
  pipePressure: 0, // 氢气房总管道压力（kPa）
  smokeDetector1: 0, // 操作室烟雾报警器（ppm）
  smokeDetector2: 0, // 放球仓烟雾报警器。0正常1异常2报警
  status: 0, // 环境检测设备状态。0正常1异常2报警
  temperature: 21.300000000000000710542735760100185871124267578125, // 环境温度(精确到1度)
  humidity: 11.5, // 环境湿度(精确到个位数。既整数)
  waterLeakSensor: 0, // 操作室水进传感器。0正常1异常2进水
  roomGasThickness1: 0, // 氢气房氢气1浓度（ppm）
  roomGasThickness2: 0, // 氢气房氢气2浓度（ppm）
  roomPipePressure1: 0, // 氢气房支路1管道压力（bPa）
  roomPipePressure2: 0, // 氢气房支路2管道压力（bPa）
  roomSmokeDetector1: 0, // 氢气房烟雾报警器1（ppm）
  roomWaterLeakSensor: 0, // 氢气房进水传感器。0正常1异常2进水
  domeWindSpeed: null, // 仓顶秒风风速（m/s）
  domeWindDirection: null, // 仓顶秒风风向（度）
  alarmInfo: "branch1ValveStatus", // 报警信息(哪个要素出现报警哪个要素出现在列表中以空格分隔)
  // alarmInfo: null, // 报警信息(哪个要素出现报警哪个要素出现在列表中以空格分隔)
  branch1ValveStatus: 2, // 支路1阀门状态 3开4关2故障
  branch2ValveStatus: 4, // 支路2阀门状态 3开4关2故障
  mainValveStatus: 3, // 总阀门状态 3开4关2故障
  safetyValveStatus: 3, // 安全阀状态 3开4关2故障
  ctime: 1608798953203,
};

export const upsInfo = {
  id: 0,
  deviceDiIdVersion: "YPM_600_1",
  stationNumber: null,
  ua: 285450.25, // 三相相电压数据，单位V
  ub: 122.88, // 三相相电压数据，单位V
  uc: 122.88, // 三相相电压数据，单位V
  ia: 17.681, // 三相电流数据，单位A
  ib: 0.0, // 三相电流数据，单位A
  ic: 0.0, // 三相电流数据，单位A
  pt: 0.0, // 有功功率，单位W
  pa: 0.0, // 有功功率，单位W
  pb: 0.0, // 有功功率，单位W
  pc: 0.0, // 有功功率，单位W
  qt: 0.0, // 无功功率，单位war
  qa: 0.0, // 无功功率，单位war
  qb: 0.0, // 无功功率，单位war
  qc: 0.0, // 无功功率，单位war
  freq: 50.01, // 频率，单位Hz
  impep: 0.0, // 正向有功总电能
  expep: 5.0470457, // 反向有功总电能 5.0470457e10
  ctime: 1609900806875,
};

export const gpsInfo = {
  offset: {
    totalSeconds: 0,
    id: "Z",
    rules: { transitionRules: [], transitions: [], fixedOffset: true },
  },
  zone: {
    id: "UTC",
    rules: { transitionRules: [], transitions: [], fixedOffset: true },
  },
  month: "JANUARY",
  year: 2021,
  dayOfMonth: 6,
  hour: 10,
  minute: 34,
  monthValue: 1,
  nano: 0,
  second: 30,
  dayOfWeek: "WEDNESDAY",
  dayOfYear: 6,
  chronology: { id: "ISO", calendarType: "iso8601" },
};

export const alarmInfo = {
  id: 6,
  alarm: {
    alarmComponent: "RECEIVER",
    alarmLevel: "INFO",
    alarmName: "充气装置称重设备状态错误报警",
    key: "1_4_接收机频谱数据到报率不足",
  },
  startTime: 1606537349016,
  endTime: null,
  alarmDetail: "频谱数据30秒内数据数量小于25条",
  status: 1,
  ackTime: null,
  ackUser: null,
  ctime: 1606537351908,
  mtime: 1606537351908,
};

export const warning = [
  alarmInfo,
  {
    id: 7,
    alarm: {
      alarmComponent: "RECEIVER",
      alarmLevel: "INFO",
      alarmName: "自动气象站数据到报率不足",
      key: "1_4_接收机频谱数据到报率不足",
    },
    startTime: 1606537349016,
    endTime: null,
    alarmDetail: "频谱数据30秒内数据数量小于25条",
    status: 1,
    ackTime: null,
    ackUser: null,
    ctime: 1606537351908,
    mtime: 1606537351908,
  },
  {
    id: 8,
    alarm: {
      alarmComponent: "RECEIVER",
      alarmLevel: "SLIGHT",
      alarmName: "环境检测装置风速值错误",
      key: "1_4_接收机频谱数据到报率不足",
    },
    startTime: 1606537349016,
    endTime: null,
    alarmDetail: "频谱数据30秒内数据数量小于25条",
    status: 1,
    ackTime: null,
    ackUser: null,
    ctime: 1606537351908,
    mtime: 1606537351908,
  },
];

export const systemMode = [
  {
    SystemMode: "SETTING",
  },
  {
    SystemMode: "INITIALIZING",
  },
  {
    SystemMode: "AUTO",
  },
  {
    SystemMode: "MANUAL",
  },
];

const releaseStep1 = [
  {
    ReleaseStep: "WAITING_COMMAND",
  },
  {
    ReleaseStep: "POWER_SOND",
  },
  {
    ReleaseStep: "CHECKING",
  },
  {
    ReleaseStep: "CHECKING_SUCCESS",
  },
  {
    ReleaseStep: "RELEASED",
  },
  {
    ReleaseStep: "PERFORMING_ASCENDING_SOUNDING",
  },
  {
    ReleaseStep: "PERFORMING_DESCENDING_SOUNDING",
  },
  {
    ReleaseStep: "SOUNDING_TERMINATED",
  },
].reverse();
export const releaseStep = [...releaseStep1, ...releaseStep1];
export default {
  envInfo,
  upsInfo,
  gpsInfo,
  alarmInfo,
  systemMode,
  releaseStep,
  warning,
};
