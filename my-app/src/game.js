import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";
import wrap from "./assets/wrap.png";
import highlights from "./assets/highlights.png";
import helpers from "./helpers";

const Game = (props) => {

    return (
      <div className="section-details">
        <div className="details-game">
          <h4 className="section-description">
            <span>{props.game.description} - </span>
            <span>{props.game.result}</span>
          </h4>
          <div className="scores">
            <div className="scores-awayteam">
              <span
                alt={`${props.game.awayTeam} logo`}
                className={`team-logo ${props.game.awayTeam}`}
              />
              <p className="team-name">{props.game.awayTeam}</p>
              <p className="team-score">{props.game.awayTeamScore}</p>
            </div>
            <span style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}>
              @
            </span>
            <div className="scores-hometeam">
              <span
                alt={`${props.game.homeTeam} logo`}
                className={`team-logo ${props.game.homeTeam}`}
              />
              <p className="team-name">{props.game.homeTeam}</p>
              <p className="team-score">{props.game.homeTeamScore}</p>
            </div>
          </div>
        </div>
        <div className="game-info">
          <p className="info-status">{props.game.status}</p>
          <div
            alt={props.game.broadcast}
            className={`info-status ${props.game.broadcast}`}
          />
        </div>
        <div className="decisions">
          <p>
            W: <span className="name">{props.game.winner}</span>
          </p>
          <p>
            L: <span className="name">{props.game.loser}</span>
          </p>
          {props.game.save ? (
            <p>
              S: <span className="name">{props.game.save}</span>
            </p>
          ) : null}
        </div>
        <div className="catchup">
          <img alt="wrap" src={wrap} />
          <img alt="wrap" src={highlights} />
        </div>
      </div>
    );
  }


export default Game;
