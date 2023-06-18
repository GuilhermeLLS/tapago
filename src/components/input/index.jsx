import { useRef, useState } from 'react'

export default function Input({ label, id, errorMessage, ...props }) {
  const [error, setError] = useState('')
  const inputRef = useRef()

  const validateInput = () => {
    if (!inputRef.current.validity.valid) {
      setError(errorMessage)
    } else {
      setError('')
    }
  }

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        id={id}
        ref={inputRef}
        className={`border border-gray-300 px-3 py-2 rounded-md ${error ? 'border-red-600' : ''}`}
        onBlur={validateInput}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}
