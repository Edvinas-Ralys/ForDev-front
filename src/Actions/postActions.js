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

export function addComment(data){
  return {
    type: constants.ADD_COMMENT,
    payload: data
  }
}

export function deleteComment(data){
  return {
    type:constants.REMOVE_COMMENT,
    payload:data
  }
}
