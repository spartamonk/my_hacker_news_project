import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  page: 0,
  nbPages: 0,
  query: 'react'
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async(url) => {
    dispatch({type: SET_LOADING});
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(data.hits) {
        dispatch({type: SET_STORIES, payload: {hits: data.hits, page: data.page, nbPages: data.nbPages }})
      }
    } catch (error) {
      console.log(error);
    }
   
  }
useEffect(()=> {
  fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
},[state.query, state.page])

const removeStory = (id) => {
  dispatch({type: REMOVE_STORY, payload: id })
}
const searchStory = query => {
  dispatch({ type: HANDLE_SEARCH, payload: query })
}
const handlePage = (value)=> {
  dispatch({ type: HANDLE_PAGE, payload: value })
}
  return (
    <AppContext.Provider value={{ ...state, removeStory, searchStory, handlePage }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }