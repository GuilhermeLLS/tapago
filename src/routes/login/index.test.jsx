import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest'
import * as supabase from '../../clients/supabase'
import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import LoginRoute from '.'

describe('LoginRoute', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })
  
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

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '123456' } })
    })

    expect(emailInput).toHaveValue('test@email.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('should not login with empty email and password', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const loginButton = screen.getByText('Login')

    act(() => {
      fireEvent.click(loginButton)
    })

    const spySignIn = vi.spyOn(supabase, 'signIn').mockImplementation(() => {})
    expect(spySignIn).toHaveBeenCalledTimes(0)
  })

  it('should not login with invalid email and password', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByText('Login')
    const spySignIn = vi.spyOn(supabase, 'signIn').mockReturnValue({ error: true })

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalid@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '0' } })
      fireEvent.click(loginButton)
    })

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

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'validSignedUp@email.com' } })
      fireEvent.change(passwordInput, { target: { value: 'strongPassword' } })
      fireEvent.click(loginButton)
    })

    expect(spySignIn).toHaveBeenCalledTimes(1)
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should navigate to the Sign Up page on clicking the Sign Up button', () => {
    renderWithRouter(<LoginRoute />, '/login')
    const signUpButton = screen.getByText('Dont have an account? Sign Up')

    act(() => {
      fireEvent.click(signUpButton)
    })

    expect(window.location.pathname).toBe('/register')
  })

  it('should alert error when fields are empty on submit', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    renderWithRouter(<LoginRoute />, '/login')
    const loginButton = screen.getByText('Login')

    act(() => {
      fireEvent.click(loginButton)
    })

    expect(window.alert).toHaveBeenCalledWith('Error: Please fill out all fields')
  })
})
