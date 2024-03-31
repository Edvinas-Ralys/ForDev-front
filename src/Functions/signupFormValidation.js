// import { useCallback } from "react"
import * as v from "../Functions/validation"

export const original = {
  // border: `2px solid gray`,
  // backgroundColor: `inherit`,
}

export const validatedStyle = {
  transition: `0.2s ease-in-out`,
  border: `2px solid green`,
  backgroundColor: `#013101`,
  color:`#fff`
}

export const notValidatedStyle = {
  transition: `0.2s ease-in-out`,
  border: `2px solid red`,
  backgroundColor: `#833535`,
}

export const handleInputValidation = (e, inputSetter) => {
  if (v.val(e.target.value, [v.lettersOnly]) === true) {
    inputSetter(prev => ({ ...prev, style: validatedStyle, validated: true }))
  } else {
    inputSetter(prev => ({ ...prev, style: notValidatedStyle, validated: false }))
  }
  inputSetter(prev => ({ ...prev, value: e.target.value }))
}

export const handleEmailValidation = (e, inputSetter) => {
  if (v.val(e.target.value, [v.email]) === true) {
    inputSetter(prev => ({ ...prev, style: validatedStyle, validated: true }))
  } else {
    inputSetter(prev => ({ ...prev, style: notValidatedStyle, validated: false }))
  }
  inputSetter(prev => ({ ...prev, value: e.target.value }))
}

export const handleEmailValidationConfirm = (e, valueToMatch, inputSetter) => {
  if (v.val([e.target.value, valueToMatch], [v.isSame]) === true) {
    inputSetter(prev => ({ ...prev, style: validatedStyle, validated: true }))
  } else {
    inputSetter(prev => ({ ...prev, style: notValidatedStyle, validated: false }))
  }
  inputSetter(prev => ({ ...prev, value: e.target.value }))
}

const changePasswordColor = (input, inputSetter) =>{
  if(Object.values(input.validations).every(validation => validation === true)) {
    inputSetter(prev => ({...prev, style:validatedStyle}))
} else {
  inputSetter(prev => ({...prev, style:notValidatedStyle}))
}}


//!Needs rework but works for now
export const validatePassword = (e, inputSetter, input) => {
  if (v.val(e.target.value, [v.charCount])) {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, charCount: true, colorChange:true } }))
    changePasswordColor(input, inputSetter)
  } else {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, charCount: false, colorChange:true } }))
  }

  if (v.val(e.target.value, [v.checkUppercase])) {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, uppercase: true, colorChange:true } }))
    changePasswordColor(input, inputSetter)
  } else {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, uppercase: false, colorChange:true } }))
  }

  if(v.val(e.target.value, [v.checkLowercase])){
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, lowercase: true , colorChange:true} }))
    changePasswordColor(input, inputSetter)
  } else {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, lowercase: false, colorChange:true } }))
  }

  if(v.val(e.target.value, [v.checkNumber])){
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, number: true, colorChange:true } }))
    changePasswordColor(input, inputSetter)
  } else {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, number: false, colorChange:true } }))
  }

  if(v.val(e.target.value, [v.checkSpecialChar])){
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, symbol: true, colorChange:true } }))
    changePasswordColor(input, inputSetter)
  } else {
    inputSetter(prev => ({ ...prev, validations: { ...prev.validations, symbol: false, colorChange:true } }))
  }
  inputSetter(prev => ({ ...prev, value: e.target.value }))


}




