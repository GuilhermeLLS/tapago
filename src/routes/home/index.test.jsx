import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import HomeRoute from '.'
import { renderWithRouter } from '../../test-utils'

vi.mock('../../hooks/usePosts', () => {
  return {
    'default': () => [
      {
        id: 1,
        created_at: '2023-05-19T23:02:02.292783+00:00',
        author_id: '75624a5a-c944-498b-8a2d-bdbc52cd48b4',
        caption: 'NOVO POST',
        photo:
          'https://media.licdn.com/dms/image/D4D03AQHHaDJFKlrbMg/profile-displayphoto-shrink_200_200/0/1670903567181?e=1689811200&v=beta&t=8xt4T7xBXGISRQO0fqGCHKFE0BKKdM-pHwXgn0RQwzs',
        location: 'BELO HORIZONTE UAI',
      },
    ],
  }
})

describe('HomeRoute', () => {
  it('render upload button in home route', () => {
    renderWithRouter(<HomeRoute />, '/')
    const uploadButton = screen.getByRole('button', { name: 'Upload' })
    expect(uploadButton).toBeInTheDocument()
  })

  it('render posts in home route', () => {
    renderWithRouter(<HomeRoute />, '/')

    const posts = screen.getAllByRole('img')
    expect(posts).toHaveLength(1)
  })

  it('changes the sort state when sort selection changes', () => {
    renderWithRouter(<HomeRoute />, '/')
  
    const sortSelect = screen.getByRole('combobox')
  
    fireEvent.change(sortSelect, { target: { value: 'Ascending' } })
    expect(sortSelect.value).toBe('Ascending')
  
    fireEvent.change(sortSelect, { target: { value: 'Descending' } })
    expect(sortSelect.value).toBe('Descending')
  })

  it('alerts when Upload button is clicked', () => {
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {})
  
    renderWithRouter(<HomeRoute />, '/')
    const uploadButton = screen.getByRole('button', { name: 'Upload' })
  
    fireEvent.click(uploadButton)
    expect(mockAlert).toHaveBeenCalledWith('replace me!!')
  
    mockAlert.mockRestore()
  })

  it('renders posts with correct content', () => {
    renderWithRouter(<HomeRoute />, '/')
  
    const postCaption = screen.getByText('NOVO POST')
    const postLocation = screen.getByText('BELO HORIZONTE UAI')
    const postDate = screen.getByText('2023-05-19T23:02:02.292783+00:00')
  
    expect(postCaption).toBeInTheDocument()
    expect(postLocation).toBeInTheDocument()
    expect(postDate).toBeInTheDocument()
  })
  
  
  
})
