import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  setEnable,
  setReset,
  getEnable,
  getResetEnableParam,
} from "../api/envCheck";
import { getEnableResetDataMap } from "../data-map/envCheck";

/**
 * 使能、复位
 * @returns {object} { enableResetState, onResetClick, onEnableChange }
 */
export default function useEnableReset() {
  onMounted(() => getEnableData());
  // 使能复位数据定义
  const enableResetState = reactive({
    isEnableLoading: false,
    isResetLoading: false,
    enableResetData: [],
  });
  /**
   * 设置使能开关
   */
  function onEnableChange(value, item) {
    console.log(item.param, ":", value);
    let arr = [
      ...enableResetState.enableResetData[0],
      ...enableResetState.enableResetData[1],
    ];
    let s = arr.reduce((prev, curr) => {
      if (curr.status) {
        prev = !prev ? curr.param : `${prev},${curr.param}`;
      }
      return prev;
    }, "");
    console.log("string: ", s);
    setEnable(s).then((res) => {
      console.log(res);
      if (!res.setEnable) {
        item.status = !value;
      }
      ElMessage({
        type: res.setEnable ? "success" : "error",
        message: res.setEnable ? "操作成功" : "操作失败",
        duration: res.setEnable ? 2000 : 3000,
      });
    });
  }
  /**
   * 处理点击使能复位按钮
   */
  function onResetClick(item) {
    if (!item.param) return;
    if (enableResetState.isResetLoading) return;
    enableResetState.isResetLoading = true;
    setReset(item.param).then((res) => {
      enableResetState.isResetLoading = false;
      ElMessage({
        type: res.setReset ? "success" : "error",
        message: res.setReset ? "操作成功" : "操作失败",
        duration: res.setReset ? 2000 : 3000,
      });
    });
  }
  /**
   * 获取全部使能和存活使能
   */
  async function getEnableData() {
    let params = await getResetEnableParam();
    if (!(params && Array.isArray(params))) return;
    params = params.map(({ param }) => {
      const item = getEnableResetDataMap()[param];
      return {
        id: item.id,
        name: item.name,
        status: item.status,
        param,
      };
    });

    const enables = await getEnable();
    if (!(enables && Array.isArray(enables))) return;
    enables.map(({ param }) => {
      const cur = params.find((value) => value.param === param);
      cur && (cur.status = true);
    });

    enableResetState.enableResetData = splitArr(params);
  }
  // 分割数组，分成两半儿
  function splitArr(arr) {
    const splitPoint = Math.ceil(arr.length / 2);
    const left = arr.slice(0, splitPoint);
    const right = arr.slice(splitPoint);
    return [left, right];
  }
  return { enableResetState, onResetClick, onEnableChange };
}
