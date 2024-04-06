import { createContext, useReducer } from "react";
import useProfile from "../Hooks/useProfile";
import profileReducer from "../Reducers/profileReducer";


export const Profile = createContext()
export const ProfileProvider = ({children}) =>{
    // const [profile, dispatchProfile] = useReducer(profileReducer, {})

    const {setGetProfile, loading, profile} = useProfile()


    return (
        <Profile.Provider value={{profile, setGetProfile, loading}}>

            {children}
        </Profile.Provider>
    )
}