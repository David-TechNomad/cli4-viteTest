import { reactive } from "vue";
import { getValveTypes } from "../data-map/envCheck";
import { setValveState } from "../api/envCheck";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import eventbusData from "../data/eventbus.js";

/**
 * 阀门开关
 * @param {boolean} IS_MOCK 是否使用模拟假数据
 * @returns {object} { valveState, handleValveStatus, onValveChange, onSetValveState }
 */
export default function useValve(IS_MOCK) {
  const store = useStore();
  const ebData = IS_MOCK ? eventbusData.envInfo : null;
  // 阀门开关数据,从event bus获取
  const valveState = reactive({
    valve: [
      [
        { ...getValveTypes()["mainValveStatus"] },
        { ...getValveTypes()["branch1ValveStatus"] },
      ],
      [
        { ...getValveTypes()["branch2ValveStatus"] },
        { ...getValveTypes()["safetyValveStatus"] },
      ],
    ],
    warning: {
      mainValveStatus: false,
      branch1ValveStatus: false,
      branch2ValveStatus: false,
      safetyValveStatus: false,
    },
  });
  function isDisabledSetValve(valve) {
    const disableMode = ["AUTO", "SETTING", "INITIALIZING"];
    return (
      disableMode.includes(store.state.systemMode) || valveState.warning[valve]
    );
  }
  /**
   * 设置阀门开关
   */
  function onValveChange(value, item) {
    item.status = !value;
    const param = item.param;
    if (valveState.warning[param]) return;
    setValveState(getValveTypes()[param].type, value ? 1 : 0).then((r) => {
      console.log("setValveState result: ", r, ebData);
      if (IS_MOCK) ebData[param] = value ? 1 : 0;
      if (!r.setValveState) {
        // 还原开关之前的状态
        item.status = !value;
      }
      ElMessage({
        type: r.setValveState ? "success" : "error",
        message: `${value ? "打开" : "关闭"}${getValveTypes()[param].name}${
          r.setValveState ? "成功" : "失败"
        }`,
        duration: r.setValveState ? 2000 : 3000,
      });
    });
  }
  /**
   * 设置阀门开关状态
   * @param {boolean} value 阀门的开关状态，true：开；false：关
   * @param {object} item 阀门的信息
   */
  function onSetValveState(value, item) {
    const param = item.param;
    if (valveState.warning[param]) return;
    setValveState(getValveTypes()[param].type, value ? 1 : 0).then((r) => {
      console.log("setValveState result: ", r, ebData);
      if (IS_MOCK)
        ebData[param] = value ? VALVE_STATE_DICT.OPEN : VALVE_STATE_DICT.CLOSE;

      ElMessage({
        type: r.setValveState ? "success" : "error",
        message: `${value ? "打开" : "关闭"}${getValveTypes()[param].name}${
          r.setValveState ? "成功" : "失败"
        }`,
        duration: r.setValveState ? 2000 : 3000,
      });
    });
  }
  /**
   * 处理阀门告警
   */
  async function handleAlarm(alarmInfo) {
    if (!alarmInfo) return;
    for (const key in valveState.warning) {
      if (alarmInfo.includes(key)) {
        valveState.warning[key] = true;
      }
    }
  }
  const VALVE_STATE_DICT = {
    ERROR: 2, // 故障
    OPEN: 3, // 开
    CLOSE: 4, // 关
  };
  /**
   * 更新阀门开关状态
   */
  async function handleValveStatus(info) {
    // const { alarmInfo } = info;
    // handleAlarm(alarmInfo);
    const valveStatusObj = {
      branch1ValveStatus: +info.branch1ValveStatus,
      branch2ValveStatus: +info.branch2ValveStatus,
      mainValveStatus: +info.mainValveStatus,
      safetyValveStatus: +info.safetyValveStatus,
    };
    const [l, r] = valveState.valve;
    for (const key in valveStatusObj) {
      const a = l.find((value) => value.param === key);
      if (a) {
        a.status =
          valveStatusObj[key] === VALVE_STATE_DICT.OPEN
            ? true
            : valveStatusObj[key] === VALVE_STATE_DICT.CLOSE
            ? false
            : a.status;
      }
      const b = r.find((value) => value.param === key);
      if (b) {
        b.status =
          valveStatusObj[key] === VALVE_STATE_DICT.OPEN
            ? true
            : valveStatusObj[key] === VALVE_STATE_DICT.CLOSE
            ? false
            : b.status;
      }
      valveStatusObj[key] === VALVE_STATE_DICT.ERROR && handleAlarm(key);
    }
  }
  return {
    valveState,
    handleValveStatus,
    onValveChange,
    onSetValveState,
    isDisabledSetValve,
  };
}
