import { AuthorizationProvider } from "./Contexts/Authorization"
import { PostProvider } from "./Contexts/Post"
import { RouterProvider } from "./Contexts/Router"
import { PrimeReactProvider, PrimeReactContext } from "primereact/api"
import "./styles/main.scss"
import { LoadingContextProvider } from "./Contexts/LoadingCont"
import { CommentProvider } from "./Contexts/Comment"
import { ProfileProvider } from "./Contexts/Profile"

function App() {
  return (
    <AuthorizationProvider>
      <PrimeReactProvider>
        <PostProvider>
          <ProfileProvider>
            <CommentProvider>
              <RouterProvider></RouterProvider>
            </CommentProvider>
          </ProfileProvider>
        </PostProvider>
      </PrimeReactProvider>
    </AuthorizationProvider>
  )
}

export default App
