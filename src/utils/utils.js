import { ElMessage } from "element-plus";

/**
 * 格式化日期
 * @param date
 * @param format
 * @return {string}
 */
export const formatDate = (date = new Date(), format = "yyyy-MM-dd") => {
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

/**
 * 防抖函数
 * @description 返回一个防抖函数
 * @param {function} func 需要防抖的函数
 * @param {number} wait 延迟时间默认300ms
 * @param {boolean} immediate 是否立即执行 true：立即；false：不立即
 */
export function debounce(func, wait = 300, immediate) {
  let timeout;

  return function(...args) {
    let context = this;
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}
/**
 * 节流函数
 * @description 返回一个节流函数
 * @param {function} fn 执行的函数
 * @param {number} gapTime 多久执行一次默认300ms
 */
export function throttle(fn, gapTime = 300) {
  let _lastTime = null;

  return function(...args) {
    let context = this;
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(context, args);
      _lastTime = _nowTime;
    }
  };
}

// 睡眠 单位：毫秒
export const sleep = (t) =>
  new Promise((resolve) => setTimeout(() => resolve(), t));

// 分割数组，分成两半儿
export function splitArr(arr) {
  const splitPoint = Math.ceil(arr.length / 2);
  const left = arr.slice(0, splitPoint);
  const right = arr.slice(splitPoint);
  return [left, right];
}

/**
 * 保留n位小数
 * @param {number|string} v 源数据
 * @param {number} n 保留小数点后 n 位，默认保留2位小数
 * @returns {string}
 */
export function toFixedFilter(v, n = 2) {
  const arr = [0, "0"];
  if (arr.includes(v)) return "0";
  if (!v) return "";
  return typeof v === "number" ? v.toFixed(n) : (+v).toFixed(n);
}

export function getMuted() {
  let audioConfig = localStorage.getItem("audio-config");
  audioConfig && (audioConfig = JSON.parse(audioConfig));
  return audioConfig?.muted;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

export function getToken() {
  return sessionStorage.getItem("qt-token");
}

export function showMessage(value) {
  ElMessage({
    type: value === true ? "success" : value === false ? "error" : "warning",
    message: value === true ? "操作成功" : value === false ? "操作失败" : value,
    duration: value === true ? 2000 : 3000,
  });
}
