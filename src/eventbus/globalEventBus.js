// import eventbusClient from "vertx3-eventbus-client";
import { shuffle } from "lodash-es";
import eventbusData from "../data/eventbus.js";

let eventbus = null;
// export function useEventBus() {
//   return eventbus;
// }
function registerHandler(eb, channels) {
  for (let i = 0; i < channels.length; i++) {
    const item = channels[i];
    if (typeof item !== "object") {
      console.error("should be an object.");
      continue;
    }
    const { channel, handler } = item;
    eb.registerHandler(channel, function (err, msg) {
      console.log(`${channel} err -- `, err);
      console.log(`${channel} message -- `, JSON.parse(msg.body)); // 在这里对接收的数据进行一些操作
      handler && typeof handler === "function" && handler(JSON.parse(msg.body));
    });
  }
}

function useEventBusMock(channels, mockOptions) {
  const timerArr = [];
  for (let i = 0; i < channels.length; i++) {
    const item = channels[i];
    const { channel, handler } = item;
    const { timer, timeout, times, mockDataName } = Object.assign(
      {},
      defaultOptions,
      mockOptions[channel]
    );
    timerArr.push(
      getTimer({ channel, handler, timer, timeout, times, mockDataName })
    );
  }
  timerArr.map((item) => item.call());
}

function getTimer({ channel, handler, timer, timeout, times, mockDataName }) {
  function fn() {
    timer && clearTimeout(timer);
    if (times <= 0) {
      return;
    }
    if (times !== Infinity) {
      times--;
    }
    timer = setTimeout(() => {
      // const mockData = require("../data/eventbus").default[mockDataName];
      const mockData = eventbusData[mockDataName];
      let mock = null;
      if (times === Infinity) {
        mock = shuffle(mockData)[0];
      } else {
        mock = mockData[times];
      }
      // console.info(mock);
      handler(mock);
      fn();
    }, timeout);
  }
  return fn;
}

const defaultOptions = {
  timer: null,
  timeout: 1000,
  times: Infinity,
};
export default function install(app, args) {
  const { host, channels, IS_MOCK, mockOptions } = args;
  if (IS_MOCK) {
    useEventBusMock(channels, mockOptions);
  } else {
    const options = {
      vertxbus_reconnect_attempts_max: 5, // Max reconnect attempts
      vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
      vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
      vertxbus_reconnect_exponent: 2, // Exponential backoff factor
      vertxbus_randomization_factor: 0.5, // Randomization factor between 0 and 1
    };
    // eventbus = new eventbusClient(`${host}/eventbus`, options);
    eventbus = new EventBus(`${host}/eventbus`, options);
    eventbus.enableReconnect(true);
    // eb.onopen = function() {
    //   // 监听数据
    //   eventbus.registerHandler(channel, function(err, msg) {
    //     console.log(`${channel} err -- `, err);
    //     console.log(`${channel} message -- `, JSON.parse(msg.body)); // 在这里对接收的数据进行一些操作
    //     callback &&
    //       typeof callback === "function" &&
    //       callback(JSON.parse(msg.body));
    //     // state.msg = JSON.parse(msg.body);
    //   });
    //   // eventbus.publish("chat.to.server","RequestTrailData");//这行代码可以发送信息给服务端
    // };
    eventbus.onreconnect = function (err, msg) {
      console.log("onreconnect err -- ", err);
      console.log("onreconnect msg -- ", msg);
    }; // Optional, will only be called on reconnections
    eventbus.onerror = function (err, msg) {
      console.log("onerror err -- ", err);
      console.log("onerror msg -- ", msg);
    };
    eventbus.onopen = function () {
      if (Array.isArray(channels) && channels.length) {
        registerHandler(eventbus, channels);
      }
    };
    app.config.globalProperties.$eventbus = eventbus;
  }
}
