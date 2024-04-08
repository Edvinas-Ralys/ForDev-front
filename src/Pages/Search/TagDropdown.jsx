import React, { useEffect, useRef } from "react"
import { postCategories } from "../../Data/postCategories"

function TagDropdown({ tagSearch, setTags, tags, setTagSearch, displayDropdown }) {
  const addTag = e => {
    e.stopPropagation()
  }
  const handleTag = tag => {
    setTagSearch(``)
      ? setTags(prev => prev.filter(item => item !== tag))
      : setTags(prev => [...prev, tag])
  }

  return (
    <div
      className="tag-dropdown"
      style={{ height: displayDropdown ? `300px` : `0px`, padding: !displayDropdown && `0` }}
    >
      {postCategories.map((cat, i) => (
        <div
          onClick={e => addTag(e)}
          className="tag"
          style={{ display: cat.title.includes(tagSearch) ? `block` : `none` }}
          key={i}
        >
          <input type="checkbox" id={`tag${cat.id}`} value={cat.title} key={cat.id} />
          <label onClick={_ => handleTag(cat.title)} htmlFor={`tag${cat.id}`}>
            {cat.title}
          </label>
        </div>
      ))}
    </div>
  )
}

export default TagDropdown
