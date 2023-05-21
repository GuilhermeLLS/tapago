import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from './index'

describe('Button', () => {
  it('should render the button with primary styles', () => {
    render(<Button variant="primary">Click me!</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-500 text-white')
  })

  it('should render the button with secondary styles', () => {
    render(<Button variant="secondary">Click me!</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-white text-blue-500')
  })

  it('should render the button with the children', () => {
    render(<Button variant="secondary">Click me!</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Click me!')
  })
})
