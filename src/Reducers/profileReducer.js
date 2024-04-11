import * as constants from '../Data/profileConstants'

export default function profileReducer(state, action){
    let newState = structuredClone(state ? state : {})
    switch(action.type){
        case constants.GET_PROFILE:
            newState = action.payload
        break

        default:
            newState = action.payload
        break
    }
    return newState
}