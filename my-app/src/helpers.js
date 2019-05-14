import TBS from './assets/TBS.svg';
import ESPN from './assets/ESPN.svg';
import FS1 from './assets/FS1.svg';
import FS1INT from './assets/FS1-INT.svg';
import MLBN from './assets/MLBN.svg';
import FOX from './assets/FOX.svg';


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
					homeTeam: game.teams.home.team.teamName,
					awayTeam: game.teams.away.team.teamName,
          homeTeamCode: game.teams.home.team.abbreviation,
					awayTeamCode: game.teams.away.team.abbreviation,
					homeTeamScore: game.teams.home.score,
					awayTeamScore: game.teams.away.score,
					isHomeWinner: null,
					isAwayWinner:null,
					winningTeam: null,
					losingTeam: null,
					status: game.linescore.currentInning > 9 ? 'F/' + game.linescore.currentInning: 'FINAL',
          winner: helpers.formatName(game.decisions.winner.fullName),
					loser: helpers.formatName(game.decisions.loser.fullName),
					save: game.decisions.save? helpers.formatName(game.decisions.save.fullName) : null,
          description: helpers.trimGame(game.description),
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
		console.log('coverage', coverage)
		let type = null,
				i    = 0;

				while (!type) {
					if (coverage[i].type === 'TV'){
						console.log('broadcast.type?', coverage[i].name)
						console.log('^ this must be tv, thats why I am here')
						shouldBe35++
						type = 'TV'
						return coverage[i].name
					} else {
						i++
					}
					
				}

				return
		},

		trimGame : (input) => {
			let inputArray = input.split(' ').slice(0,3)
			inputArray[1] = inputArray[1] === 'Game'? 'GM': inputArray[1]
			
			return inputArray.join(' ')
		},
		formatName : (name) => name[0] + ' ' + name.split(' ')[1]
	}




export default helpers
