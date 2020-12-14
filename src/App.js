import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import {Sankey} from './components/sankey';

import './App.css';
import "./styles.css";

class App extends React.Component {
  state = { data: null, width: 0, height: 0 };
  svgRef = React.createRef();

  componentDidMount() {
    d3.json("/sankey-data-results.json").then(data =>
      this.setState({ data })
    );
    this.measureSVG();
    window.addEventListener("resize", this.measureSVG);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measureSVG);
  }

  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();

    this.setState({
      width,
      height
    });
  };

  render() {
    const { data, width, height } = this.state;

    return (
      <div className="App">
        <h2>Transaction Visualization w/ Sankey</h2>
        <svg width="100%" height="600" ref={this.svgRef}>
          {data && (
            <Sankey data={data} width={width} height={height} />
          )}
        </svg>
      </div>
    );
  }
}

export default App;
