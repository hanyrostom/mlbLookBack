import React from "react";
import wrap from "./assets/wrap.png";
import highlights from "./assets/highlights.png";

const Game = ({ game }) => (
    <div className="section-details">
      <div className="details-game day">
        <h4 className="section-description">
          <span>{game.description} - </span>
          <span>{game.result}</span>
        </h4>
        <div className="scores">
          <div className="scores-awayteam">
            <span
              alt={`${game.awayTeam} logo`}
              className={`team-logo ${game.awayTeam}`}
            />
            <p className="team-name">{game.awayTeam}</p>
            <p className="team-score">{game.awayTeamScore}</p>
          </div>
          <span style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}>@</span>
          <div className="scores-hometeam">
            <span
              alt={`${game.homeTeam} logo`}
              className={`team-logo ${game.homeTeam}`}
            />
            <p className="team-name">{game.homeTeam}</p>
            <p className="team-score">{game.homeTeamScore}</p>
          </div>
        </div>
      </div>
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
      <div className="catchup">
        <img alt="wrap" src={wrap} />
        <img alt="wrap" src={highlights} />
      </div>
    </div>
  )

export default Game;
