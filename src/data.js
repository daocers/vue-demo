function difficultyList() {
  return [
    {"code": 1, "value": "简单"},
    {"code": 2, "value": "中等"},
    {"code": 3, "value": "困难"},
  ];
}

function busiTypeList() {
  return [
    {"code": 1, "value": '对公'},
    {"code": 2, "value": '对私'},
    {"code": 3, "value": '公共'},
    {"code": 4, "value": '国际'},
  ];
}

// function diffMap() {
//   return {
//     "1": "简单",
//     "2": "中等",
//     "3":"困难"
//   }
// }

const busiTypeMap = {
  "1": "对公",
  "2": "对私",
  "3": "公共",
  "4": "国际",
}

const diffMap = {
  "1": "低",
  "2": "中",
  "3": "高"
}

export {
  difficultyList,
  busiTypeList,
  diffMap,
  busiTypeMap
}
