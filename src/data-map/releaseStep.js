export const releaseStepMap = {
  WAITING_COMMAND: {
    id: 0,
    title: "等待",
    status: false,
  },
  POWER_SOND: {
    id: 1,
    title: "上电中",
    status: false,
  },
  CHECKING: {
    id: 2,
    title: "检测中",
    status: false,
  },
  CHECKING_SUCCESS: {
    id: 3,
    title: "检测成功",
    status: false,
  },
  RELEASED: {
    id: 4,
    title: "已放球",
    status: false,
  },
  PERFORMING_ASCENDING_SOUNDING: {
    id: 5,
    title: "正在上升",
    status: false,
  },
  PERFORMING_DESCENDING_SOUNDING: {
    id: 6,
    title: "正在下降",
    status: false,
  },
  OVER: {
    id: 7,
    title: "探空终止",
    status: false,
    isOver: true,
  },
};

// export const releaseOverMap = {
//   SOUNDING_TERMINATED: {
//     id: 0,
//     title: "探空终止",
//     status: false,
//     isOver: true,
//   },
//   SOUNDING_ABORTED: {
//     id: 1,
//     title: "探空终止",
//     status: false,
//     isOver: true,
//   },
// };
