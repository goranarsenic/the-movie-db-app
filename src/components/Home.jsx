import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends Component {
  static propTypes = {
    data: PropTypes.array,
    getTopRatedTVShows: PropTypes.func,
    findTVShows: PropTypes.func
  }


  componentDidMount() {
    this.props.getTopRatedTVShows();
  }

  renderData (data) {
    return data.slice(0,10).map(item => (
      <Link
        to={`/details/${item.id}`}
        key={item.id}>
        <h1>{item.name}</h1>
        <p>{item.overview}</p>
      </Link>
    ))
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Link to='/details/12'>Back</Link>
        {this.renderData(data)}
      </div>);
  }
}

export default Home
