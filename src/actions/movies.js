import axios from 'axios';

import config from '../config';

export const ADD_MOVIES_DATA = 'ADD_MOVIES_DATA'
export const ADD_MOVIE_DETAILS = 'ADD_MOVIE_DETAILS'

export const addAPIData = (data, searchText) => {
  return {
    type: ADD_MOVIES_DATA,
    payload: {
      data,
      searchText
    }
  };
};

export const addAPIDetails = details => {
  return {
    type: ADD_MOVIE_DETAILS,
    payload: details
  };
};

export const getTopRatedMovies = () => {
  return function (dispatch, getState) {
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${config.API_KEY}`)
      .then(response => {
        dispatch(addAPIData(response.data.results));
      })
  };
};

export const findMovies = text => {
  return dispatch => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${config.API_KEY}&query=${text}`)
      .then(response => {
        dispatch(addAPIData(response.data.results, text))
      })
  };
};

export const getMovieDetails = id => {
  return dispatch => {
    axios.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.API_KEY}`),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${config.API_KEY}`)
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

      dispatch(addAPIDetails(data))
    }));
  };
};
