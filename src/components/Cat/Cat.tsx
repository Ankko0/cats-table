import React, { Component } from "react";
import "./Cat.css";

interface IState {
  isHungry: boolean;
}

interface IProps {
  id: string;
  name: string;
  color: string;
  hasCollar: boolean;
  deleteCat: Function;
}

export default class Cat extends Component<IProps, IState> {
  hungryTimer: any;
  deleteTimer: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isHungry: false,
    };
  }

  makeCatHungry() {
    this.deleteTimer = setInterval(() => {
      if (this.state.isHungry) {
        this.props.deleteCat(this.props.id, this.props.hasCollar);
      }
    }, 5000);
    this.setState({ isHungry: true });
  }

  feedCat() {
    clearInterval(this.deleteTimer);
    this.setState({ isHungry: false });
  }

  componentDidMount() {
    this.hungryTimer = setInterval(() => this.makeCatHungry(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.hungryTimer);
  }

  render() {
    return (
      <div className="Cat">
        Name: {this.props.name} <br />
        Color : {this.props.color} <br />
        Has collar: {this.props.hasCollar ? "Yes" : "No"} <br />
        Is hungry: {this.state.isHungry ? "Yes" : "No"} <br />
        {this.state.isHungry && (
          <button onClick={() => this.feedCat()}> Fide cat</button>
        )}
      </div>
    );
  }
}
