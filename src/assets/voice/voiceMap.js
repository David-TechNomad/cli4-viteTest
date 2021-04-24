// export default {
//   GPS无数据异常: require("./GPS无数据异常.mp3"),
//   充气装置下线: require("./充气装置下线.mp3"),
//   充气装置充气故障: require("./充气装置充气故障.mp3"),
//   充气装置充气暂停: require("./充气装置充气暂停.mp3"),
//   充气装置充气阀故障报警: require("./充气装置充气阀故障报警.mp3"),
//   充气装置放气阀故障报警: require("./充气装置放气阀故障报警.mp3"),
//   充气装置数据到报率不足: require("./充气装置数据到报率不足.mp3"),
//   充气装置无数据异常: require("./充气装置无数据异常.mp3"),
//   充气装置称重设备状态错误报警: require("./充气装置称重设备状态错误报警.mp3"),
//   基测箱下线: require("./基测箱下线.mp3"),
//   基测箱数据到报率不足: require("./基测箱数据到报率不足.mp3"),
//   基测箱无数据: require("./基测箱无数据.mp3"),
//   基测箱气压数据异常: require("./基测箱气压数据异常.mp3"),
//   基测箱气温数据异常: require("./基测箱气温数据异常.mp3"),
//   基测箱湿度数据异常: require("./基测箱湿度数据异常.mp3"),
//   探空站水浸报警: require("./基测箱数据到报率不足.mp3"),
//   接收机下线: require("./接收机下线.mp3"),
//   接收机没有频谱数据: require("./接收机没有频谱数据.mp3"),
//   接收机频谱数据到报率不足: require("./接收机频谱数据到报率不足.mp3"),
//   氢气房支路1管道压力低报警: require("./氢气房支路1管道压力低报警.mp3"),
//   氢气房支路1管道压力高报警: require("./氢气房支路1管道压力高报警.mp3"),
//   氢气房支路2管道压力低报警: require("./氢气房支路2管道压力低报警.mp3"),
//   氢气房支路2管道压力高报警: require("./氢气房支路2管道压力高报警.mp3"),
//   氢气房氢气浓度高报警: require("./氢气房氢气浓度高报警.mp3"),
//   氢气房水浸报警: require("./氢气房水浸报警.mp3"),
//   氢气房烟雾报警器状态报警: require("./氢气房烟雾报警器状态报警.mp3"),
//   氢气房设备状态报警: require("./氢气房设备状态报警.mp3"),
//   氢气浓度高报警: require("./氢气浓度高报警.mp3"),
//   烟雾报警器烟雾浓度高报警: require("./烟雾报警器烟雾浓度高报警.mp3"),
//   烟雾报警器状态报警: require("./烟雾报警器状态报警.mp3"),
//   环境检测装置下线: require("./环境检测装置下线.mp3"),
//   环境检测装置数据到报率不足: require("./环境检测装置数据到报率不足.mp3"),
//   环境检测装置无数据异常: require("./环境检测装置无数据异常.mp3"),
//   环境检测装置温度值错误: require("./环境检测装置温度值错误.mp3"),
//   环境检测装置湿度值错误: require("./环境检测装置湿度值错误.mp3"),
//   环境检测装置风向值错误: require("./环境检测装置风向值错误.mp3"),
//   环境检测装置风速值错误: require("./环境检测装置风速值错误.mp3"),
//   环境设备状态报警: require("./环境设备状态报警.mp3"),
//   管道压力低报警: require("./管道压力低报警.mp3"),
//   管道压力高报警: require("./管道压力高报警.mp3"),
//   自动气象站下线: require("./自动气象站下线.mp3"),
//   自动气象站压温湿数据异常: require("./自动气象站压温湿数据异常.mp3"),
//   自动气象站数据到报率不足: require("./自动气象站数据到报率不足.mp3"),
//   自动气象站无数据异常: require("./自动气象站无数据异常.mp3"),
//   "7针激活装置下线": require("./7针激活装置下线.mp3"),
//   电源管理模块下线: require("./电源管理模块下线.mp3"),
//   未找到报警语音: require("./未找到报警语音.mp3"),
// };

// const files = require.context(".", false, /.mp3$/);
// const vioce = files.keys().reduce((obj, path) => {
//   const name = path.replace(/^\.\/(.*)\.mp3$/, "$1");
//   obj[name] = files(path);
//   return obj;
// }, {});
// export default vioce;

const files = import.meta.globEager("./*.mp3");

const vioce = Object.keys(files).reduce((obj, item) => {
  const key = item.replace(/^\.\/(.*)\.mp3$/, "$1");
  obj[key] = files[item].default;
  return obj;
}, {});
export default vioce;
