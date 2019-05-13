
let shouldBe35 = 0


const helpers = {
  listGames: allSeries => {
    let stored = {},
      gameTimes = [],
      store = {},
      updated = [];
		
    allSeries.forEach(singleSeries => {


      singleSeries.games.forEach(game => {
				console.log('shouldBe35: ', helpers.findBroadcast(game.broadcasts))
				// console.log('type: ', game.broadcasts[2].type)

				gameTimes.push(game.gameDate);
        stored[game.gameDate] = {
          date: game.gameDate,
          homeTeam: game.teams.home.team.abbreviation,
          awayTeam: game.teams.away.team.abbreviation,
          winner: game.decisions.winner.fullName,
					loser: game.decisions.loser.fullName,
					save: game.decisions.save? game.decisions.save.fullName : null,
          description: game.description,
          doubleHeader: "N",
          gameDate: game.gameDate,
          gameNumber: null,
          gamePk: game.gamePk,
          gameType: "D",
          gamedayType: "P",
          gamesInSeries: 5,
          ifNecessary: "N",
          ifNecessaryDescription: "Normal Game",
          isFeaturedGame: false,
          isTie: false,
          broadcast: game.broadcasts[0].type === 'tv'? game.broadcasts[0].name : null,
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
		console.log('coverage', coverage)
		let type = null,
				i    = 0;

				while (!type) {
					console.log('broadcast.type?', coverage[i].type)
					if (coverage[i].type === 'TV'){
						console.log('^ this must be tv, thats why I am here')
						shouldBe35++
						type = 'TV'
						return shouldBe35
					} else {
						i++
					}
					
				}

				return
		}
	}




export default helpers
