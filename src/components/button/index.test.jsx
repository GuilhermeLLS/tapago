import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from './index'

describe('Button', () => {
  it('should render the button with primary styles', () => {
    render(<Button variant="primary">Click me!</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-500')
  })
})
