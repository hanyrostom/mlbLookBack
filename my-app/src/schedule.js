import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    this.listGames(this.props.games);
  }

  listGames = allSeries => {
    let stored = {},
      gameTimes = [],
      store = {},
      updated = [],
      gamesList = [];

    // console.log('SERIES:: ', allSeries)

    allSeries.forEach(singleSeries => {
      singleSeries.games.forEach(game => {
        // console.log(count, game.gameDate, game.gamePk)
        gameTimes.push(game.gameDate);
        console.log("away team: ", game.teams.away.team.abbreviation);
        stored[game.gameDate] = {
          date: game.gameDate,
          homeTeam: 1,
          awayTeam: game.teams.away.team.abbreviation,
          winner: 1,
          loser: 1,
          description: game.description,
          doubleHeader: "N",
          gameDate: game.gameDate,
          gameNumber: 1,
          gamePk: game.gamePk,
          gameType: "D",
          gamedayType: "P",
          gamesInSeries: 5,
          ifNecessary: "N",
          ifNecessaryDescription: "Normal Game",
          isFeaturedGame: false,
          isTie: false,
          broadcast: 1,
          seriesDescription: "AL Division Series"
        };
      });
    });

    // console.log('stored', stored)

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    //arrange the times of the games
    gameTimes = gameTimes.sort((a, b) => new Date(a) - new Date(b));
    // gameTimes.forEach(time=>time.toDateString())
    // console.log('all times', gameTimes)

    let count = 0;
    gameTimes.forEach(time => {
      // console.log(gameTimes[i])

      let day = time.slice(0, 10);

      //if its a new day
      if (!store.hasOwnProperty(day)) {
        count++;
        updated[count - 1] = [{ [count - 1]: [stored[time]] }];
        console.log("updated[i][day]", updated[count - 1]);
        // console.log(gameTimes[i])
        store[day] = [stored[time]];
        // updated.push({[day] : [stored[time]]})
      } else {
        updated[count - 1][0][count - 1].push(stored[time]);
        store[day] = [...store[day], stored[time]];
        // console.log(gameTimes[i])
      }

      // gamesList.push({[time]:stored[time]})
    });
    // console.log('store: ', store)
    console.log("gameTimes", gameTimes);
    console.log("type updated", updated.constructor);
    // console.log('gamesList', gamesList)

    // // console.log('gametimes0: ', new Date(gameTimes[0]))
    // console.log('gametimes0: ', days[new Date(gameTimes[0]).getDay()])
    // // gameTimes.forEach(game => console.log(stored[game]));
    // console.log(stored)

    this.setState({ games: updated });
    // console.log(gameNumbers)
  };

  render() {
    let { games } = this.state;
    console.log("games::", games.constructor);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    // console.log("games: ", games);
    return (
      <div className="scheduele-container">
        <header className="scheduele-header">
          <h1>Schedule</h1>
        </header>
        <hr />
        <ul className="schedule-list">
          {games.map((game, j) => (
            <li className="listItem-section" key={j}>
              {/* <h2>{days[new Date(game[j][0].gameDate).getDay()]}, {new Date(game.gameDate).toDateString().slice(4,10)}</h2> */}
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
