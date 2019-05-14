import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";
import wrap from './assets/wrap.png';
import highlights from './assets/highlights.png';
import helpers from './helpers';
import TBS from './assets/TBS.svg';
import ESPN from './assets/ESPN.svg';
import FS1 from './assets/FS1.svg';
import FS1INT from './assets/FS1-INT.svg';
import MLBN from './assets/MLBN.svg';
import FOX from './assets/FOX.svg';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
		let output = helpers.listGames(this.props.games)
    this.setState({games : output})
  }



  render() {
		let { games } = this.state;
		
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    return (
      <div className="scheduele-container">
        <header className="scheduele-header">
          <h1>Schedule</h1>
        </header>
        <hr />
        <ul className="schedule-list">
          {games.map((game, j) => (
            <li className="listItem-section" key={j}>
              {console.log(game[0][j])}
              <ul className="listed-games">
                {game[0][j].map((game, i) => (
                  <li className="listGame-section" key={i}>
                    {i === 0?<h2>
                      {days[new Date(game.gameDate).getDay()]},{" "}
                      {new Date(game.gameDate).toDateString().slice(4, 10)}
                    </h2> :null}
                    <div className="section-details">
                      <div>
                        <h4>{game.description}</h4>
                        <div>
                          <a href="http://google.com">
                            <span className={`teamLogo ${game.awayTeamCode}`}>##</span>
                            <span>{game.awayTeam}</span>
														<span className="team-score">{game.awayTeamScore}</span>

                            <span>@</span>
                          </a>
                          <a href="http://google.com">
                            <span className={`teamLogo ${game.homeTeamCode}`}>##</span>
                            <span>{game.homeTeam}</span>
														<span className="team-score">{game.homeTeamScore}</span>
                          </a>
                        </div>
                      </div>
                      <div className='game-info'>
                        <>{game.status}</>
                        <img alt={game.broadcast} src={game.broadcast}/>
                      </div>
                      <div className='decisions'>
                        <span>W:{game.winner}</span>
                        <span>L:{game.loser}</span>
                        {game.save? <span>S:{game.save}</span> : null}
                      </div>
                      <div className="catchup">
												<img alt='wrap' src={wrap}/>
                        <img alt='wrap' src={highlights}/>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Schedule;
