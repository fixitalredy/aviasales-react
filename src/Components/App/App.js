import React from 'react';

import Content from '../Content/Content';

import logo from './Logo.png';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="Wrapper">
        <img src={logo} width={60} height={60} alt="logo" />
        <Content />
      </div>
    </div>
  );
}

export default App;
