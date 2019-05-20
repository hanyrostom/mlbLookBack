import React               from "react";
import Game                from "./game";
import { FILTER_BY_ROUND } from '../constants';

const Round = ({ games, id }) => {

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
            <Game game={game} filter={FILTER_BY_ROUND} />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Round;
