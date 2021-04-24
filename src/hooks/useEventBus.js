import { onMounted, onUnmounted, reactive } from "vue";
// import eventbusClient from "vertx3-eventbus-client";
import eventbusData from "../data/eventbus.js";

/**
 *
 * @param {string} channel 通道名称
 * @param {function} callback 处理event bus接收到的数据
 * @param {object} mockOptions 模拟假数据配置项
 * @param {boolean} mockOptions.IS_MOCK 是否使用模拟假数据
 * @param {string} mockOptions.mockDataName 假数据key名
 * @param {null|number} mockOptions.timer 延时器句柄对象
 * @param {number} mockOptions.timeout 延时器间隔时间 单位ms 默认1000毫秒
 * @param {number} mockOptions.times 延时器执行的次数 默认一直发
 */
export default function useEventBus(channel, callback, mockOptions) {
  onMounted(() => listenEventBus());
  onUnmounted(() => removeListenEventBus());
  const defaultOptions = {
    IS_MOCK: false,
    mockDataName: undefined,
    timer: null,
    timeout: 1000,
    times: Infinity,
  };
  let { IS_MOCK, mockDataName, timer, timeout, times } = Object.assign(
    {},
    defaultOptions,
    mockOptions
  );

  let eb = null;
  // 移除event bus监听
  function removeListenEventBus() {
    if (IS_MOCK) {
      timer && clearTimeout(timer);
      // timer = null;
    } else {
      // console.log(eb);
      // eb.close && typeof eb.close === "function" && eb.close();
    }
  }
  function sendMockData() {
    timer && clearTimeout(timer);
    if (times <= 0) return;
    timer = setTimeout(() => {
      if (times !== Infinity) {
        times--;
      }
      const mockData = eventbusData[mockDataName];
      console.info(`模拟eventbus -- ${channel}: `, mockData);
      callback && typeof callback === "function" && callback(mockData);
      sendMockData();
    }, timeout);
  }
  // 添加event bus监听
  function listenEventBus() {
    if (IS_MOCK) {
      sendMockData();
      // timer && clearInterval(timer);
      // timer = setInterval(() => {
      //   if (times <= 0) {
      //     clearInterval(timer);
      //     timer = null;
      //     return;
      //   }
      //   times--;
      //   const mockData = require("../data/eventbus").default[mockDataName];
      //   // mockData.id++;
      //   // mockData.ib = mockData.ib + 1;
      //   console.warn(`模拟eventbus -- ${channel}: `, mockData);
      //   callback && typeof callback === "function" && callback(mockData);
      //   // state.msg = mockData;
      // }, timeout);
    } else {
      //** *
      // const host = process.env.VUE_APP_EVENT_BUS;
      const host = import.meta.env.VITE_EVENTBUS_HOST;
      const options = {
        vertxbus_reconnect_attempts_max: 5, // Max reconnect attempts
        vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
        vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
        vertxbus_reconnect_exponent: 2, // Exponential backoff factor
        vertxbus_randomization_factor: 0.5, // Randomization factor between 0 and 1
      };
      // eb = new eventbusClient(`${host}/eventbus`, options);
      eb = new EventBus(`${host}/eventbus`, options);
      eb.enableReconnect(true);
      eb.onopen = function () {
        // 监听数据
        eb.registerHandler(channel, function (err, msg) {
          console.log(`${channel} err -- `, err);
          console.log(`${channel} message -- `, JSON.parse(msg.body)); // 在这里对接收的数据进行一些操作
          callback &&
            typeof callback === "function" &&
            callback(JSON.parse(msg.body));
          // state.msg = JSON.parse(msg.body);
        });
        // eb.publish("chat.to.server","RequestTrailData");//这行代码可以发送信息给服务端
      };
      eb.onreconnect = function (err, msg) {
        console.log("onreconnect err -- ", err);
        console.log("onreconnect msg -- ", msg);
      }; // Optional, will only be called on reconnections
      eb.onerror = function (err, msg) {
        console.log("onerror err -- ", err);
        console.log("onerror msg -- ", msg);
      };
      /**/
    }
  }
  // const state = reactive({
  //   msg: {},
  // });

  // return { state };
}
