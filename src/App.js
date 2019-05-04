import React from 'react';
import './App.css';

//Components
import Layout from './layout';

function App() {
  window.johnValue = 100;
  window.karenValue = 100;
  window.socialAcceptance = 100;
  return (
    <div className="app">
      <Layout />
    </div>
  );
}

export default App;
