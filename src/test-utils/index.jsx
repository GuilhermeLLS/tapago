import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PostModalProvider from '../context/post-modal'

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <PostModalProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </PostModalProvider>
      ),
    }),
  }
}

export { renderWithRouter }
