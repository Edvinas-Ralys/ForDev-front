import React, { useEffect, useRef, useState } from "react"
import useSignup from "../../Hooks/useSignup"
import TagDropdown from "./TagDropdown"

function SearchBar({ displayDropdown, openDropdown, setTags, tags }) {
  const [tagSearch, setTagSearch] = useState(``)
  return (
    <div className="search-bar">
      <div className="search-input">
        <input type="text" placeholder="Search for a post title..." />
      </div>
      <div className="search-tags">
        <input
          className="tag-selector"
          value={tagSearch}
          onClick={e => openDropdown(e)}
          onChange={e => setTagSearch(e.target.value)}
          type="text"
          placeholder="Select tags..."
        />

        {(
          <TagDropdown
            tagSearch={tagSearch}
            setTags={setTags}
            tags={tags}
            setTagSearch={setTagSearch}
            displayDropdown={displayDropdown}
          />
        )}
      </div>
    </div>
  )
}

export default SearchBar
