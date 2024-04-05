import * as c from "../Data/commentConstants"

export default function commentReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  let comment = null
  switch (action.type) {
    case c.GET_COMMENTS:
      newState = action.payload
      break

    case c.CREATE_COMMENT:
      console.log(action.payload)
      newState.unshift(action.payload)
      break
  }
  console.log(newState)
  return newState
}
