import { createContext, useState } from "react"

export const LoadingContext = createContext()
export const LoadingContextProvider = ({ children }) => {
  const [loadingWindow, setLoadingWindow] = useState(false)

  return (
    <LoadingContext.Provider value={{ setLoadingWindow, loadingWindow }}>
      <div className="loading" style={{ display: loadingWindow ? `block` : `none` }}>
        <div className="loader" >
          <div></div>
        </div>
      </div>

      {children}
    </LoadingContext.Provider>
  )
}
