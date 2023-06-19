import { render, screen, fireEvent, act } from '@testing-library/react'
import UploadPostForm from '.'
import { uploadPost } from '../../clients/supabase'
import { vi, describe, it, expect } from 'vitest'

// Mocking the uploadPost function from supabase client
vi.mock('../../clients/supabase', () => ({
  uploadPost: vi.fn(),
}))

describe('<UploadPostForm />', () => {
  it('renders UploadPostForm and checks form interaction', () => {
    const onClose = vi.fn()
    render(<UploadPostForm onClose={onClose} isOpen={true} />)

    // Mocking URL.createObjectURL() to simply return the File object's name
    const URLMock = {
      createObjectURL: vi.fn((file) => file.name),
    }
    vi.stubGlobal('URL', URLMock)

    // Test input interaction
    const captionInput = screen.getByLabelText(/Legenda/i)
    act(() => {
      fireEvent.change(captionInput, { target: { value: 'Test caption' } })
    })
    expect(captionInput.value).toBe('Test caption')

    const locationInput = screen.getByLabelText(/Localização/i)
    act(() => {
      fireEvent.change(locationInput, { target: { value: 'Test location' } })
    })
    expect(locationInput.value).toBe('Test location')

    // Mocking file input
    const file = new File(['sample'], 'sample.png', { type: 'image/png' })
    const imageInput = screen.getByLabelText(/Imagem/i)
    act(() => {
      fireEvent.change(imageInput, { target: { files: [file] } })
    })
    expect(imageInput.files[0]).toBe(file)
    expect(screen.getByAltText('not found')).toBeInTheDocument() // Check that preview image is displayed

    // Test close button interaction
    act(() => {
      fireEvent.click(screen.getByText(/Cancelar/i))
    })
    expect(onClose).toHaveBeenCalledTimes(1)

    // Test submit button interaction
    act(() => {
      fireEvent.click(screen.getByText(/Enviar/i))
    })
    expect(uploadPost).toHaveBeenCalledTimes(1)
    expect(uploadPost).toHaveBeenCalledWith({
      imageUri: expect.any(File),
      caption: 'Test caption',
      location: 'Test location',
    })
    expect(onClose).toHaveBeenCalledTimes(2) // Called once from before and once from the submit button
    vi.unstubAllGlobals()
  })
})
