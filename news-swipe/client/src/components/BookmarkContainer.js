import BookmarkHeader from "./BookmarkHeader"
import ChatDisplay from "./ChatDisplay"
import BookmarkDisplay from "./BookmarkDisplay"
import "../ChatContainer.css"

const BookmarkContainer = ({ user }) => {
  return (
    <div className="bookmark-container">
      <BookmarkHeader user={user}/>

      <div>
        <button className="option">Bookmarks</button>
        <button className="option">Chat</button>
      </div>

      <BookmarkDisplay user={user}/>

      <ChatDisplay/>
    </div>
  )
}

export default BookmarkContainer