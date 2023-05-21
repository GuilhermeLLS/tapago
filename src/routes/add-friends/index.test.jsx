import { describe, expect, it } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import AddFriendsRoute from '.'

describe('AddFriendsRoute', () => {
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

    fireEvent.change(friendsEmailInput, { target: { value: 'friend@test.com' } })

    expect(friendsEmailInput).toHaveValue('friend@test.com')
  })
})
