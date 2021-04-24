import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalEventBus from "./eventbus/globalEventBus";
import channels, { mockOptions } from "./eventbus/channels";
import ElementPlus from "./element-ui.js";
import lang from "element-plus/lib/locale/lang/zh-cn";
import { locale } from "element-plus";
import "dayjs/locale/zh-cn";

// 模拟eventbus开关
const IS_MOCK = true;
const app = createApp(App);
// 设置语言
locale(lang);
app.use(ElementPlus);
// 按需引入时，设置全局size和z-index的方法，zIndex默认：2000
app.config.globalProperties.$ELEMENT = { size: "", zIndex: 3000 };

app
  .use(router)
  .use(store)
  .use(globalEventBus, {
    // host: process.env.VUE_APP_EVENT_BUS,
    host: import.meta.env.VITE_EVENTBUS_HOST,
    channels: channels,
    IS_MOCK: IS_MOCK,
    mockOptions,
  })
  .mount("#app");
