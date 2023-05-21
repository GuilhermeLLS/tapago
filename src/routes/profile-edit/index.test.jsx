import { describe, expect, it, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import ProfileEditRoute from '.'
import { renderWithRouter } from '../../test-utils'
import { supabase } from '../../clients/supabase'

vi.mock('../../clients/supabase', () => {
  return {
    supabase: {
      auth: {
        user: {
          id: 1,
        },
      },
      from: () => {},
      select: () => {},
      single: () => {
        return {
          data: {
            id: 1,
            name: 'Test',
            email: 'test@email.com',
          },
        }
      },
    },
  }
})

describe('ProfileEditRoute', () => {
  it('render loading state in profile edit route', () => {
    renderWithRouter(<ProfileEditRoute />, '/profile-edit')

    const loading = screen.getByText('Loading...')
    expect(loading).toBeInTheDocument()
  })

  it('displays user information after successful fetch', async () => {
    vi.mock('../../clients/supabase', () => ({
      supabase: {
        auth: {
          user: vi.fn(() => ({ id: 1 })),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn(() =>
            Promise.resolve({
              data: { id: 1, email: 'test@email.com', name: 'Test User' },
            }),
          ),
        })),
      },
    }))

    renderWithRouter(<ProfileEditRoute />, '/profile-edit')

    // Wait for async fetch to complete
    await screen.findByDisplayValue('Test User')

    const email = await screen.findByDisplayValue('test@email.com')
    const name = await screen.findByDisplayValue('Test User')

    expect(email).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })

  it('handles changes in input fields', async () => {
    renderWithRouter(<ProfileEditRoute />, '/profile-edit')

    const emailInput = await screen.findByDisplayValue('test@email.com')
    const nameInput = await screen.findByDisplayValue('Test User')

    fireEvent.change(emailInput, { target: { value: 'newemail@email.com' } })
    fireEvent.change(nameInput, { target: { value: 'New User' } })

    expect(emailInput.value).toBe('newemail@email.com')
    expect(nameInput.value).toBe('New User')
  })

  it('handles save changes click', async () => {
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
    vi.mock('../../clients/supabase', () => ({
      supabase: {
        auth: {
          user: vi.fn(() => ({ id: 1 })),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn(() =>
            Promise.resolve({
              data: { id: 1, email: 'test@email.com', name: 'Test User' },
            }),
          ),
          update: vi.fn(() => Promise.resolve({})),
        })),
      },
    }))

    renderWithRouter(<ProfileEditRoute />, '/profile-edit')
    const saveButton = await screen.findByRole('button', { name: 'Save Changes' })

    fireEvent.click(saveButton)

    expect(mockAlert).toHaveBeenCalled()
    mockAlert.mockRestore()
  })

  it('fail to find user to will keep loading', () => {
    vi.spyOn(supabase.auth, 'user').mockReturnValueOnce(null)
    renderWithRouter(<ProfileEditRoute />, '/profile-edit')

    const loading = screen.getByText('Loading...')
    expect(loading).toBeInTheDocument()
  })
})
