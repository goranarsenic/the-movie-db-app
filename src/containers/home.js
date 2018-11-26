import { connect } from 'react-redux';

import Home from '../components/Home';

import {
  getTopRatedTVShows,
  findTVShows
} from '../actions/tvShows'

const mapStateToProps = state => ({
  data: state.addAPIData.data || []
});

const mapDispatchToProps = {
  getTopRatedTVShows,
  findTVShows
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
