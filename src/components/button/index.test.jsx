import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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

  it('should handle onClick event', () => {
    const mockOnClick = vi.fn()
    render(<Button variant="secondary" onClick={mockOnClick} >Click me!</Button>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('should handle onFocus event', () => {
    const mockOnFocus = vi.fn();
    render(<Button variant="secondary" onFocus={mockOnFocus}>Click me!</Button>)
    const button = screen.getByRole('button')
    fireEvent.focus(button)
    expect(mockOnFocus).toHaveBeenCalled()
})

it('should handle onBlur event', () => {
    const mockOnBlur = vi.fn();
    render(<Button variant="secondary" onBlur={mockOnBlur}>Click me!</Button>)
    const button = screen.getByRole('button')
    fireEvent.blur(button)
    expect(mockOnBlur).toHaveBeenCalled()
})

it('should handle onMouseOver event', () => {
    const mockOnMouseOver = vi.fn();
    render(<Button variant="secondary" onMouseOver={mockOnMouseOver}>Click me!</Button>)
    const button = screen.getByRole('button')
    fireEvent.mouseOver(button)
    expect(mockOnMouseOver).toHaveBeenCalled()
})

it('should handle onMouseOut event', () => {
    const mockOnMouseOut = vi.fn();
    render(<Button variant="secondary" onMouseOut={mockOnMouseOut}>Click me!</Button>)
    const button = screen.getByRole('button')
    fireEvent.mouseOut(button)
    expect(mockOnMouseOut).toHaveBeenCalled()
})
})
