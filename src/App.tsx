import React from "react";
import "./App.css";
import CatTable from "./components/CatTable/CatTable";
import { uniqueNamesGenerator, names, colors } from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";


interface ICat {
  id: string;
  name: string;
  color: string;
  hasCollar: boolean;
}

interface IState {
  myCats: ICat[];
  neighbourCats: ICat[];
}

class App extends React.Component<any, IState> {
  timerId: any;

  constructor(props: any) {
    super(props);

    this.state = {
      myCats: [],
      neighbourCats: [],
    };
  }

  generateCat() {
    const id = uuidv4();
    const name = uniqueNamesGenerator({
      dictionaries: [names],
    });
    const color = uniqueNamesGenerator({
      dictionaries: [colors],
      style: "capital",
    });
    const hasCollar = Math.random() > 0.5;
    if (hasCollar) {
      let myCats = [...this.state.myCats];
      myCats.push({
        id: id,
        name: name,
        color: color,
        hasCollar: hasCollar,
      });
      this.setState({ myCats });
    } else {
      let neighbourCats = [...this.state.neighbourCats];
      neighbourCats.push({
        id: id,
        name: name,
        color: color,
        hasCollar: hasCollar,
      });
      this.setState({ neighbourCats });
    }
  }

  deleteCat(id: string, hasCollar: boolean) {
    if (hasCollar)
      this.setState({
        myCats: this.state.myCats.filter((cat) => cat.id !== id),
      });
    else
      this.setState({
        neighbourCats: this.state.neighbourCats.filter(
          (cat) => cat.id !== id
        ),
      });
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.generateCat(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="App">
        <div className="Cat-table">
          <h1>My cats</h1>
          <CatTable
            cats={this.state.myCats}
            handleDeleteCat={this.deleteCat.bind(this)}
          />
        </div>

        <div className="Cat-table">
          <h1>Neighbour cats</h1>
          <CatTable
            cats={this.state.neighbourCats}
            handleDeleteCat={this.deleteCat.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
