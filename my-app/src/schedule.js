import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";
import wrap from './assets/wrap.png';
import highlights from './assets/highlights.png';
import helpers from './helpers';
import Game from './game'


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
		

    return (
      <div className="scheduele-container">
        <header className="scheduele-header">
          <h1 className='title'>Schedule</h1>
        </header>
        <hr />
        <ul className="schedule-list">
          {games.map((game, j) => (
            <li className="listItem-section" key={j}>
              <ul className="listed-games">
                {game[0][j].map((game, i) => (
                  <li className="listGame-section" key={i}>
                    { i === 0? <h2 className='section-date'>
                      {helpers.days[new Date(game.gameDate).getDay()]},{" "}
                      {new Date(game.gameDate).toDateString().slice(4, 10)}
                    </h2> : null }
                    <Game game={game}/>
										
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
