import React, {Component} from 'react';
import '../style/timer.scss';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      minutes: 0,
      seconds: 0
    }
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  renderSeconds = seconds => {
    return String(seconds).padStart(2,0);
  };

  addMinute = () => {
    if (this.state.minutes < 60) this.setState({
      minutes: this.state.minutes + 1
    });
  };

  subtractMinute = () => {
    if (this.state.minutes > 0 || this.state.seconds > 0) {
      if (this.state.minutes === 0) {
        this.setState({
          minutes: 0,
          seconds: 0,
          started: false
        });
      } else {
        this.setState({
          minutes: this.state.minutes - 1
        });
      }
    }
  };

  tick = () => {
    let {seconds, minutes, started} = this.state;

    if (started) {
      if (seconds > 0) seconds--;

      if (seconds === 0) {
        if (minutes > 0) {
          minutes--;

          this.setState({
            minutes,
            seconds: 59
          });
        } else if (minutes === 0) {
          this.setState({
            seconds: 0,
            minutes: 0,
            started: false
          });
        }
      } else {
        this.setState({
          seconds,
          minutes
        });
      }
    }
  };

  toggleStarted = () => {
    const started = !this.state.started;

    this.setState({
      started
    });
  };

  render() {
    const {
      started,
      minutes,
      seconds
    } = this.state;

    return (
      <div className="timer-container">
        <div className="timer">
          <button onClick={this.subtractMinute}>-</button>
          <span>{minutes}:{this.renderSeconds(seconds)}</span>
          <button onClick={this.addMinute}>+</button>
        </div>
        <div className="controls">
          <button onClick={this.toggleStarted}>
            {started ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    )
  }
}
