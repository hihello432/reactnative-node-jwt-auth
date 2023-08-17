export function validateEmail(email) {
  if (email === '') {
    return false;
  }
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return false;
  }
  return true;
}

export function validatePassword(pwd) {
  if (pwd === '') {
    return false;
  }
  // const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const re = /^.{8}$/;

  if (!re.test(pwd)) {
    return false;
  }
  return true;
}

export function validateRequired(value) {
  if (value === '') {
    return false;
  }
  return true;
}

export function validateNumber(value) {
  if (value === '') {
    return false;
  }
  const re = /^[0-9]*$/;
  if (!re.test(value)) {
    return false;
  }
  return true;
}

export function validateLength(value, length) {
  if (value === '') {
    return false;
  }
  return value.length === length;
}

export function validateConfirmPassword(pwd, confrimPwd) {
  return pwd === confrimPwd;
}
