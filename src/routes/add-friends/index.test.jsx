import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, act } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import * as requests from '../../services/requests'
import AddFriendsRoute from '.'

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: () => {
      return {
        auth: {
          user: () => {
            return {
              id: 1,
            }
          },
          signInWithPassword: () => {
            return {
              error: null,
            }
          },
        },
      }
    },
  }
})

describe('AddFriendsRoute', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders friends route', () => {
    renderWithRouter(<AddFriendsRoute />, '/add-friends')
    const addFriendsButton = screen.getByRole('button', { name: 'Add Friend' })
    const friendsEmailInput = screen.getByLabelText('Friends Email')

    expect(addFriendsButton).toBeInTheDocument()
    expect(friendsEmailInput).toBeInTheDocument()
  })

  it('should fill friends email input', () => {
    renderWithRouter(<AddFriendsRoute />, '/add-friends')
    const friendsEmailInput = screen.getByLabelText('Friends Email')

    act(() => {
      fireEvent.change(friendsEmailInput, { target: { value: 'friend@test.com' } })
    })

    expect(friendsEmailInput).toHaveValue('friend@test.com')
  })

  it('should throw error if error happens on user search', () => {
    const mockGetId = vi.spyOn(requests, 'getIdFromUserByEmail').mockReturnValueOnce({ error: true })
    renderWithRouter(<AddFriendsRoute />, '/add-friends')
    const addButton = screen.getByText('Add Friend')
    const friendsEmailInput = screen.getByLabelText('Friends Email')

    act(() => {
      fireEvent.click(addButton)
    })
    expect(mockGetId).toHaveBeenCalledOnce()
    expect(friendsEmailInput).toBeEmptyDOMElement()
  })

  it('should throw error if error happens on user search', () => {
    const mockGetId = vi.spyOn(requests, 'getIdFromUserByEmail').mockReturnValueOnce({ error: false })

    renderWithRouter(<AddFriendsRoute />, '/add-friends')
    const addButton = screen.getByText('Add Friend')

    act(() => {
      fireEvent.click(addButton)
    })
    expect(mockGetId).toHaveBeenCalledOnce()
  })

  it('should return valid data from user', () => {
    const mockGetId = vi.spyOn(requests, 'getIdFromUserByEmail').mockReturnValueOnce({ data: { id: 2 } })

    renderWithRouter(<AddFriendsRoute />, '/add-friends')
    const addButton = screen.getByText('Add Friend')

    act(() => {
      fireEvent.click(addButton)
    })
    expect(mockGetId).toHaveBeenCalledOnce()
  })
})
