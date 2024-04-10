import * as constants from "../Data/postConstans"

export default function postReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  let post = null
  switch (action.type) {
    case constants.GET_POSTS_FROM_SERVER:
      newState = action.payload
      break

    case constants.CREATE_POST:
      newState.unshift(action.payload)
      break

    case constants.DELETE_POST:
      newState = newState.filter(item => item._id !== action.payload.postId)
      break

    case constants.UPDATE_POST:
      console.log(action.payload)
      newState = newState.map(item => item._id === action.payload._id ? action.payload : item)
      break
  }
  console.log(newState)
  return newState
}
