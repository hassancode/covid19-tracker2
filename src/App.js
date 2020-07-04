import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import './App.css';
import { CovidMap } from './components/CovidMap';

function App() {
  return (
    <div className="App">
     {/* <Header/>
     <Main/> */}
     <CovidMap/>
    </div>
  );
}

export default App;
