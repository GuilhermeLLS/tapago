import { describe, expect, it } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'
import RegisterRoute from '.'

describe('RegisterRoute', () => {
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

    fireEvent.change(nameInput, { target: { value: 'Test' } })
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(nameInput).toHaveValue('Test')
    expect(emailInput).toHaveValue('test@email.com')
    expect(passwordInput).toHaveValue('123456')
  })
})
