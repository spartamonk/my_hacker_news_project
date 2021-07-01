import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const { query, searchStory } = useGlobalContext()
  return (
    <form
      action=''
      className='search-form'
      onSubmit={(e) => e.preventDefault()}
    >
      <h2>search christopher's latest hacker news</h2>
      <input
        type='text'
        className='form-input'
        value={query}
        onChange={e=>searchStory(e.target.value)}
      />
    </form>
  )
}

export default SearchForm
