import Chat from "./Chat"
import ChatInput from "./ChatInput"
import axios from "axios"
import {useState, useEffect, useCallback} from "react"

const ChatDisplay = ({ user, clickedBookmark }) => {
  const userId = user?.user_id
  const clickedBookmarkId = clickedBookmark
  const [userMessages, setUsersMessages] = useState(null)

  console.log(userId)
  const getMessages = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: {userId: userId, correspondingBookmarkId: clickedBookmarkId}
      })
      setUsersMessages(response.data.messages)
    } catch (error) {
      console.log(error)
    }
  }, [userId, clickedBookmarkId])

  useEffect(() => {
    getMessages()
  }, [getMessages])

  const messages = []

  userMessages?.forEach(message => {
    console.log(message)
    const formattedMessage = {}
    formattedMessage['name'] = message?.userName
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
