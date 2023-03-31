import './App.css';

import React, { Component } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize=20;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <LoadingBar
          height={3}
        color='#f11946'
        progress={this.state.progress}
          />
          
          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} key="general" pageSize={this.pagesize} country="in" category="general"/></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} key="business"pageSize={this.pagesize} country="in" category="business"/></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} key="entertainment"pageSize={this.pagesize} country="in" category="entertainment"/></Route>
            <Route exact path="/general"><News setProgress={this.setProgress} key="general" pageSize={this.pagesize} country="in" category="general"/></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} key="health" pageSize={this.pagesize} country="in" category="health"/></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} key="science" pageSize={this.pagesize} country="in" category="science"/></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} key="sports" pageSize={this.pagesize} country="in" category="sports"/></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} key="technology" pageSize={this.pagesize} country="in" category="technology"/></Route>
          </Switch>        
        </div>
      </Router>
    )
  }
}
