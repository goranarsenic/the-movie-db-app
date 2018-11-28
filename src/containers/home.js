import { connect } from 'react-redux';

import Home from '../components/home/Home.jsx';

import { setActiveCategory } from '../actions';

import {
  getTopRatedTVShows,
  findTVShows
} from '../actions/tvShows'

import {
  getTopRatedMovies,
  findMovies
} from '../actions/movies'

const mapStateToProps = state => ({
  data: state.data || [],
  searchText: state.searchText,
  activeCategory: state.activeCategory
})

const mapDispatchToProps = {
  setActiveCategory,
  getTopRatedTVShows,
  findTVShows,
  getTopRatedMovies,
  findMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
