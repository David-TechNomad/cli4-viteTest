import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {
  getSmokeThreshold,
  getPressThreshold,
  getHydrogenThreshold,
  getOpenTimeThreshold,
  setSmokeThreshold,
  setPressThreshold,
  setHydrogenThreshold,
  setOpenTimeThreshold,
  getLowHydrogenThreshold,
  getLowPressThreshold,
  setLowHydrogenThreshold,
  setLowPressThreshold,
  getPressThresholdInquire,
  getSmokeThresholdInquire,
  getHydrogenThresholdInquire,
  getOpenTimeThresholdInquire,
} from "../api/envCheck";
import { debounce } from "../utils/utils";

/**
 * 阈值范围
 * @returns {object} { thresholdState, onThresholdSubmit }
 */
export default function useThreshold() {
  onMounted(() => getThreshold());
  const thresholdRef = ref(null);
  /**
   * 阈值数据初始化
   */
  const thresholdState = reactive({
    // 阈值数据
    threshold: {
      hydrogen: "",
      press: "",
      smoke: "",
      openTime: "",
      lowHydrogen: "",
      lowPress: "",
    },
    // 阈值校验规则
    thresholdRules: {
      hydrogen: [
        { type: "number", message: "规定范围0-9999" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 9999) {
              return callback(new Error("规定范围0-9999"));
            }

            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      press: [
        { type: "number", message: "规定范围0-30000" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 30000) {
              return callback(new Error("规定范围0-30000"));
            }

            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      smoke: [
        { type: "number", message: "规定范围0-5000" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 5000) {
              return callback(new Error("规定范围0-5000"));
            }

            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      openTime: [
        { type: "number", message: "规定范围0-1800" },
        {
          validator: function(rule, value, callback) {
            if (value < 0 || value > 1800) {
              return callback(new Error("规定范围0-1800"));
            }

            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      lowHydrogen: [
        { type: "number", message: "要小于等于氢气告警" },
        {
          validator: function(rule, value, callback) {
            if (value > thresholdState.threshold.hydrogen) {
              return callback(new Error("要小于等于氢气告警"));
            }

            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
      lowPress: [
        { type: "number", message: "要小于等于压力告警" },
        {
          validator: function(rule, value, callback) {
            if (value > thresholdState.threshold.press) {
              return callback(new Error("要小于等于压力告警"));
            }

            callback();
          },
          trigger: ["blur", "change"],
        },
      ],
    },
  });
  /**
   * 备份一份阈值数据用于判断阈值是否有修改
   */
  const oldThresholdData = {
    smoke: "",
    press: "",
    hydrogen: "",
    openTime: "",
    lowHydrogen: "",
    lowPress: "",
  };
  /**
   * 获取阈值范围并记录一份阈值数据用于判断是否修改了阈值
   */
  function getThreshold() {
    getSmokeThreshold().then((res) => {
      thresholdState.threshold.smoke = res.Threshold;
      oldThresholdData.smoke = res.Threshold;
    });
    getPressThreshold().then((res) => {
      thresholdState.threshold.press = res.Threshold;
      oldThresholdData.press = res.Threshold;
    });
    getHydrogenThreshold().then((res) => {
      thresholdState.threshold.hydrogen = res.Threshold;
      oldThresholdData.hydrogen = res.Threshold;
    });
    getOpenTimeThreshold().then((res) => {
      thresholdState.threshold.openTime = res.Threshold;
      oldThresholdData.openTime = res.Threshold;
    });
    getLowHydrogenThreshold().then((res) => {
      thresholdState.threshold.lowHydrogen = res.Threshold;
      oldThresholdData.lowHydrogen = res.Threshold;
    });
    getLowPressThreshold().then((res) => {
      thresholdState.threshold.lowPress = res.Threshold;
      oldThresholdData.lowPress = res.Threshold;
    });
  }
  /**
   * 处理设置阈值范围
   * @description 做了防抖处理触发立即执行，1000毫秒内不重复触发
   */
  const onThresholdSubmit = debounce(
    function() {
      thresholdRef.value.validate((valid) => {
        if (valid) {
          for (const key in oldThresholdData) {
            if (+oldThresholdData[key] !== thresholdState.threshold[key]) {
              thresholdFunctions[key](thresholdState.threshold[key]);
            }
          }
        } else {
          console.warn("验证不通过");
          return false;
        }
      });
    },
    1000,
    true
  );
  function smokeFn(smoke) {
    if (smoke == oldThresholdData.smoke) return;
    setSmokeThreshold(smoke).then((res) => {
      console.log("set smoke result -- ", res);
      if (res.setSmokeThreshold) {
        oldThresholdData.smoke = smoke;
      } else {
        // thresholdState.threshold.smoke = oldThresholdData.smoke;
      }
      ElMessage({
        type: res.setSmokeThreshold ? "success" : "error",
        message: res.setSmokeThreshold
          ? "设置烟雾报警器上限成功"
          : "设置烟雾报警器上限失败",
        duration: res.setSmokeThreshold ? 2000 : 3000,
      });
    });
  }
  function pressFn(press) {
    if (press == oldThresholdData.press) return;
    setPressThreshold(press).then((res) => {
      console.log("set press result -- ", res);
      if (res.setPressThreshold) {
        oldThresholdData.press = press;
      } else {
        // thresholdState.threshold.press = oldThresholdData.press;
      }
      ElMessage({
        type: res.setPressThreshold ? "success" : "error",
        message: res.setPressThreshold
          ? "设置管道压力上限成功"
          : "设置管道压力上限失败",
        duration: res.setPressThreshold ? 2000 : 3000,
      });
    });
  }
  function hydrogenFn(hydrogen) {
    if (hydrogen == oldThresholdData.hydrogen) return;
    setHydrogenThreshold(hydrogen).then((res) => {
      console.log("set hydrogen result -- ", res);
      if (res.setHydrogenThreshold) {
        oldThresholdData.hydrogen = hydrogen;
      } else {
        // thresholdState.threshold.hydrogen = oldThresholdData.hydrogen;
      }
      ElMessage({
        type: res.setHydrogenThreshold ? "success" : "error",
        message: res.setHydrogenThreshold
          ? "设置氢气浓度上限成功"
          : "设置氢气浓度上限失败",
        duration: res.setHydrogenThreshold ? 2000 : 3000,
      });
    });
  }
  function openTimeFn(openTime) {
    if (openTime == oldThresholdData.openTime) return;
    setOpenTimeThreshold(openTime).then((res) => {
      console.log("set open time result -- ", res);
      if (res.setOpenTimeThreshold) {
        oldThresholdData.openTime = openTime;
      } else {
        // thresholdState.threshold.openTime = oldThresholdData.openTime;
      }
      ElMessage({
        type: res.setOpenTimeThreshold ? "success" : "error",
        message: res.setOpenTimeThreshold
          ? "设置时间上限成功"
          : "设置时间上限失败",
        duration: res.setOpenTimeThreshold ? 2000 : 3000,
      });
    });
  }
  function lowHydrogenFn(lowHydrogen) {
    if (lowHydrogen == oldThresholdData.lowHydrogen) return;
    setLowHydrogenThreshold(lowHydrogen).then((res) => {
      console.log(res);
      if (res.setLowHydrogenThreshold) {
        oldThresholdData.lowHydrogen = lowHydrogen;
      }
      ElMessage({
        type: res.setLowHydrogenThreshold ? "success" : "error",
        message: res.setLowHydrogenThreshold
          ? "设置氢气轻微警告阈值成功"
          : "设置氢气轻微警告阈值失败",
        duration: res.setLowHydrogenThreshold ? 2000 : 3000,
      });
    });
  }
  function lowPressFn(lowPress) {
    if (lowPress == oldThresholdData.lowPress) return;
    setLowPressThreshold(lowPress).then((res) => {
      console.log(res);
      if (res.setLowPressThreshold) {
        oldThresholdData.lowPress = lowPress;
      }
      ElMessage({
        type: res.setLowPressThreshold ? "success" : "error",
        message: res.setLowPressThreshold
          ? "设置压力轻微告警阈值成功"
          : "设置压力轻微告警阈值失败",
        duration: res.setLowPressThreshold ? 2000 : 3000,
      });
    });
  }
  /**
   * 查询设备烟雾阈值
   */
  function getSmokeInquire() {
    getSmokeThresholdInquire().then((res) => {
      thresholdState.threshold.smoke = res.ThresholdInquire;
    });
  }
  /**
   * 查询设备时间阈值
   */
  function getOpenTimeInquire() {
    getOpenTimeThresholdInquire().then((res) => {
      thresholdState.threshold.openTime = res.ThresholdInquire;
    });
  }
  /**
   * 查询设备氢气阈值
   */
  function getHydrogenInquire() {
    getHydrogenThresholdInquire().then((res) => {
      thresholdState.threshold.hydrogen = res.ThresholdInquire;
    });
  }
  /**
   * 查询设备压力阈值
   */
  function getPressInquire() {
    getPressThresholdInquire().then((res) => {
      thresholdState.threshold.press = res.ThresholdInquire;
    });
  }
  /**
   * 阈值项与处理设置阈值的函数的对应关系
   * 方便在循环遍历中调用
   */
  const thresholdFunctions = {
    smoke: smokeFn,
    press: pressFn,
    hydrogen: hydrogenFn,
    openTime: openTimeFn,
    lowHydrogen: lowHydrogenFn,
    lowPress: lowPressFn,
    getOpenTimeInquire,
    getHydrogenInquire,
    getSmokeInquire,
    getPressInquire,
  };

  return {
    thresholdState,
    onThresholdSubmit,
    thresholdRef,
    ...thresholdFunctions,
  };
}
