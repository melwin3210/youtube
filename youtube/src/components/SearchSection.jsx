import React, { useState } from 'react'

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const suggestions = [
    'React tutorial',
    'JavaScript basics',
    'Node.js course',
    'CSS flexbox',
    'Python programming',
    'Web development',
    'React hooks',
    'MongoDB tutorial'
  ]
  
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className='flex flex-9 relative'>
      <div className='relative w-1/2 m-2'>
        <input 
          type="text" 
          placeholder='Search' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className='w-full border border-gray-400 rounded-lg p-2'
        />
        {showSuggestions && searchQuery && (
          <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
            {filteredSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                onMouseDown={() => {
                  setSearchQuery(suggestion)
                  setShowSuggestions(false)
                }}
                className='p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0'
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className='bg-red-500 text-white rounded-lg p-2 m-2'>Search</button>
    </div>
  )
}

export default SearchSection