import React from 'react'
import { SERVER_URL } from '../../Data/main'
import parse from "html-react-parser"
import ViewBody from './ViewBody'
import WriteComment from './WriteComment'

function ViewPostBody({currentItem}) {


  return (
    <>
    <ViewBody currentItem={currentItem}/>
    <WriteComment currentItem={currentItem} />
    <div className="comment-section">

    </div>
    </>
  )
}

export default ViewPostBody
