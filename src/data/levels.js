const data = [
  { INFO: 0 },
  { SLIGHT: 1 },
  { GENERAL: 2 },
  { SERIOUS: 3 },
  { VERY_SERIOUS: 4 },
];

const data1 = [
  {
    levelCode: 0,
    levelText: "轻微",
  },
  {
    levelCode: 1,
    levelText: "一般",
  },
  {
    levelCode: 2,
    levelText: "严重",
  },
  {
    levelCode: 3,
    levelText: "非常严重",
  },
  {
    levelCode: 4,
    levelText: "。。。",
  },
];

export default { status: 200, data, data1 };
