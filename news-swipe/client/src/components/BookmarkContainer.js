import BookmarkHeader from "./BookmarkHeader"
import ChatDisplay from "./ChatDisplay"
import BookmarkDisplay from "./BookmarkDisplay"
import "../ChatContainer.css"

const BookmarkContainer = () => {
  return (
    <div className="bookmark-container">
      <BookmarkHeader />

      <div>
        <button className="option">Bookmarks</button>
        <button className="option">Chat</button>
      </div>

      <BookmarkDisplay/>

      <ChatDisplay/>
    </div>
  )
}

export default BookmarkContainer