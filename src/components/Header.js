import React from 'react';
import Logo from '../img/greekCulture.png';

//create header banner
const Top = () => (
  <header className="top" role='presentation'>
    <h1 className="top-title">
      <img src={Logo} alt="Cycladic Sculpture" className="icon"/>
      <span> The main landmarks of Athens</span>
    </h1>
  </header>
);

export default Top;
