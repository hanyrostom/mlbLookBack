import React from "react";
import wrap from "./assets/wrap.png";
import highlights from "./assets/highlights.png";

const Game = ({ game, filter }) => (
    <div className={`section-details ${filter}`}>
      <div className={`game-main ${filter}`}>
      <div className={`details-game ${filter}`}>
        <h4 className={`section-description ${filter}`}>
          <span className={`description ${filter}`}>{game.description} - </span>
          <span className={`result ${filter}`}>{game.result}</span>
        </h4>
        <div className={`scores ${filter}`}>
          <div className={`scores-team ${filter}`}>
            <span
              alt={`${game.awayTeam} logo`}
              className={`team-logo ${game.awayTeam} ${filter}`}
            />
            <p className="team-name">{game.awayTeam}</p>
            <p className={`team-score ${game.awayTeam} ${filter}`}>{game.awayTeamScore}</p>
          </div>
          <span style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}>@</span>
          <div className={`scores-team ${filter}`}>
            <span
              alt={`${game.homeTeam} logo`}
              className={`team-logo ${game.homeTeam} ${filter}`}
            />
            <p className="team-name">{game.homeTeam}</p>
            <p className={`team-score ${game.awayTeam} ${filter}`}>{game.homeTeamScore}</p>
          </div>
        </div>
        <div className={`game-time ${filter}`}>
                  <h6 className='game'>Gm {game.gameNumber}</h6>
                  <h5 className='time'>{new Date(game.gameDate).toDateString().slice(4, 10)}</h5>
         </div>
      </div>
      <div className={`coverage-decisions ${filter}`}>
        
      <div className="game-info">
        <p className="info-status">{game.status}</p>
        <div alt={game.broadcast} className={`info-status ${game.broadcast}`} />
      </div>
      <div className="decisions">
        <p>
          W: <span className="name">{game.winner}</span>
        </p>
        <p>
          L: <span className="name">{game.loser}</span>
        </p>
        {game.save ? (
          <p>
            S: <span className="name">{game.save}</span>
          </p>
        ) : null}
      </div>
      </div>
      </div>
      <div className="catchup">
        <img alt="wrap" src={wrap} />
        <img alt="wrap" src={highlights} />
      </div>
    </div>
  )

export default Game;
