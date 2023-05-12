import Chat from "./Chat"
import ChatInput from "./ChatInput"
import axios from "axios"
import {useState, userEffect, useEffect} from "react"

const ChatDisplay = ({ user, clickedBookmark }) => {
  const userId = user?.user_id
  const clickedBookmarkId = clickedBookmark
  const [userMessages, setUsersMessages] = useState(null)
  const [clickedBookmarkMessages, setclickedBookmarkMessages] = useState(null)

  console.log(userId)
  const getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: {userId: userId, correspondingBookmarkId: clickedBookmarkId}
      })
      setUsersMessages(response.data.messages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [])

  const messages = []

  userMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.first_name
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  })

  const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <>
    <Chat messages = {descendingOrderMessages} />
    <ChatInput user = {user} clickedBookmark = {clickedBookmark} getMessages = {getMessages} />
    </>
  )
}

export default ChatDisplay