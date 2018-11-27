import React, { Component } from 'react';

import { CATEGORIES } from './Home';

class Details extends Component {

  componentDidMount() {
    const { id, category } = this.props.match.params;
    category === CATEGORIES.TV_SHOWS ? this.props.getTVShowDetails(id) : this.props.getMovieDetails(id);
  }

  render() {
    const { details } = this.props;
    return (
      <div>
        <button onClick={() => this.props.history.goBack()}> BACK </button>
        <div>
          {details.videoKey? this.renderTrailer(details.videoKey) : this.renderPoster(details.poster_path)}
          <h1>{details.name}</h1>
          <p>{details.overview}</p>
        </div>
      </div>
    )
  }

  renderPoster(poster_path) {
    return (
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt='poster' height='500' />
    )
  }

  renderTrailer(key) {
    return (
      <iframe title='trailer' width="420" height="315"
        src={`https://www.youtube.com/embed/${key}`}>
      </iframe>
    )
  }
}

export default Details;
