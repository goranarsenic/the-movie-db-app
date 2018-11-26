import axios from 'axios';

import config from '../config';

export const ADD_TV_SHOW_DATA = 'ADD_TV_SHOW_DATA'
export const ADD_TV_SHOW_DETAILS = 'ADD_TV_SHOW_DETAILS'

export const addAPIData = data => {
  return {
    type: ADD_TV_SHOW_DATA,
    payload: data
  };
};

export const addAPIDetails = details => {
  return {
    type: ADD_TV_SHOW_DETAILS,
    payload: details
  };
};

export const getTopRatedTVShows = () => {
  return function (dispatch, getState) {
    axios
      .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${config.API_KEY}`)
      .then(response => {
        dispatch(addAPIData(response.data.results));
      })
  };
};

export const findTVShows = text => {
  return dispatch => {
    axios
      .get(`https://api.themoviedb.org/3/search/tv?api_key=${config.API_KEY}&query=${text}`)
      .then(response => {
        dispatch(addAPIData(response.data))
      })
  };
};

export const getTVShowDetails = id => {
  return dispatch => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${config.API_KEY}`)
      .then(response => {
        dispatch(addAPIDetails(response.data))
      })
  };
};
