import React, { Component } from 'react';

class Details extends Component {

  componentDidMount() {
    this.props.getTVShowDetails(this.props.match.params.id);
  }

  render() {
    const { details } = this.props;
    return (
      <div>
        <button onClick={() => this.props.history.goBack()}> BACK </button>
        <div>
          <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`} alt='poster' height='500' />
          <h1>{details.name}</h1>
          <p>{details.overview}</p>
        </div>
      </div>
    )
  }
}

export default Details;
