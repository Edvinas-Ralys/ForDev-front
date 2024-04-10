import React, { useState, useEffect } from "react"
import { useContext } from "react"
import { Search } from "../../Contexts/Search"
import SearchPagination from "./SearchPagination"

function SeaarchrResuslts() {
  const { searchResults } = useContext(Search)
  const [resultPage, setResultPage] = useState({
    currentPage: 1,
    displayResultFrom: 0,
    displayResultTo: 5,
    displayPerPage: 5,
  })
  useEffect(_=>{
    setResultPage({
      currentPage: 1,
      displayResultFrom: 0,
      displayResultTo: 5,
      displayPerPage: 5,
    })
  }, [searchResults])
  return (
    <>
      <div className="search-results">
        <div className="title">

          {searchResults && searchResults.length !== 0 &&  <span> Search Results{" "}({searchResults.length})</span>}
        </div>
        {searchResults &&
          searchResults.length !== 0 &&
          searchResults.map(
            (result, i) =>
              i >= resultPage.displayResultFrom &&
              i < resultPage.displayResultTo && (
                <div key={i} className="result">
                  <div className="left">
                    <div className="title">
                      <a href={`#view/${result._id}`}>{result.title}</a>
                    </div>
                    <div className="created">
                      <span className="author">
                        <a href={`#profile/${result.userId}`}>{result.createdBy}</a>
                        {" , "}
                      </span>

                      <span className="date"> {result.createdAt.slice(0, 10)}</span>
                    </div>
                  </div>

                  <div className="tags">
                    {result.tags.map((tag, i) => (
                      <div key={i} className="tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
      </div>

      {searchResults && (searchResults.length === 0 && <h1>No search results found</h1>)}
      {searchResults && resultPage.displayPerPage < searchResults.length && (
        <div className="search-pagination">
          <SearchPagination setResultPage={setResultPage} resultPage={resultPage} />
        </div>
      )}
    </>
  )
}

export default SeaarchrResuslts
