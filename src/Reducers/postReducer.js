import * as constants from "../Data/postConstans"

export default function postReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  switch (action.type) {
    case constants.GET_POSTS_FROM_SERVER:
      newState = action.payload
      break

    case constants.CREATE_POST:
      newState.unshift(action.payload)
      newState.pop()
      break

    case constants.DELETE_POST:
      newState = newState.filter(item => item._id !== action.payload.postId)
      break

    case constants.UPDATE_POST:
      newState = newState.map(item => (item._id === action.payload._id ? action.payload : item))
      break

    default:
      newState = action.payload
      break
  }
  return newState
}
