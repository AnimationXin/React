import React, { Component } from 'react';
import Server from './component/server';
import Header from './component/header';
import OtherApp from './component/Otherapp';
import Splike from './component/spike';
import './lib/index.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Server />
        <Header source="http://localhost:3000/data/swiper" />
        <OtherApp source="http://localhost:3000/data/otherapp" />
        <Splike source="http://localhost:3000/data/spike" />
      </div>
    );
  }
}
export default App;
