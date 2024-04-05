import { createContext, useReducer } from "react";
import useProfile from "../Hooks/useProfile";


export const Profile = createContext()
export const ProfileProvider = ({children}) =>{
    const [profile, dispatchProfile] = useReducer(profileReducer, null)

    const {setGetProfile} = useProfile(dispatchProfile)


    return (
        <Profile.Provider value={{profile, setGetProfile}}>

            {children}
        </Profile.Provider>
    )
}