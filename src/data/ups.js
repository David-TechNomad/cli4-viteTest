const data = [
  { param: "MAIN" },
  { param: "LIGHT" },
  { param: "WORK_ROOM_POWER" },
  { param: "HYDROGEN_ROOM_POWER" },
  { param: "WORK_ROOM_AIR_CONDITIONER" },
  { param: "CAMERA_POWER" },
  { param: "YEMS_POWER" },
];

const state = [
  { WORK_ROOM_AIR_CONDITIONER: false },
  { HYDROGEN_ROOM_POWER: false },
  { LIGHT: true },
  { WORK_ROOM_POWER: false },
  { CAMERA_POWER: false },
  { MAIN: true },
  { YEMS_POWER: false },
];

export default { data, state };
