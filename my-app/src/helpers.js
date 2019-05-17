const helpers = {
  listGames: (allSeries, orderBy) => {
		console.log('ordering by,', orderBy)


    let stored = {},
      dates = [], //make dynamic rounds/times
      rounds = [],
      store = {},
      updated = [];

    allSeries.forEach((singleSeries, i) => {
      // rounds.push(singleSeries)
      let eachSeries = {[singleSeries.series.id] : []};

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
          status:
            game.linescore.currentInning > 9
              ? "F/" + game.linescore.currentInning
              : "FINAL",
          winner: helpers.formatName(game.decisions.winner.fullName),
          loser: helpers.formatName(game.decisions.loser.fullName),
          save: game.decisions.save
            ? helpers.formatName(game.decisions.save.fullName)
            : null,
          description: helpers.trimGame(game.seriesStatus.shortDescription),
          gameDate: game.gameDate,
          gameNumber: game.seriesGameNumber,
          gamePk: game.gamePk,
          gamesInSeries: game.gamesInSeries,
          shortDescription: game.seriesStatus.shortDescription,
          broadcast: helpers.findBroadcast(game.broadcasts),
          seriesStatus:
            singleSeries.games[singleSeries.totalGames - 1].seriesStatus.result,
          seriesDescription: game.seriesDescription,
          seriesId: singleSeries.series.id,
          seriestotalGames: singleSeries.totalGames
        };
        eachSeries[singleSeries.series.id].push({ ...stored[game.gameDate] });
				// console.log('rounds[i]: ',rounds[i])
				console.log('eachSeries: ', eachSeries)
			});

			rounds.push(eachSeries)
			
    });

    //arrange the game numbers within series
    if (orderBy === "ByRound") {
      rounds.forEach(round => {
				console.log('round: ', round)
        for (let game in round) {
					console.log('game', game)
					round[game].sort((a, b) => a.gameNumber - b.gameNumber);
				}

			})
			console.log('rounds::', rounds)
      return rounds;
      }
		
		
    if (orderBy === "ByDate") {
			//arrange the times of the games
      dates.sort((a, b) => new Date(a) - new Date(b));

      let count = 0;
      dates.forEach(time => {
        let day = time.slice(0, 10);
        //if its a new day
        if (!store.hasOwnProperty(day)) {
          count++;
          updated[count - 1] = [{ [count - 1]: [stored[time]] }];
          store[day] = [stored[time]];
        } else {
          updated[count - 1][0][count - 1].push(stored[time]);
          store[day] = [...store[day], stored[time]];
        }
      });
      return updated;
    }

  },

  findBroadcast: coverage => {
    // console.log('coverage', coverage)
    let type = null,
      i = 0;

    while (!type) {
      if (coverage[i].type === "TV") {
        // console.log('broadcast.type?', coverage[i].name)
        // console.log('^ this must be tv, thats why I am here')
        type = "TV";
        return coverage[i].name;
      } else {
        i++;
      }
    }
    return;
  },

  trimGame: input => {
    console.log("input", input);
    let inputArray = input.split(" ");
    inputArray[1] = inputArray[1] === "Game" ? "Gm" : inputArray[1];

    return inputArray.join(" ");
  },
  formatName: name => name[0] + " " + name.split(" ")[1],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};

export default helpers;
