import { AuthorizationProvider } from "./Contexts/Authorization"
import { PostProvider } from "./Contexts/Post"
import { RouterProvider } from "./Contexts/Router"
import { PrimeReactProvider, PrimeReactContext } from "primereact/api"
import "./styles/main.scss"

function App() {
  return (
    <AuthorizationProvider>
      <PrimeReactProvider>
        <PostProvider>
          <RouterProvider></RouterProvider>
        </PostProvider>
      </PrimeReactProvider>
    </AuthorizationProvider>
  )
}

export default App
