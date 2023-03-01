import "../ChatContainer.css"

const BookmarkDisplay = ( {user} ) => {
  console.log(user)
  return (
    <div className="bookmark-bar">
      { user.bookmark.map(data =>
      <div className="bookmark-card">
        <img className="bookmark-image" src={data.urlToImage || 'https://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/torman_demo1/files/nature-hollywood.jpg?m=1519841272&itok=3RYGrGr8'}></img>
        <a href={data.articleUrl} target="_blank" rel="noreferrer">
          <p>{data.title}</p>
        </a>
        <button>Delete</button>
        <button>Chat</button>
      </div>
        )
      }
    </div>
  )
}

export default BookmarkDisplay