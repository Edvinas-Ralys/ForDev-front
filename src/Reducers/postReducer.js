import * as constants from "../Data/postConstans"

export default function postReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  let post = null
  switch (action.type) {
    case constants.GET_POSTS_FROM_SERVER:
      newState = action.payload
      break

    case constants.CREATE_POST:
      newState.push(action.payload)
      break
  }

  return newState
}
