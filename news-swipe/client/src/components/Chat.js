const Chat = (descendingOrderMessages) => {
  console.log(descendingOrderMessages)
  return (
    <>
      <div className="chat-display">
      {descendingOrderMessages.messages.map((message, _index) => (
          <div key={_index} className="chat-card">
              <div className="chat-message-header">
                <p>{message.name}</p>
              </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Chat