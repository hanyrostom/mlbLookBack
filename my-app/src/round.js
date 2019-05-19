import React from "react";
import Game from './game'


const Round = ({games , id}) => {
  console.log("game: ", games);

    return (
      <li className="listItem-section" key={id}>
        <ul className="listed-games">
          {games.map((game, i) => (
            <li key={i} className="listGame-section round">
              {i === 0 ? (
                <h2 className="section-series">
                  {game.tiebreaker === "Y"
                    ? game.shortDescription
                    : game.seriesDescription}
                </h2>
              ) : null}
                <h5>Gm {game.gameNumber}</h5>
                <Game game={game} />
            </li>
          ))}
        </ul>
      </li>
    );
  }

  


export default Round;