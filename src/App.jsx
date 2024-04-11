import { AuthorizationProvider } from "./Contexts/Authorization"
import { PostProvider } from "./Contexts/Post"
import { RouterProvider } from "./Contexts/Router"
import { PrimeReactProvider, PrimeReactContext } from "primereact/api"
import "./styles/main.scss"
import { CommentProvider } from "./Contexts/Comment"
import { ProfileProvider } from "./Contexts/Profile"

function App() {
  return (
    <AuthorizationProvider>
      <PrimeReactProvider>
        <PostProvider>
          <CommentProvider>
            <ProfileProvider>
              <RouterProvider></RouterProvider>
            </ProfileProvider>
          </CommentProvider>
        </PostProvider>
      </PrimeReactProvider>
    </AuthorizationProvider>
  )
}

export default App
