import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";
import wrap from './assets/wrap.png';
import highlights from './assets/highlights.png';
import helpers from './helpers';
import Game from './game'


class ByRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
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
                  <li className="listRound-section" key={i}>
                    
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

export default ByRound;
