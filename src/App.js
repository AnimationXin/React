import React, { Component } from 'react';
import Server from './component/server';
import Header from './component/header';
import OtherApp from './component/Otherapp';
import Splike from './component/spike';
import Like from './component/like';
import './lib/index.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Server />
        <Header source="http://localhost:3000/data/swiper" />
        <OtherApp source="http://localhost:3000/data/otherapp" />
        <Splike source="http://localhost:3000/data/spike" />
        <Like source="http://localhost:3000/data/like" />
        <div className="container">
          <ul>
              <li>首页</li>
              <li>分类</li>
              <li>购物车</li>
              <li>个人</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
