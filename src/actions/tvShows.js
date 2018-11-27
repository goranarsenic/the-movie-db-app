import axios from 'axios';

import config from '../config';

export const ADD_TV_SHOWS_DATA = 'ADD_TV_SHOWS_DATA'
export const ADD_TV_SHOW_DETAILS = 'ADD_TV_SHOW_DETAILS'

export const addAPIData = (data, searchText) => {
  return {
    type: ADD_TV_SHOWS_DATA,
    payload: {
      data,
      searchText
    }
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
        dispatch(addAPIData(response.data.results, text))
      })
  };
};

export const getTVShowDetails = id => {
  return dispatch => {
    axios.all([
      axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${config.API_KEY}`),
      axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${config.API_KEY}`)
    ])
    .then(axios.spread((detailsResponse, videoResponse) => {
      // fileter videos with trailers on youtube
      const videosWithTrailer = videoResponse.data.results.filter(video => {
        return video.site === 'YouTube' && video.type === 'Trailer';
      });

      const data = {
        ...detailsResponse.data,
        videoKey: videosWithTrailer[0] && videosWithTrailer[0].key
      }
      dispatch(addAPIDetails(data));
    }));
  };
};
