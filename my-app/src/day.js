import React from "react";
import { days } from "./helpers";
import Game from './game'


const Day = ({ games, id }) => {

  const dayOfWeek = new Date(games[id][0].gameDate).getDay();
  const weekdayString = new Date(games[id][0].gameDate)
    .toDateString()
    .slice(4, 10);

  return (
    <li className="listItem-section" key={id}>
      <ul className="listed-games">
        {games[id].map((game, i) => (
          <li className="listGame-section" key={i}>
            {i === 0 ? (
              <h2 className="section-date">
                {days[dayOfWeek]}, {weekdayString}
              </h2>
            ) : null}
           <Game game={game} />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Day;
