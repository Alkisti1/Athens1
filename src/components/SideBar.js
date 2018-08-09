import React, {Component} from 'react';
import {places} from './ListPlaces';


export default class SideBar extends Component {




render() {
  return (
    <div className='list-places'>
    <div className='list-places-top'>
    <input
    className='search-places'
    type='text'
    placeholder='Search places'
    />
    </div>
    <ul className='places-list'>
    {places.map((place) => (
      <li key={place.id}
className='list-item'
onClick={this.props.listItemClicked.bind(this, place)}

      >
      {place.name}
      </li>
    ))}

    </ul>
    </div>
  )
}

}
