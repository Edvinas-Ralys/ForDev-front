import React, { useContext } from "react"
import Layout from "./Layout"
import { Post } from "../../Contexts/Post"
import Loading from "../Components/Loading"

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
