import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";
import helpers from './helpers';

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
                        <h4>description</h4>
                        <div>
                          <a href="http://google.com">
                            <span>img tag!</span>
                            <span>{game.awayTeam}</span>
                            <span>@</span>
                          </a>
                          <a href="http://google.com">
                            <span>img tag!</span>
                            <span>team</span>
                          </a>
                        </div>
                      </div>
                      <div>
                        <>final?</>
                        <>coverage</>
                      </div>
                      <div>
                        <span>W</span>
                        <span>L</span>
                        <span>Sv?</span>
                      </div>
                      <div className="catchup">
                        <div>wrap</div>
                        <div>HL</div>
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
