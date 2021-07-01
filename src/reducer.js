import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SET_STORIES:
      const { hits, page, nbPages } = action.payload
      return {
        ...state,
        hits,
        page,
        nbPages,
        isLoading: false,
      }
    case REMOVE_STORY:
      const newStories = state.hits.filter(
        (story) => story.objectID !== action.payload
      )
      return {
        ...state,
        hits: newStories,
      }
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      }
    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return {
          ...state,
          page: nextPage
        }
      }
        if (action.payload === 'dec') {
          let prevPage = state.page - 1
          if (prevPage < 0) {
            prevPage = state.nbPages - 1
          }
          return {
            ...state,
            page: prevPage
          }
        }
      
      return {
        ...state,
      }
    default:
      throw new Error(`no matching "${action.type}" type`)
  }
}

export default reducer
