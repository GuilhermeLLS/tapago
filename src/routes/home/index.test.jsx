import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
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
})
