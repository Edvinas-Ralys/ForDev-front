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
