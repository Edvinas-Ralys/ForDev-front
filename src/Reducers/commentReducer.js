import * as c from "../Data/commentConstants"

export default function commentReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  let comment = null
  switch (action.type) {
    case c.GET_COMMENTS:
      newState = action.payload.sort((a, b) => {
        let dateA = new Date(a.createdAt)
        let dateB = new Date(b.createdAt)
        if (dateA < dateB) return 1
        if (dateA > dateB) return -1
        return 0
      })
      break

    case c.CREATE_COMMENT:
      newState.unshift(action.payload)
      break

    case c.DELETE_COMMENT:
      newState = newState.filter(item => item.id !== action.payload)
      break

    case c.UPDATE_COMMENT:
      console.log(action.payload)
      newState = newState.map(item => item.id === action.payload.id ? action.payload : item)
    break
  }
  console.log(newState)
  return newState
}
