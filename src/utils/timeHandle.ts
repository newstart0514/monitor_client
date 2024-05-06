function formatIsoDate(isoString: string) {
  // 将字符串转换为Date对象
  const date = new Date(isoString);

  // 获取各个日期部件
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript中月份是从0开始的
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 将月份和日期格式化为两位数，例如'03'而不是'3'
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // 构建最终的日期时间字符串
  const formattedDateTime = `${year}年${formattedMonth}月${formattedDay}日 ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedDateTime;
}

function calculateTotalTime(startIsoString, endIsoString) {
  // 将ISO字符串转换为Date对象
  const startDate = new Date(startIsoString);
  const endDate = new Date(endIsoString);

  // 计算两个时间点之间的差异（毫秒）
  const diff = endDate - startDate;

  // 将毫秒转换为小时、分钟和秒
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // 构建结果字符串
  let result = '预计';
  if (hours > 0) {
    result += `${hours}小时`;  
  }  
  if (minutes > 0) {
    result += `${minutes}分钟`;
  }
  if (seconds > 0) {
    result += `${seconds}秒`;  
  }
  return result;
}

function checkPositionInTimeRange(startIsoString, endIsoString) {
  // 将ISO字符串转换为Date对象
  const start = new Date(startIsoString);
  const end = new Date(endIsoString);
  const now = new Date(); // 获取当前时间

  // 比较当前时间与时间段的开始和结束
  if (now >= start && now <= end) {
    return 1;
  } else if (now < start) {
    return 0;
  } else {
    return 2;
  }
}

export {
  formatIsoDate,
  calculateTotalTime,
  checkPositionInTimeRange
}