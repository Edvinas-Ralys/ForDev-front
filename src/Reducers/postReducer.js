import * as constants from "../Data/postConstans"

export default function postReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  let post = null
  console.log(action.payload)
  switch (action.type) {
    case constants.GET_POSTS_FROM_SERVER:
      console.log(``)
      newState = action.payload
      break

    case constants.CREATE_POST:
      newState.push(action.payload)
      break
  }
  console.log(newState)
  return newState
}
