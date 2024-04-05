import * as constants from "../Data/postConstans"

export function getPosts(posts) {
  return {
    type: constants.GET_POSTS_FROM_SERVER,
    payload: posts,
  }
}
export function createPost(data) {
  return {
    type: constants.CREATE_POST,
    payload: data,
  }
}

export function destroyPost(data){
  return {
    type: constants.DELETE_POST,
    payload:data
  }
}

export function updatePost(data){
  return {
    type:constants.UPDATE_POST,
    payload:data
  }
}




