import React from 'react';

const SideBar = (props) => {

  const { places, listMarker } = props;

// https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4
  const newPlaceList = places
      .filter (place => {
        return place.name.toLowerCase().indexOf(listMarker.toLowerCase()) >= 0;
      })
      .map(place => {
        return (
          <li key={place.id} className='list-item'
          onClick={props.listItemClicked.bind(this, place)}>{place.name}
          </li>
        );
      });

  return (
      <nav id='menu' className='menu'>

        <input type='text' placeholder='filter results' className='search-places' value={listMarker}
        onChange={(event) => props.updatelistMarker(event.target.value)}
        tabIndex={2}
        />
          <ul className='places-list'>
            {newPlaceList}
          </ul>
      </nav>
    );
};

export default SideBar;
