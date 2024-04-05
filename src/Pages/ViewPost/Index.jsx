import React, { useContext, useEffect } from "react"
import Layout from "./Layout"
import { Post } from "../../Contexts/Post"
import Loading from "../Components/Loading"
import { Router } from "../../Contexts/Router"
import { Comment } from "../../Contexts/Comment"
import { Authorization } from "../../Contexts/Authorization"

function Index() {
const {route, params} = useContext(Router)
const {setGetComments} = useContext(Comment)
const {user} = useContext(Authorization)




  const { loading } = useContext(Post)
  return (
    <>
      {loading && <Loading />}
      <Layout />
    </>
  )
}

export default Index
