/**
 * 电源代号与名字映射关系
 * @description param：电源代号
 * @description id：可以用于渲染时排顺序
 * @description name：电源名称
 * @returns {object} eg.{MAIN: { id: 1, param: "MAIN", name: "关闭所有电源", status: false }}
 */
export function getUpsParamDataMap() {
  return {
    MAIN: { id: 1, param: "MAIN", name: "主电源", status: false },
    LIGHT: { id: 2, param: "LIGHT", name: "通风照明电源", status: false },
    WORK_ROOM_POWER: {
      id: 3,
      param: "WORK_ROOM_POWER",
      name: "控制室 工作室电源",
      status: false,
    },
    HYDROGEN_ROOM_POWER: {
      id: 4,
      param: "HYDROGEN_ROOM_POWER",
      name: "氢气房电源",
      status: false,
    },
    WORK_ROOM_AIR_CONDITIONER: {
      id: 5,
      param: "WORK_ROOM_AIR_CONDITIONER",
      name: "工作室空调、控制室空调",
      status: false,
    },
    CAMERA_POWER: {
      id: 6,
      param: "CAMERA_POWER",
      name: "摄像机电源",
      status: false,
    },
    YEMS_POWER: {
      id: 7,
      param: "YEMS_POWER",
      name: "环境检测电源",
      status: false,
    },
  };
}

/**
 * 电源信息名字映射关系
 * @description param：电源信息代码
 * @description id：可以用于渲染时排顺序
 * @description name：电源名称
 * @returns {object} {ua: { id: 1, param: "ua", name: "三相相电压数据", value: "" }}
 */
export function getUpsInfoMap() {
  return {
    ua: {
      id: 1,
      param: "ua",
      name: "三相电源相电压数据",
      value: "",
      unit: "V",
    },
    ub: {
      id: 2,
      param: "ub",
      name: "三相电源相电压数据",
      value: "",
      unit: "V",
    },
    uc: {
      id: 3,
      param: "uc",
      name: "三相电源相电压数据",
      value: "",
      unit: "V",
    },
    ia: { id: 4, param: "ia", name: "三相电流数据", value: "", unit: "A" },
    ib: { id: 5, param: "ib", name: "三相电流数据", value: "", unit: "A" },
    ic: { id: 6, param: "ic", name: "三相电流数据", value: "", unit: "A" },
    pt: { id: 7, param: "pt", name: "有功功率", value: "", unit: "W" },
    pa: { id: 8, param: "pa", name: "有功功率", value: "", unit: "W" },
    pb: { id: 9, param: "pb", name: "有功功率", value: "", unit: "W" },
    pc: { id: 10, param: "pc", name: "有功功率", value: "", unit: "W" },
    qt: { id: 11, param: "qt", name: "无功功率", value: "", unit: "war" },
    qa: { id: 12, param: "qa", name: "无功功率", value: "", unit: "war" },
    qb: { id: 13, param: "qb", name: "无功功率", value: "", unit: "war" },
    qc: { id: 14, param: "qc", name: "无功功率", value: "", unit: "war" },
    freq: { id: 15, param: "freq", name: "频率", value: "", unit: "Hz" },
    impep: {
      id: 16,
      param: "impep",
      name: "正向有功总电能",
      value: "",
      unit: "",
    },
    expep: {
      id: 17,
      param: "expep",
      name: "反向有功总电能",
      value: "",
      unit: "",
    },
  };
}
