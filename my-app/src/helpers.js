export const seriesOrder = {
  "NLTB 'A'" : 0,
  'ALWC'     : 1,
  'NLWC     ': 2,
  "ALDS 'A'" : 3,
  "NLDS 'A'" : 4,
  "ALDS 'B'" : 5,
  "NLDS 'B'" : 6,
  'ALCS'     : 7,
  'NLCS'     : 8,
  'WS'       : 9
};

export const sortRounds = allRounds => {
  let newOrder = [];

  allRounds.forEach((round, i) => {
    newOrder[seriesOrder[Object.keys(round[0])[0]]] = [
      ...Object.values(round[0])
    ];
  });
  return newOrder;
};

export const listGames = (allSeries, orderBy) => {

  let stored = {},
       dates = [], 
      rounds = [],
       store = {},
     updated = [];

  allSeries.forEach((singleSeries, i) => {

    let eachSeries = [{ [singleSeries.series.id]: [] }];

    singleSeries.games.forEach(game => {

      dates.push(game.gameDate);

      stored[game.gameDate] = {
        date: game.gameDate,
        homeTeam: game.teams.home.team.teamName,
        awayTeam: game.teams.away.team.teamName,
        homeTeamCode: game.teams.home.team.abbreviation,
        awayTeamCode: game.teams.away.team.abbreviation,
        homeTeamScore: game.teams.home.score,
        awayTeamScore: game.teams.away.score,
        series: singleSeries.series.id,
        result: game.seriesStatus.result,
        status: game.linescore.currentInning > 9 ? "F/" + game.linescore.currentInning : "FINAL",
        winner: formatName(game.decisions.winner.fullName),
        loser: formatName(game.decisions.loser.fullName),
        save: game.decisions.save? formatName(game.decisions.save.fullName): null,
        description: trimGame(game.seriesStatus.shortDescription),
        gameDate: game.gameDate,
        gameNumber: game.seriesGameNumber,
        gamePk: game.gamePk,
        gamesInSeries: game.gamesInSeries,
        tiebreaker: game.tiebreaker,
        shortDescription: game.seriesStatus.shortDescription,
        broadcast: findBroadcast(game.broadcasts),
        seriesStatus: singleSeries.games[singleSeries.totalGames - 1].seriesStatus.result,
        seriesDescription: formatSeriesName(game.seriesDescription.split(" ")),
        seriestotalGames: singleSeries.totalGames
      };
      eachSeries[0][singleSeries.series.id].push({ ...stored[game.gameDate] });
    });

    rounds.push(eachSeries);
  });

  //arrange the game numbers within Rounds
  if (orderBy === "ByRound") {
    rounds.forEach(round => {
      for (let game in round[0]) {
        round[0][game].sort((a, b) => a.gameNumber - b.gameNumber);
      }
    });
    return sortRounds(rounds);
  }

  if (orderBy === "ByDate") {
    //arrange the times of the games
    dates.sort((a, b) => new Date(a) - new Date(b));


    let count = 0;
    
    dates.forEach( time => {

      let day = time.slice(0, 10);

      //initial store or if its a new day
      if (!store.hasOwnProperty(day)) {
        updated[count] = [{ [count]: [stored[time]] }];
        store[day] = [stored[time]];
        count++;
      } else {
        updated[count - 1][0][count - 1].push(stored[time]);
        store[day] = [...store[day], stored[time]];
      }
    });

    return updated;
  }
};

export const findBroadcast = coverage => {
  let type = null,
    i = 0;

  while (!type) {
    if (coverage[i].type === "TV") {
      type = "TV";
      return coverage[i].name;
    }
    i++;
  }

  return;
};

export const trimGame = gameTitle => {
  let gameTitleArray = gameTitle.split(" ");
  gameTitleArray[1] = gameTitleArray[1] === "Game" ? "Gm" : gameTitleArray[1];

  return gameTitleArray.join(" ");
};

export const formatName = name => name[0] + " " + name.split(" ")[1];

export const formatSeriesName = seriesNameArray => {
  if (seriesNameArray[seriesNameArray.length - 1] === "Game") {
    seriesNameArray.pop();
  }

  return seriesNameArray.join(" ");
};

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

