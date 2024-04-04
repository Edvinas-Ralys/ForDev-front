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

    case constants.ADD_COMMENT:
      newState.map(stateItem =>
        stateItem._id === action.payload.postId
          ? { ...stateItem, comments: stateItem.comments.unshift(action.payload) }
          : stateItem
      )
      break

    case constants.REMOVE_COMMENT:
      newState = newState.map(item =>
        item._id === action.payload.postId
          ? {
              ...item,
              comments: item.comments.filter(
                comment => comment.commentId !== action.payload.commentId
              ),
            }
          : item
      )

      break
  }
  return newState
}
