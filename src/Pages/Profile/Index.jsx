import React, { useContext, useEffect } from "react"
import Layout from "./Layout"
import { Router } from "../../Contexts/Router"
import { Profile } from "../../Contexts/Profile"
import Loading from "../Components/Loading"

function Index() {
  const { params, route } = useContext(Router)
  const { setGetProfile, loading, profile } = useContext(Profile)
  console.log(profile)


  useEffect(
    _ => {
      if (route === `#profile`) {
        setGetProfile({ userId: Number(params[0]) })
      } else return
    },
    [params]
  )


  return (
    <>
    {loading || !profile && <Loading />}
    {profile !== null && <Layout />}

    </>
  )
}

export default Index
