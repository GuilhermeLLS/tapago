import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import LoginRoute from '.'

describe('LoginRoute', () => {
  it('render the login route', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should fill email and passowrd inputs', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    
    expect(emailInput).toHaveValue('test@email.com')
    expect(passwordInput).toHaveValue('123456')
  })
})
