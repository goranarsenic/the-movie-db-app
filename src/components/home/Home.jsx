import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from './Header';

import './style.css'

export const CATEGORIES = {
  MOVIES: 'movies',
  TV_SHOWS: 'tv'
};

const MIN_TEXT_LENGTH_TO_SEARCH = 3;

class Home extends Component {
  static propTypes = {
    data: PropTypes.array,
    searchText: PropTypes.string,
    activeCategory: PropTypes.string,
    setActiveCategory: PropTypes.func,
    getTopRatedTVShows: PropTypes.func,
    findTVShows: PropTypes.func
  }

  state = {
    searchText: this.props.searchText || '',
    activeCategory: this.props.activeCategory
  }


  componentDidMount() {
    // don't call api if data is present (when coming back from details page)
    if (this.props.data.length) return;
    this.getTopRated();
  };

  setActiveCategory(category) {
    this.setState({
      ...this.state,
      activeCategory: category,
      searchText: ''
    }, () => this.getTopRated() )
    this.props.setActiveCategory(category);
  }

  getTopRated() {
    this.state.activeCategory === CATEGORIES.TV_SHOWS ? this.props.getTopRatedTVShows() : this.props.getTopRatedMovies()
  }

  find(text) {
    this.props.activeCategory === CATEGORIES.TV_SHOWS ? this.props.findTVShows(text) : this.props.findMovies(text)
  }

  onSearchChange(e) {
    const text = e.target.value;
    // check if need to load top rated data
    if (text.length === MIN_TEXT_LENGTH_TO_SEARCH - 1 && this.state.searchText.length === MIN_TEXT_LENGTH_TO_SEARCH) this.getTopRated();
    if (text.length >= MIN_TEXT_LENGTH_TO_SEARCH) this.find(text);
    this.setState({
      ...this.state,
      searchText: text
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div className='container-flex'>
        {this.renderHeader()}
        {this.renderData(data)}
      </div>
    );
  };

  renderHeader() {
    return (
      <Header
        activeCategory={this.state.activeCategory}
        setActiveCategory={this.setActiveCategory.bind(this)}
        searchText={this.state.searchText}
        onSearchChange={this.onSearchChange.bind(this)} />
    )
  }

  renderData(data) {
    if (!data.length) {
      return (
        <div className='container'>
          <h1>No results.</h1>
        </div>
      )
    }
    // show only 10 top rated, but show all results from search
    const list = this.state.searchText.length < MIN_TEXT_LENGTH_TO_SEARCH ? data.slice(0, 10) : data;

    return (
      <div className='container'>
        <div className='row'>
          {this.renderList(list)}
        </div>
      </div>
    )
  };

  renderList(list) {
    return list.map(item => (
      <div key={item.id} className='col-md-6 list-items'>
        <Link
          to={`/details/${this.state.activeCategory}/${item.id}`}
          className='item-link'>
          <div className='list-item'>
            <div>
              <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt='poster' className='item-poster' />
            </div>
            <div className='item-name'>
              <h1>{item.name || item.title}</h1>
            </div>
          </div>
        </Link>
      </div>
    ))
  };
};

export default Home
