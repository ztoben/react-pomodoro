import React, {Component} from 'react';
import Timer from './timer';
import '../style/app.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Timer/>
      </div>
    )
  }
}
