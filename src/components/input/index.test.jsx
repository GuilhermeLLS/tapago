import { render, screen, fireEvent } from '@testing-library/react'
import Input from '.'
import { describe, expect, it } from 'vitest'

describe('<Input />', () => {
  const setup = () => {
    const utils = render(
      <Input type="email" id="email" label="Email" required errorMessage="Please enter a valid email." />,
    )
    const input = screen.getByRole('textbox')
    return {
      input,
      ...utils,
    }
  }

  it('renders without crashing', () => {
    const { input } = setup()
    expect(input).toBeInTheDocument()
  })

  it('displays label correctly', () => {
    setup()
    const label = screen.getByText('Email')
    expect(label).toBeInTheDocument()
  })

  it('displays error message when input is invalid', () => {
    const { input } = setup()
    fireEvent.blur(input)
    const errorMessage = screen.getByText('Please enter a valid email.')
    expect(errorMessage).toBeInTheDocument()
  })

  it('does not display error message when input is valid', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'test@email.com' } })
    fireEvent.blur(input)
    const errorMessage = screen.queryByText('Please enter a valid email.')
    expect(errorMessage).not.toBeInTheDocument()
  })

  it('changes the value when typing into the input', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'test@email.com' } })
    expect(input).toHaveValue('test@email.com')
  })

  it('displays error message when input is left empty', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.blur(input)
    const errorMessage = screen.getByText('Please enter a valid email.')
    expect(errorMessage).toBeInTheDocument()
  })
})
