import React, { Component } from "react";
import Cat from "../Cat/Cat";

interface IProps {
  cats: {
    id: string;
    name: string;
    color: string;
    hasCollar: boolean;
  }[];
  handleDeleteCat: Function;
}

export default class CatTable extends Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      cats: [],
    };
  }

  render() {
    return (
      <>
        {this.props.cats.map((cat) => (
          <Cat
            key={cat.id}
            id={cat.id}
            name={cat.name}
            color={cat.color}
            hasCollar={cat.hasCollar}
            deleteCat={this.props.handleDeleteCat}
          />
        ))}
      </>
    );
  }
}
