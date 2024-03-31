import { AuthorizationProvider } from "./Contexts/Authorization"
import { RouterProvider } from "./Contexts/Router"
import "./styles/main.scss"

function App() {
  return (
    <AuthorizationProvider>
      <RouterProvider></RouterProvider>
    </AuthorizationProvider>
  )
}

export default App
