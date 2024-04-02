import { AuthorizationProvider } from "./Contexts/Authorization"
import { PostProvider } from "./Contexts/Post"
import { RouterProvider } from "./Contexts/Router"
import "./styles/main.scss"

function App() {
  return (
    <AuthorizationProvider>
      <PostProvider>
        <RouterProvider></RouterProvider>
      </PostProvider>
    </AuthorizationProvider>
  )
}

export default App
