import * as c from "../Data/commentConstants"

export function getComments(data){
    return {
        type: c.GET_COMMENTS,
        payload: data
      }
}

export function addComment(data){
  return {
    type: c.CREATE_COMMENT,
    payload: data
  }
}

export function deleteComment(data){
  return {
    type:c.DELETE_COMMENT,
    payload:data
  }
}

export function updateComment(data){
    return {
        type:c.UPDATE_COMMENT,
        payload:data
    }
}