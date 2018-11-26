import { combineReducers } from 'redux';
import { ADD_TV_SHOW_DATA, ADD_TV_SHOW_DETAILS } from '../actions/tvShows'

const addAPIData = (state={}, action) => {
  if (action.type === ADD_TV_SHOW_DATA) {
    return ({
      ...state,
      data: action.payload
    })
  }
  return state;
}

const addDetails = (state={}, action) => {
  if (action.type === ADD_TV_SHOW_DETAILS) {
    return ({
      ...state,
      details: action.payload
    })
  }
  return state;
}

export default combineReducers({
  addAPIData,
  addDetails
});
