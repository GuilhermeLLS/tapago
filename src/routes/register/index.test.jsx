import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import RegisterRoute from '.'

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
          signUp: () => {
            return { error: null }
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

describe('RegisterRoute', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the register route', () => {
    renderWithRouter(<RegisterRoute />, '/register')

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const registerButton = screen.getByRole('button', { name: 'Register' })

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()
  })

  it('should fill name, email and password inputs', () => {
    renderWithRouter(<RegisterRoute />, '/register')

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Test' } })
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456' } })
    })

    expect(nameInput).toHaveValue('Test')
    expect(emailInput).toHaveValue('test@email.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('error on handleRegister sign up throws error', () => {
    renderWithRouter(<RegisterRoute />, '/register')
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')

    const registerButton = screen.getByRole('button', { name: 'Register' })

    act(() => {
      fireEvent.click(registerButton)
    })
    expect(nameInput).toBeEmptyDOMElement()
    expect(emailInput).toBeEmptyDOMElement()
  })
})
