import React from 'react';

import { CATEGORIES } from './Home';
import './style.css';

const logoPath = `${process.env.PUBLIC_URL}/images/tmdb.png`;

const Header = (props) => {

  const { activeCategory, setActiveCategory, searchText, onSearchChange } = props;
  return (
    <div className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10'>
            <button
              type='button'
              className={activeCategory === CATEGORIES.MOVIES ? 'btn btn-primary active' : 'btn btn-primary'}
              onClick={() => setActiveCategory(CATEGORIES.MOVIES)}>
                Movies
            </button>
            <button
              type='button'
              className={activeCategory === CATEGORIES.TV_SHOWS ? 'btn btn-primary active' : 'btn btn-primary'}
              onClick={() => setActiveCategory(CATEGORIES.TV_SHOWS)}>
                TV Shows
            </button>
          </div>
          <div className='col-md-2'>
            <img className='float-right' src={logoPath} alt='logo' height='50' />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 search'>
            <input
              className='form-control'
              type='text'
              placeholder='Search'
              value={searchText}
              onChange={e => onSearchChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
