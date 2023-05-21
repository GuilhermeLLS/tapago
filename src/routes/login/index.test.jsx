import { afterEach, describe, it, expect, vi } from 'vitest'
import * as supabase from '../../clients/supabase'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import LoginRoute from '.'

describe('LoginRoute', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('render the login route', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should fill email and password inputs', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(emailInput).toHaveValue('test@email.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('should not login with empty email and password', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const loginButton = screen.getByText('Login')

    fireEvent.click(loginButton)

    const spySignIn = vi.spyOn(supabase, 'signIn').mockImplementation(() => {})
    expect(spySignIn).toHaveBeenCalledTimes(0)
  })

  it('should not login with invalid email and password', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByText('Login')
    const spySignIn = vi.spyOn(supabase, 'signIn').mockReturnValue({ error: true })

    fireEvent.change(emailInput, { target: { value: 'invalid@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '0' } })
    fireEvent.click(loginButton)

    expect(spySignIn).toHaveBeenCalledTimes(1)
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should login succesfully with correct email and password', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByText('Login')
    const spySignIn = vi.spyOn(supabase, 'signIn').mockReturnValue({ error: null })

    fireEvent.change(emailInput, { target: { value: 'validSignedUp@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'strongPassword' } })
    fireEvent.click(loginButton)

    expect(spySignIn).toHaveBeenCalledTimes(1)
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
})
