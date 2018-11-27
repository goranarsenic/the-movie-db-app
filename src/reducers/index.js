import { ADD_TV_SHOWS_DATA, ADD_TV_SHOW_DETAILS } from '../actions/tvShows';
import { ADD_MOVIES_DATA, ADD_MOVIE_DETAILS } from '../actions/movies';
import { SET_ACTIVE_CATEGORY } from '../actions';

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TV_SHOWS_DATA:
    case ADD_MOVIES_DATA:
      return ({
        ...state,
        data: action.payload.data,
        searchText: action.payload.searchText
      })
    case ADD_TV_SHOW_DETAILS:
    case ADD_MOVIE_DETAILS:
    return ({
        ...state,
        details: action.payload
      })
    case SET_ACTIVE_CATEGORY:
      return ({
        ...state,
        activeCategory: action.payload
      })
    default:
      return state;

  }
}

const INITIAL_STATE = {
  data: [],
  details: {},
  searchText: '',
  activeCategory: 'tv'
}
