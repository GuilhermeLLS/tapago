import React, { useState } from 'react';
import ComputeLevenshteinDistance from '../../utils/sortingAlg'

const SearchBar = (item) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
    var length = 0;

    for(var key in item) {
        if(item.hasOwnProperty(key)){
            length++;
        }
    }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Perform search suggestions based on the input value
    const newSuggestions = performSearchSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const performSearchSuggestions = (value) => {
    
    let suggestions = [];
    
    if(value.length > 1){
      for (var i = 0; i < length; i++) {
        suggestions.push(item[i].caption.toLowerCase())
    }
    }
    
    return suggestions.sort((a, b) => ComputeLevenshteinDistance.CalculateSimilarity(value,a) < ComputeLevenshteinDistance.CalculateSimilarity(value,b) ? 1 : 
    ComputeLevenshteinDistance.CalculateSimilarity(value,a) > ComputeLevenshteinDistance.CalculateSimilarity(value,b) ? -1 : 0);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-200 rounded-md px-3 w-full py-2 mt-4"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
