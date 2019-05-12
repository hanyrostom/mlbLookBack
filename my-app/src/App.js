import React from "react";
import "./assets/reset.css";
import "./assets/App.css";
import mlbLogo from "./assets/mlbLogo.svg";
import Schedule from "./schedule"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)")
      .then(res => res.json())
      .then(data=> this.setState({data: data.series}))
      .catch(err => console.error(err))
  }

  render() {
    let { data } = this.state;
    console.log('data: ', data)
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={mlbLogo} className="App-logo" alt="logo" />
        </header>
          {data? <Schedule games ={ data } />: null}
      </div>
    );
  }
}

export default App;
