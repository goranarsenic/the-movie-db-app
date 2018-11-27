import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <div>
        {this.renderHeader()}
        {this.renderData(data)}
      </div>
    );
  };

  renderHeader() {
    return (
      <div>
        <div>
          <button onClick={() => this.setActiveCategory(CATEGORIES.MOVIES)}>
            Movies
          </button>
          <button onClick={() => this.setActiveCategory(CATEGORIES.TV_SHOWS)}>
            TV Shows
          </button>
        </div>
        <div>
          <input
            type='text'
            placeholder='Search'
            value={this.state.searchText}
            onChange={e => this.onSearchChange(e)}
          />
        </div>
      </div>
    )
  };


  renderData(data) {
    if (!data.length) {
      return <h3>Sorry! There is nothing</h3>
    }
    // show only 10 top rated, but show all results from search
    const list = this.state.searchText.length < MIN_TEXT_LENGTH_TO_SEARCH ? data.slice(0, 10) : data;

    return this.renderList(list)
  };

  renderList(list) {
    return list.map(item => (
      <Link
      to={`/details/${this.state.activeCategory}/${item.id}`}
      key={item.id}>
        <h1>{item.name || item.title}</h1>
        <p>{item.overview}</p>
      </Link>
    ))
  };
};

export default Home
