// 通过实践字符串获取时间
var getTime = function(timeStr) {
  if (!timeStr) {
    return null;
  }
  if (timeStr.length == 10) {
    timeStr = timeStr + " 00:00:00"
  } else if (timeStr.length == 13) {
    timeStr = timeStr + ":00:00";
  } else if (timeStr.length == 16) {
    timeStr = timeStr + ":00";
  } else if (timeStr.length == 19) {

  } else {
    console.log("非法数据格式，无法处理：" + timeStr);
  }


  timeStr = timeStr.replaceAll(":", '-');
  timeStr = timeStr.replaceAll(" ", '-');
  let arr = timeStr.split("-");
  return new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);

}

module.exports = getTime;
