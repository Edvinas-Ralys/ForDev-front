import React from "react"
import Layout from "./Layout"
import { SearchProvider } from "../../Contexts/Search"

function Index() {

  return (
    <>
      <SearchProvider>
        <Layout />
      </SearchProvider>
    </>
  )
}

export default Index
