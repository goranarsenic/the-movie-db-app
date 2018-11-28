import React, { Component } from 'react';

import { CATEGORIES } from '../home/Home';

import './style.css';

class Details extends Component {

  componentDidMount() {
    const { id, category } = this.props.match.params;
    category === CATEGORIES.TV_SHOWS ? this.props.getTVShowDetails(id) : this.props.getMovieDetails(id);
  }

  render() {
    const { details } = this.props;
    return (
      <div className='container-flow'>
        <div className='details-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => this.props.history.goBack()}>
                  BACK
                </button>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 trailer'>
                {details.videoKey? this.renderTrailer(details.videoKey) : this.renderPoster(details.poster_path)}
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1>{details.name || details.title}</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <p>{details.overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPoster(poster_path) {
    return (
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt='poster' height='600' />
    )
  }

  renderTrailer(key) {
    return (
      <iframe title='trailer' width='100%' height="600" style={{border:0}}
        src={`https://www.youtube.com/embed/${key}`}>
      </iframe>
    )
  }
}

export default Details;
