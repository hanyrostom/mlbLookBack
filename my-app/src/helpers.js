
const helpers = {
  listGames: allSeries => {
    let stored = {},
      gameTimes = [],
      store = {},
      updated = [];
		
    allSeries.forEach(singleSeries => {


      singleSeries.games.forEach(game => {
				// console.log('shouldBe35: ', helpers.findBroadcast(game.broadcasts))
				// console.log('type: ', game.broadcasts[2].type)

				gameTimes.push(game.gameDate);
        stored[game.gameDate] = {
					date: game.gameDate,
					homeTeam: game.teams.home.team.teamName,
					awayTeam: game.teams.away.team.teamName,
          homeTeamCode: game.teams.home.team.abbreviation,
					awayTeamCode: game.teams.away.team.abbreviation,
					homeTeamScore: game.teams.home.score,
					awayTeamScore: game.teams.away.score,
					series: singleSeries.series.id,
					isHomeWinner: null,
					isAwayWinner:null,
					winningTeam: null,
					losingTeam: null,
					result: game.seriesStatus.result,
					status: game.linescore.currentInning > 9 ? 'F/' + game.linescore.currentInning: 'FINAL',
          winner: helpers.formatName(game.decisions.winner.fullName),
					loser: helpers.formatName(game.decisions.loser.fullName),
					save: game.decisions.save? helpers.formatName(game.decisions.save.fullName) : null,
          description: helpers.trimGame(game.description),
          doubleHeader: "N",
          gameDate: game.gameDate,
          gameNumber: game.gameNumber,
          gamePk: game.gamePk,
					gameType: "D",
					isTieBreaker: null,
          gamedayType: "P",
          gamesInSeries: 5,
          ifNecessary: "N",
          ifNecessaryDescription: "Normal Game",
          isFeaturedGame: false,
          isTie: false,
          broadcast: helpers.findBroadcast(game.broadcasts),
					seriesDescription: "AL Division Series",
					seriesId: singleSeries.series.id,
					seriestotalGames: singleSeries.totalGames,


        };
      });
    });

    //arrange the times of the games
    gameTimes = gameTimes.sort((a, b) => new Date(a) - new Date(b));

    let count = 0;
    gameTimes.forEach(time => {

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
	},
	
	findBroadcast : coverage => {
		// console.log('coverage', coverage)
		let type = null,
				i    = 0;

				while (!type) {
					if (coverage[i].type === 'TV'){
						// console.log('broadcast.type?', coverage[i].name)
						// console.log('^ this must be tv, thats why I am here')
						type = 'TV'
						return coverage[i].name
					} else {
						i++
					}
				}
				return
		},

		trimGame : (input) => {
			console.log('input', input)
			let inputArray = input.split(' ')
			// inputArray = inputArray[-1] === 'Game'? 'World Series Gm ': inputArray[0] + '!'

			if (inputArray[1] === 'Game') {
				inputArray[1] = 'Gm'
			} else if (inputArray[2] === 'Game') {
				inputArray[2] = 'Gm'
			}  else if (inputArray[3] === 'Game') {
				inputArray.pop()
			} else if (	inputArray[2] === 'tiebreaker') {
				console.log(inputArray)
				inputArray = [inputArray[0],'Tiebreaker']
			}
			
			return inputArray.join(' ')
		},
		formatName : (name) => name[0] + ' ' + name.split(' ')[1]
	}




export default helpers
