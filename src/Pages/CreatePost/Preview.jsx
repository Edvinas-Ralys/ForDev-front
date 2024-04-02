import React from 'react'
import PostBody from './PostBody'

function Preview({preview}) {
  return (
    <div className='preview-page'>
      <div className="preview-content">
        <PostBody preview={preview} />

      </div>
    </div>
  )
}

export default Preview
