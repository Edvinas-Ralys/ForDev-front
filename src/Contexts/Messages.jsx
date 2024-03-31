import { createContext, useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"

export const Messages = createContext()
export const MessagerProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const addMessage = useCallback(( {text, type, location, cause} ) => {
    const id = uuidv4()
    setMessages(m => [...m, { text, type, id, location, cause }])
    setTimeout(_ => {
      setMessages(m => m.filter(m => m.id !== id))
    }, 5000)
  }, [])

  return (
    <Messages.Provider value={{ addMessage, messages }}>
      <>
      <div className="messages">
          {messages.map(message => (
            <div
              key={message.id}
              className={`message ${message.type}`}
              onClick={_ => setMessages(m => m.filter(m => m.id !== message.id))}
            >
              {message.text}
            </div>
          ))}
        </div>
        {children}
      </>
    </Messages.Provider>
  )
}
