import { useState } from 'react'
import ComputeLevenshteinDistance from '../../utils/sortingAlg'
import usePosts from '../../hooks/usePosts'
const SearchBar = ({ onSuggestionClick, setSearchTerm }) => {
  let [item] = usePosts()
  const [suggestions, setSuggestions] = useState([])

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
      for (var i = 0; i < length; i++) {
        suggestions.push(item[i]?.caption.toLowerCase())
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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        className="border border-gray-200 rounded-md px-3 w-full py-2 mt-4"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
