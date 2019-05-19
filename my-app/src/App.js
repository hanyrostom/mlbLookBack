import React from "react";
import "./assets/reset.css";
import "./assets/App.css";
import mlbLogo from "./assets/mlbLogo.svg";
import Schedule from "./schedule";
import ErrorPage from './errorPage';
import Loader from './loader'

// add variables for page status

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationState: 'FETCHING_DATA',
      data: null,
    };
  }

 componentDidMount() {
   fetch(
      "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"
    )
      .then(res => res.json())
      .then(data => this.setState({ data: data.series, applicationState: 'HAS_DATA' }))
      .catch(err => this.setState({ applicationState: 'MISSING_DATA' }))
  }

  render() {
    let { data, applicationState } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={mlbLogo} className="App-logo" alt="logo" />
        </header>


        <Loader data = {data} applicationState = {applicationState}>
          <Schedule games ={ data } />
        </Loader>

      </div>
    );
  }
}

export default App;
