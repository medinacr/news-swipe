import BookmarkHeader from "./BookmarkHeader"
import ChatDisplay from "./ChatDisplay"
import BookmarkDisplay from "./BookmarkDisplay"
import { useState } from 'react'
import "../ChatContainer.css"

const BookmarkContainer = ({ user , getUser }) => {
  const [ clickedBookmark, setClickedBookmark ] = useState(null)
  console.log('BookMarkContainer;', user)
  return (
    <div className="bookmark-container">
      <BookmarkHeader user={user} getUser={getUser}/>

      <div>
        <button className="option" onClick={() => setClickedBookmark(null)}>Bookmarks</button>
        <button className="option" disabled={!clickedBookmark}>Chat</button>
      </div>

      {!clickedBookmark && <BookmarkDisplay user={user} getUser={getUser} setClickedBookmark={setClickedBookmark}/>}

      {clickedBookmark && <ChatDisplay user={user} clickedBookmark={clickedBookmark}/>}

    </div>
  )
}

export default BookmarkContainer