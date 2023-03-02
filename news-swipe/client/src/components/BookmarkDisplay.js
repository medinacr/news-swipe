import axios from "axios"
import { useEffect, useState } from 'react'
import "../ChatContainer.css"

const BookmarkDisplay = ( {user, getUser} ) => {
  const userId = user.user_id
  
  const deleteBookmark = async (userId, title) => {
    console.log('Deleting ' + title + 'On Account: ' + userId)
    try {
      await axios.delete(`http://localhost:8000/delete-bookmark?userId=${userId}&articleUrl=${title}`)
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bookmark-bar">
      { user.bookmark.map(data =>
      <div className="bookmark-card">
        <img className="bookmark-image" src={data.urlToImage || 'https://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/torman_demo1/files/nature-hollywood.jpg?m=1519841272&itok=3RYGrGr8'}></img>
        <a href={data.articleUrl} target="_blank" rel="noreferrer">
          <p>{data.title}</p>
        </a>
        <button className="seconday-button" onClick={ () => deleteBookmark(userId, data.title)}>Delete</button>
        <button>Chat</button>
      </div>
        )
      }
    </div>
  )
}

export default BookmarkDisplay