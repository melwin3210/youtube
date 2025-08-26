import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestions } from '../store/slices/searchSuggestionSlice'

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dispatch = useDispatch()

  const [suggestionList, setSuggestionsList] = useState([])

  const filteredSuggestions = suggestionList?.filter(suggestion =>
    suggestion?.toLowerCase().includes(searchQuery?.toLowerCase())
  )
  const suggestionsCache = useSelector(state => state.searchSuggestion.suggestions)


  useEffect(() => {
    let searchSuggestionDebounce;
    if (suggestionsCache[searchQuery]) {
      setSuggestionsList(suggestionsCache[searchQuery])
    } else {
      searchSuggestionDebounce = setTimeout(() => {
        fetchSuggestionList()
      }, 300)
    }


    return () => clearTimeout(searchSuggestionDebounce)

  }, [searchQuery])

  const fetchSuggestionList = async () => {
    const data = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${searchQuery}`)
    const json = await data.json()

    setSuggestionsList(json[1])
    dispatch(setSuggestions({ [searchQuery]: json[1] }))



  }

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