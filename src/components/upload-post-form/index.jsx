import { Dialog } from '@headlessui/react'
import Input from '../input'
import Button from '../button'
import { useState } from 'react'
import { uploadPost } from '../../clients/supabase'

export default function UploadPostForm({ onClose, isOpen }) {
  const [location, setLocation] = useState('')
  const [caption, setCaption] = useState('')
  const [previewImage, setPreviewImage] = useState()
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <header className="flex justify-between pt-4 px-4 pb-2 items-center border-b border-b-gray-300">
            <p></p>
            <Dialog.Title className="text-center font-bold text-lg">Criar Post</Dialog.Title>
            <p className="hover:bg-gray-100 rounded-full cursor-pointer text-sm p-2" onClick={onClose}>
              &#x2715;
            </p>
          </header>
          <div className="flex flex-col  px-4 pb-4 pt-2 space-y-4">
            <Input
              name="caption"
              id="caption_input"
              label="Legenda"
              placeholder="Legenda"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Input
              name="location"
              id="location_input"
              label="Localização"
              placeholder="Localização"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              name="image"
              id="image_input"
              label="Imagem"
              type="file"
              accept=".jpg, .jpeg, .png"
              placeholder="Imagem"
              onChange={(e) => setPreviewImage(e.target.files[0])}
            />
            {previewImage && (
              <div>
                <img alt="not found" width={'250px'} src={URL.createObjectURL(previewImage)} />
                <br />
                <button onClick={() => setPreviewImage(null)}>Remove</button>
              </div>
            )}
            <div className="flex space-x-2 self-end">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  uploadPost({ imageUri: previewImage, caption, location })
                  onClose()
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
