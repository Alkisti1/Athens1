import React from 'react';
import Logo from '../img/greekCulture.png';

const Top = () => (
  <header className="top">
    <h1 className="top-title">
      <img src={Logo} alt="Cycladic Sculpture" className="icon"/>
      <span> Visit the main landmarks of Athens</span>
    </h1>
  </header>
);

export default Top;
