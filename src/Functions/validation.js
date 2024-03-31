export const val = (value, rules) => {
  let result = false
  for (let i = 0; i < rules.length; i++) {
    if (Array.isArray(value)) {
      if (rules[i](value[0], value[1])) {
        result = true
      } else {
        result = false
      }
    } else {
      if (rules[i](value) === true) {
        result = true
      } else {
        result = false
        break
      }
    }
  }
  return result
}

export const lettersOnly = value => {
  if (value.match(/^[a-zA-Z]+$/)) {
    return true
  } else {
    return false
  }
}

export const notEmpty = value => {
  if (value.length >= 12) {
    return true
  } else {
    return false
  }
}

export const email = value => {
  if (value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return true
  } else {
    return false
  }
}

export const isSame = (value, matchToValue) => {
  if (value === matchToValue) {
    return true
  } else {
    return false
  }
}

export const charCount = value => {
  if (value.length >= 12) {
    return true
  } else {
    return false
  }
}




export const checkUppercase = value => {
  const allLetters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  let result = false
  for (let i = 0; i < allLetters.length; i++) {
    if (value.includes(allLetters[i])) {
      result = true
    }
  }
  return result
}


export const checkLowercase = value => {
  const allLower = `abcdefghijklmnopqrstuvwxyz`
  let result = false
  for (let i = 0; i < allLower.length; i++) {
    if (value.includes(allLower[i])) {
      result = true
    }
  }
  return result
}

export const checkNumber = value => {
  const allNumber = `123456789`
  let result = false
  for (let i = 0; i < allNumber.length; i++) {
    if (value.includes(allNumber[i])) {
      result = true
    }
  }
  return result
}

export const checkSpecialChar = value => {
  const specialChars = `!@#$%^&*()_`
  let result = false
  for (let i = 0; i < specialChars.length; i++) {
    if (value.includes(specialChars[i])) {
      result = true
    }
  }
  return result
}
