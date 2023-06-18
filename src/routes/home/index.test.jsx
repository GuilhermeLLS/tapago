import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, act } from '@testing-library/react'
import HomeRoute from '.'
import { renderWithRouter } from '../../test-utils'
import * as usePosts from '../../hooks/usePosts'

describe('HomeRoute', () => {
  it('render upload button in home route', () => {
    renderWithRouter(<HomeRoute />, '/')
    const uploadButton = screen.getByRole('button', { name: 'Upload' })
    expect(uploadButton).toBeInTheDocument()
  })

  it('render posts in home route', () => {
    vi.spyOn(usePosts, 'default').mockReturnValue([
      {
        id: 1,
        created_at: '2023-05-19T23:02:02.292783+00:00',
        author_id: '75624a5a-c944-498b-8a2d-bdbc52cd48b4',
        caption: 'NOVO POST',
        photo:
          'https://media.licdn.com/dms/image/D4D03AQHHaDJFKlrbMg/profile-displayphoto-shrink_200_200/0/1670903567181?e=1689811200&v=beta&t=8xt4T7xBXGISRQO0fqGCHKFE0BKKdM-pHwXgn0RQwzs',
        location: 'BELO HORIZONTE UAI',
      },
    ])
    renderWithRouter(<HomeRoute />, '/')

    const posts = screen.getAllByRole('img')
    expect(posts).toHaveLength(1)
  })

  it('render nothing if there are no posts', () => {
    vi.spyOn(usePosts, 'default').mockReturnValue([])
    renderWithRouter(<HomeRoute />, '/')

    const posts = screen.queryAllByRole('img')
    expect(posts).toHaveLength(0)
  })

  it('changes the sort state when sort selection changes', async () => {
    renderWithRouter(<HomeRoute />, '/')

    const sortSelect = screen.getByRole('combobox')

    act(() => {
      fireEvent.change(sortSelect, { target: { value: 'Ascending' } })
    })
    expect(sortSelect.value).toBe('Ascending')

    act(() => {
      fireEvent.change(sortSelect, { target: { value: 'Descending' } })
    })
    expect(sortSelect.value).toBe('Descending')
  })

  it('opens modal when Upload button is clicked', () => {
    const ResizeObserverMock = vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    }))

    vi.stubGlobal('ResizeObserver', ResizeObserverMock)

    renderWithRouter(<HomeRoute />, '/')
    const uploadButton = screen.getByRole('button', { name: 'Upload' })
    act(() => {
      fireEvent.click(uploadButton)
    })

    const modalTitle = screen.getByText('Criar Post')
    const cancelModalButton = screen.getByRole('button', { name: 'Cancelar' })
    const sendModalButton = screen.getByRole('button', { name: 'Enviar' })
    const inputs = screen.getAllByRole('textbox')
    const fileInput = screen.getByLabelText('Imagem')

    expect(modalTitle).toBeInTheDocument()
    expect(cancelModalButton).toBeInTheDocument()
    expect(sendModalButton).toBeInTheDocument()
    expect(inputs).toHaveLength(2)
    expect(fileInput).toBeInTheDocument()

    vi.unstubAllGlobals()
  })

  it('renders posts with correct content', () => {
    vi.spyOn(usePosts, 'default').mockReturnValue([
      {
        id: 1,
        created_at: '2023-05-19T23:02:02.292783+00:00',
        author_id: '75624a5a-c944-498b-8a2d-bdbc52cd48b4',
        caption: 'NOVO POST',
        photo:
          'https://media.licdn.com/dms/image/D4D03AQHHaDJFKlrbMg/profile-displayphoto-shrink_200_200/0/1670903567181?e=1689811200&v=beta&t=8xt4T7xBXGISRQO0fqGCHKFE0BKKdM-pHwXgn0RQwzs',
        location: 'BELO HORIZONTE UAI',
      },
    ])
    renderWithRouter(<HomeRoute />, '/')

    const postCaption = screen.getByText('NOVO POST')
    const postLocation = screen.getByText('BELO HORIZONTE UAI')
    const postDate = screen.getByText('May 19, 23')

    expect(postCaption).toBeInTheDocument()
    expect(postLocation).toBeInTheDocument()
    expect(postDate).toBeInTheDocument()
  })
})
