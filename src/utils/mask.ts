function maskEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex > 7) { // 假设邮箱至少有8个字符
    return email.slice(0, 3) + '****' + email.slice(atIndex - 2);
  }
  return email; // 如果邮箱太短，则不进行处理
}

function maskPhone(phone) {
  const length = phone.length;
  if (length > 7) { // 假设手机号至少有8位数
    const start = phone.substring(0, 3);
    const end = phone.substring(length - 4);
    return start + '****' + end;
  }
  return phone; // 如果手机号太短，则不进行处理
}

function maskStudentID(studentID) {
  const length = studentID.length;
  if (length > 4) { // 假设学号至少有5位数
    const start = studentID.substring(0, 4);
    const end = studentID.substring(length - 4);
    return start + '****' + end;
  }
  return studentID; // 如果学号太短，则不进行处理
}

function maskName(name) {
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + '*'.repeat(names[1].length);
  }
  return name; // 如果只有一个名字，则不进行处理
}

export {
  maskEmail,
  maskName,
  maskPhone,
  maskStudentID
}