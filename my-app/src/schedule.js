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
    console.log("games props:", this.props.games);
    this.listGames(this.props.games);
  }

  listGames = allSeries => {
    let stored = {},
      gameTimes = [],
      count = 0;

    // console.log('SERIES:: ', allSeries)

    allSeries.forEach(singleSeries => {
      singleSeries.games.forEach(game => {
        count++;
        // console.log(count, game.gameDate, game.gamePk)
        gameTimes.push(game.gameDate);

        stored[game.gameDate] = {
          date: game.gameDate,
          // homeTeam: 1,
          // awayTeam: 1,
          // winner: 1,
          // loser: 1,
          description: game.description,
          // doubleHeader: "N",
          gameDate: game.gameDate,
          // gameNumber: 1,
          gamePk: game.gamePk
          // gameType: "D",
          // gamedayType: "P",
          // gamesInSeries: 5,
          // ifNecessary: "N",
          // ifNecessaryDescription: "Normal Game",
          // isFeaturedGame: false,
          // isTie: false,
          // broadcast :1,
          // seriesDescription: "AL Division Series",
        };
      });
    });
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    gameTimes = gameTimes.sort((a, b) => new Date(a) - new Date(b))
    // gameTimes.forEach(time=>time.toDateString())

    // console.log('gametimes0: ', new Date(gameTimes[0]))
    console.log('gametimes0: ', days[new Date(gameTimes[0]).getDay()])
    // gameTimes.forEach(game => console.log(stored[game]));

    this.setState({ games: gameTimes });
    // console.log(gameNumbers)
  };

  render() {
    let { games } = this.state;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    console.log("games: ", games);
    return (
      <div className="scheduele-container">
        <header className="scheduele-header">
          <h1>Schedule</h1>
        </header>
        <hr />
        <ul className="schedule-list">
          {games.map((game,j)=> (
            <li className='listItem-section' key={j}>
              <h2>{days[new Date(game).getDay()]}, {new Date(game).toDateString().slice(4,10)}</h2>
              <ul className="listed-games">
                {[1, 2].map((game, i) => (
                  <li key={i}>
                    <div>
                      <h4>description</h4>
                      <div>
                        <a href="http://google.com">
                          <span>img tag!</span>
                          <span>team {game}</span>
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
                    <div className='catchup'>
                     <div>wrap</div>
                     <div>HL</div>
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
