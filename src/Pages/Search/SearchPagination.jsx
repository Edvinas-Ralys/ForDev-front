import React, { useState, useContext } from "react"
import { Search } from "../../Contexts/Search"
import { Chevron } from "../../Icons/Icons"

function SearchPagination({ setResultPage, resultPage }) {
  const { searchResults } = useContext(Search)

  const nextPage = _ => {
    if (searchResults.length > resultPage.displayResultTo) {
      setResultPage(prev => ({
        ...prev,
        displayResultFrom: prev.displayResultTo,
        displayResultTo: prev.displayResultTo + prev.displayPerPage,
        currentPage: ++prev.currentPage,
      }))
    }
  }

  const prevPage = _ => {
    if (resultPage.displayResultFrom !== 0) {
      setResultPage(prev => ({
        ...prev,
        displayResultFrom: prev.displayResultFrom - prev.displayPerPage,
        displayResultTo: prev.displayResultTo - prev.displayPerPage,
        currentPage: --prev.currentPage,
      }))
    }
  }

  return (
    <div className="pagination">
      <div className="page-numbers">
        <div className="prev-page">
          {resultPage.displayResultFrom !== 0 && (
            <div onClick={prevPage} className="number">
              <Chevron />
              {resultPage.currentPage - 1}
            </div>
          )}
        </div>
        <div className="curr-page number">{resultPage.currentPage}</div>
        <div className="next-page">
          {searchResults.length > resultPage.displayResultTo && (
            <div onClick={nextPage} className="number">
              {resultPage.currentPage + 1}
              <Chevron />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPagination
