function outType(type: string) {
  if (type === '0') {
    return '个人出行';
  } else if (type === '1') {
    return '团队出行';
  } else {
    return '未知出行类型';
  }
}

function carType(type: string) {
  const arr = ['校车', '铁路', '飞机', '私家车', '公交大巴', '其他'];
  return arr[parseInt(type) - 1];
}

export {
  outType,
  carType
}