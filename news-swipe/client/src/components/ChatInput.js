import {useState} from 'react'
import axios from 'axios'

const ChatInput = ({ user, clickedBookmark, getMessages}) => {
  const [textArea, setTextArea] = useState("")
  const userId = user?.user_id
  const clickedBookmarkId = clickedBookmark 

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId:  userId,
      userName: user.first_name,
      chatId: clickedBookmarkId,
      message: textArea
    }

    try {
      await axios.put('http://localhost:8000/message', {message})
      getMessages()
      setTextArea("")
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="chat-input">
      <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} />
      <button className="secondary__button" onClick={addMessage}>Submit</button>
    </div>
  )
}

export default ChatInput