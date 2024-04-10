import React from "react"
import { useContext } from "react"
import { Search } from "../../Contexts/Search"

function SeaarchrResuslts() {
  const { searchResults } = useContext(Search)
  return (
    <div className="search-results">
      {searchResults && searchResults.length !== 0 &&
        searchResults.map((result, i) => (
          <div key={i} className="result">
            <div className="left">
              <div className="title">
                <a href={`#view/${result._id}`}>{result.title}</a>
              </div>
              <div className="created">
                <span className="author">
                  <a href={`#profile/${result.userId}`}>{result.createdBy}</a>{" , "}
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

        ))}
        {searchResults && searchResults.length === 0 && <h1>No search results found</h1>}
    </div>
  )
}

export default SeaarchrResuslts
