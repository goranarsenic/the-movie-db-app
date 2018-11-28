import { connect } from 'react-redux';

import Home from '../components/details/Details.jsx';

import {
  getTVShowDetails
} from '../actions/tvShows'

import {
  getMovieDetails
} from '../actions/movies'

const mapStateToProps = state => ({
  details: state.details
});

const mapDispatchToProps = {
  getTVShowDetails,
  getMovieDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
