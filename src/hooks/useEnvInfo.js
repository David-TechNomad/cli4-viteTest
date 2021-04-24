import { reactive } from "vue";
import { toFixedFilter } from "../utils/utils";

/**
 * 环境监测要素
 * @returns {object} { envState, handleEnvInfo, toFixedFilter, sensorFilter, statusFilter }
 */
export default function useEnvInfo() {
  /**
   * 环境监测要素数据初始化
   */
  const envState = reactive({
    gasThickness1: "", // 放球仓氢气1浓度（ppm）
    gasThickness2: "", // 放球仓氢气2浓度（ppm）
    pipePressure: "", // 氢气房总管道压力（kPa）
    smokeDetector1: "", // 操作室烟雾报警器（ppm）
    smokeDetector2: "", // 放球仓烟雾报警器。0正常1异常2报警
    status: "", // 环境检测设备状态。0正常1异常2报警
    temperature: "", // 环境温度(精确到1度)
    humidity: "", // 环境湿度(精确到个位数。既整数)
    waterLeakSensor: "", // 操作室水进传感器。0正常1异常2进水
    roomGasThickness1: "", // 氢气房氢气1浓度（ppm）
    roomGasThickness2: "", // 氢气房氢气2浓度（ppm）
    roomPipePressure1: "", // 氢气房支路1管道压力（bPa）
    roomPipePressure2: "", // 氢气房支路2管道压力（bPa）
    roomSmokeDetector1: "", // 氢气房烟雾报警器1（ppm）
    roomWaterLeakSensor: "", // 氢气房进水传感器。0正常1异常2进水
    domeWindSpeed: "", // 仓顶秒风风速（m/s）
    domeWindDirection: "", // 仓顶秒风风向（度）
  });

  function statusFilter(v) {
    const falseArr = ["", null, undefined];
    const trueArr = ["正常", "异常", "报警"];
    if (falseArr.includes(v)) return "";
    return trueArr[v];
  }
  // 进水报警器
  function sensorFilter(v) {
    const falseArr = ["", null, undefined];
    const trueArr = ["正常", "异常", "进水"];
    if (falseArr.includes(v)) return "";
    return trueArr[v];
  }
  /**
   * 处理环境监测信息
   */
  async function handleEnvInfo(info) {
    for (const key in envState) {
      envState[key] = info[key];
    }
  }
  return { envState, handleEnvInfo, toFixedFilter, sensorFilter, statusFilter };
}
