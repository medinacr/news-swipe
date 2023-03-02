import BookmarkHeader from "./BookmarkHeader"
import ChatDisplay from "./ChatDisplay"
import BookmarkDisplay from "./BookmarkDisplay"
import "../ChatContainer.css"

const BookmarkContainer = ({ user , getUser }) => {
  return (
    <div className="bookmark-container">
      <BookmarkHeader user={user} getUser={getUser}/>

      <div>
        <button className="option">Bookmarks</button>
        <button className="option">Chat</button>
      </div>

      <BookmarkDisplay user={user} getUser={getUser}/>

      <ChatDisplay/>
    </div>
  )
}

export default BookmarkContainer