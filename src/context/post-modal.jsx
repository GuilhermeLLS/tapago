import { createContext, useState } from 'react'

export const PostModalContext = createContext()

export default function PostModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return <PostModalContext.Provider value={[isOpen, setIsOpen]}>{children}</PostModalContext.Provider>
}
