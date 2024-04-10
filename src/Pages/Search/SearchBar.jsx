import React, {useState, useContext } from "react"
import TagDropdown from "./TagDropdown"
import {Search} from '../../Contexts/Search'

function SearchBar({ displayDropdown, openDropdown, setTags, tags }) {
  const [tagSearch, setTagSearch] = useState(``)
  const [titleSearch, setTitleSearch] = useState(``)
  const {setSearchParams} = useContext(Search)
  const removeTag = tag => {
    if (tags.includes(tag)) {
      setTags(prev => prev.filter(item => item !== tag))
    }
  }

  const handleSearch = _ => {
    // setTags([])
    // setTitleSearch(``)
    setSearchParams({
      title: titleSearch,
      tags: tags,
    })
  }

  return (
    <div className="search-bar">
      <div className="inputs">
        <div className="double">


        <div className="search-input">
          <input
            type="text"
            placeholder="Search for a post title..."
            value={titleSearch}
            onChange={e => setTitleSearch(e.target.value)}
          />
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

          {
            <TagDropdown
              tagSearch={tagSearch}
              setTags={setTags}
              tags={tags}
              setTagSearch={setTagSearch}
              displayDropdown={displayDropdown}
            />
          }
        </div>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="selected-tags">
        {tags.length !== 0 &&
          tags.map((tag, i) => (
            <div onClick={_ => removeTag(tag)} key={i} className="tag">
              {tag}
            </div>
          ))}
      </div>

    </div>
  )
}

export default SearchBar
