import { connect } from 'react-redux';

import Home from '../components/Details';

import {
  getTVShowDetails
} from '../actions/tvShows'

const mapStateToProps = state => ({
  details: state.addDetails.details || {}
});

const mapDispatchToProps = {
  getTVShowDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
