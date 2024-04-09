import { createContext } from "react";
import useSearch from "../Hooks/useSearch";


export const Search = createContext()
export const SearchProvider = ({children}) => {
const {setSearchParams, searchResults, loading} = useSearch()


    return (
        <Search.Provider value={{setSearchParams, searchResults, loading}}>
            {children}
        </Search.Provider>
    )
}