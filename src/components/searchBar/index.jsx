import { Fragment, useState } from 'react'
import ComputeLevenshteinDistance from '../../utils/sortingAlg'
import usePosts from '../../hooks/usePosts'
import { Combobox } from '@headlessui/react'

const SearchBar = ({ onSuggestionClick, setSearchTerm, searchTerm }) => {
  let posts = usePosts()
  const [suggestions, setSuggestions] = useState([])

  let length = 0

  for (let key in posts) {
    // eslint-disable-next-line no-prototype-builtins
    if (posts.hasOwnProperty(key)) {
      length++
    }
  }

  const handleInputChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)

    // Perform search suggestions based on the input value
    const newSuggestions = performSearchSuggestions(value)
    setSuggestions(newSuggestions)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion)
    setSuggestions([])
    onSuggestionClick(suggestion)
  }

  const performSearchSuggestions = (value) => {
    let suggestions = []

    if (value.length > 1) {
      for (let i = 0; i < length; i++) {
        suggestions.push(posts[i]?.caption.toLowerCase())
      }
    }
    return suggestions.sort((a, b) =>
      ComputeLevenshteinDistance.CalculateSimilarity(value, a) <
      ComputeLevenshteinDistance.CalculateSimilarity(value, b)
        ? 1
        : ComputeLevenshteinDistance.CalculateSimilarity(value, a) >
          ComputeLevenshteinDistance.CalculateSimilarity(value, b)
        ? -1
        : 0,
    )
  }

  return (
    <Combobox>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            value={searchTerm}
            placeholder="Search"
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <Combobox.Options className="absolute mt-1 max-h-60 px-2 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {suggestions.map((suggestion) => (
            <Combobox.Option key={suggestion} value={suggestion} as={Fragment}>
              {({ active }) => (
                <li
                  className={`flex ${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div>{suggestion}</div>
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}

export default SearchBar
