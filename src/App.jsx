import { AuthorizationProvider } from "./Contexts/Authorization"
import { PostProvider } from "./Contexts/Post"
import { RouterProvider } from "./Contexts/Router"
import { PrimeReactProvider, PrimeReactContext } from "primereact/api"
import "./styles/main.scss"
import { LoadingContextProvider } from "./Contexts/LoadingCont"
import { CommentProvider } from "./Contexts/Comment"

function App() {
  return (
    <AuthorizationProvider>
      <PrimeReactProvider>
        <PostProvider>
          <CommentProvider>
            <RouterProvider></RouterProvider>
          </CommentProvider>
        </PostProvider>
      </PrimeReactProvider>
    </AuthorizationProvider>
  )
}

export default App
