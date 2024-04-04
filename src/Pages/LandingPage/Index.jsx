import { useContext } from "react"
import Layout from "./Layout"
import Loading from "../Components/Loading"
import { Post } from "../../Contexts/Post"

function Index() {
  const { loading } = useContext(Post)

  return (
    <>
      {loading && <Loading />}
      <Layout />
    </>
  )
}

export default Index
