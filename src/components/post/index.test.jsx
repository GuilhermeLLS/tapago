import { render, screen } from '@testing-library/react'
import Post from './'
import { describe, expect, it } from 'vitest'

const mockData = {
  photo: 'image.png',
  caption: 'A test caption',
  location: 'Test Location',
  created_at: new Date('2023-01-01'),
}

describe('<Post />', () => {
  it('renders post image', () => {
    render(<Post {...mockData} />)

    const postImage = screen.getByAltText('Post')
    expect(postImage).toBeInTheDocument()
  })

  it('renders post caption', () => {
    render(<Post {...mockData} />)

    const postCaption = screen.getByText('A test caption')
    expect(postCaption).toBeInTheDocument()
  })

  it('renders post location', () => {
    render(<Post {...mockData} />)

    const postLocation = screen.getByText('Test Location')
    expect(postLocation).toBeInTheDocument()
  })

  it('renders post creation date', () => {
    render(<Post {...mockData} />)

    const postDate = screen.getByText('Dec 31, 22')
    expect(postDate).toBeInTheDocument()
  })
})
