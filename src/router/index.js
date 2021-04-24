import { createRouter, createWebHashHistory } from "vue-router";

import Empty from "../views/Empty.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    meta: { name: "探空仪数据查询" },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/alert",
    name: "Alert",
    meta: { name: "报警信息管理" },
    component: () =>
      import(/* webpackChunkName: "alert" */ "../views/Alert.vue"),
  },
  // {
  //   path: "/devices",
  //   name: "Devices",
  //   meta: { name: "设备监控" },
  //   hidden: true,
  //   component: () =>
  //     import(/* webpackChunkName: "devices" */ "../views/DeviceMonitor.vue"),
  // },
  {
    path: "/ups",
    name: "Ups",
    meta: { name: "电源管理" },
    hidden: false,
    component: () => import(/* webpackChunkName: "ups" */ "../views/Ups.vue"),
  },
  {
    path: "/gps",
    name: "gps",
    meta: { name: "GPS" },
    hidden: false,
    component: () => import(/* webpackChunkName: "gps" */ "../views/Gps.vue"),
  },
  {
    path: "/env",
    name: "Env",
    meta: { name: "环境检测" },
    component: () =>
      import(/* webpackChunkName: "env" */ "../views/EnvCheck.vue"),
  },
  {
    path: "/seven-needles",
    name: "SevenNeedles",
    meta: { name: "七针监测" },
    component: () =>
      import(
        /* webpackChunkName: "seven-needles" */ "../views/SevenNeedles.vue"
      ),
  },
  {
    path: "/device-enable",
    name: "DeviceEnable",
    meta: { name: "设备使能" },
    component: () =>
      import(
        /* webpackChunkName: "device-enable" */ "../views/DeviceEnable.vue"
      ),
  },
  {
    path: "/check-params-config",
    name: "CheckParamsConfig",
    meta: { name: "检测参数配置" },
    component: () =>
      import(
        /* webpackChunkName: "check-params-config" */ "../views/CheckParamsConfig.vue"
      ),
  },
  {
    path: "/users-manager",
    name: "UsersManager",
    meta: { name: "用户管理" },
    component: () =>
      import(
        /* webpackChunkName: "users-manager" */ "../views/UsersManager.vue"
      ),
  },
  {
    path: "/",
    name: "Empty",
    hidden: true,
    redirect: "/alert",
    // component: Empty,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
