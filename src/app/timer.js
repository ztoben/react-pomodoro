import React, {Component} from 'react';
import Circle from 'react-circle';
import '../style/timer.scss';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      minutes: 0,
      seconds: 0,
      startingMinutes: 0,
      startingSeconds: 0,
      progress: '0'
    }
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.minutes !== this.state.minutes || prevState.seconds !== this.state.seconds) {
      if (this.state.minutes === 0 && this.state.seconds === 0) {
        this.setState({
          started: false
        });
      }
    }
  }

  renderSeconds = seconds => {
    return String(seconds).padStart(2,0);
  };

  addMinute = () => {
    this.setState({
      minutes: this.state.minutes + 5,
      startingMinutes: this.state.minutes + 5,
      startingSeconds: this.state.seconds
    });
  };

  subtractMinute = () => {
    if (this.state.minutes > 0 || this.state.seconds > 0) {
      if (this.state.minutes === 0) {
        this.setState({
          minutes: 0,
          seconds: 0,
          startingMinutes: 0,
          startingSeconds: 0,
          started: false
        });
      } else {
        this.setState({
          minutes: this.state.minutes - 1,
          startingMinutes: this.state.minutes - 1,
          startingSeconds: this.state.seconds
        });
      }
    }
  };

  setProgress = () => {
    const {
      startingMinutes,
      startingSeconds,
      minutes,
      seconds
    } = this.state;

    const progress =
      (startingMinutes === 0
        && startingSeconds === 0
        && minutes === 0
        && seconds === 0)
        ? '0' :  ((minutes * 60 + seconds) / (startingMinutes * 60 + startingSeconds) * 100).toString();

    this.setState({
      progress
    });
  };

  getTitle = () => {
    const {
      seconds,
      minutes
    } = this.state;

    if (minutes === 0 && seconds === 0) return 'Pomodoro Timer';

    return `Pomodoro Timer - [${minutes}:${this.renderSeconds(seconds)}]`;
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
            minutes: 0
          });
        }
      } else {
        this.setState({
          seconds,
          minutes
        });
      }
    }

    document.title = this.getTitle();
    this.setProgress();
  };

  toggleStarted = () => {
    const started = (this.state.minutes === 0 && this.state.seconds === 0) ? false : !this.state.started;

    this.setState({
      started
    });
  };

  render() {
    const {
      started,
      minutes,
      seconds,
      progress
    } = this.state;

    return (
      <div className="timer-container">
        <div className="timer">
          <button className="minus-time" onClick={this.subtractMinute}>-</button>
          <span>{minutes}:{this.renderSeconds(seconds)}</span>
          <button className="add-time" onClick={this.addMinute}>+</button>
        </div>
        <div className="controls">
          <button onClick={this.toggleStarted}>
            {started ? 'Stop' : 'Start'}
          </button>
        </div>
        <Circle
          animate={true}
          animationDuration="1s"
          responsive={true}
          lineWidth="4"
          progress={progress}
          progressColor="black"
          bgColor="lightgray"
          roundedStroke={false}
          showPercentage={false}
          showPercentageSymbol={false}
        />
      </div>
    )
  }
}
