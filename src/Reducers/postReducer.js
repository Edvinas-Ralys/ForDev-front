import * as constants from "../Data/postConstans"

export default function postReducer(state, action) {
  let newState = structuredClone(state ? state : [])
  let post = null
  switch (action.type) {
    case constants.GET_POSTS_FROM_SERVER:
      //TEMPORARY
      // let multiplePosts = []
      // for(let i = 0; i < 3; i++){
      //   multiplePosts.push(...action.payload)
      // }
      // newState = multiplePosts
       //TEMPORARY
       newState = action.payload
      //  if(action.payload.length >= 7){
      //     for(let i = 0; i < 7; i++){
      //       newState.push(action.payload[i])
      //     }
      //  }
       console.log(action.payload)
    break

    case constants.CREATE_POST:
      newState.unshift(action.payload)
    break

    case constants.DELETE_POST:
      console.log(action.payload)
      newState = newState.filter(item => item._id !== action.payload.postId)
    break
  }
  console.log(newState)
  return newState
}
