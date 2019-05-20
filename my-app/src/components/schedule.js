import React                               from "react"
import Day                                 from './day'
import Round                               from './round'
import { listGames }                       from './helpers'
import { FILTER_BY_DATE, FILTER_BY_ROUND } from '../constants';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			gamesByDate: [],
			gamesByRound:[],
      filter: FILTER_BY_DATE,
      FILTER_BY_DATE : 'active',
      FILTER_BY_ROUND : '',
    };
  }

  componentDidMount() { //**** read below/
    const gamesByDate = listGames(this.props.games, "ByDate"); 
    const gamesByRound = listGames(this.props.games, "ByRound");

		this.setState({ gamesByDate, gamesByRound });
	}
	
	onFilterClick = (filterBy) => {
    if ( filterBy === FILTER_BY_DATE ) {
      this.setState({ filter : filterBy, FILTER_BY_DATE : 'active', FILTER_BY_ROUND : '' })
    } else {
      this.setState({ filter : filterBy, FILTER_BY_ROUND : 'active', FILTER_BY_DATE : '' })
    }
	}

  render() {
		let { filter, gamesByDate, gamesByRound } = this.state;


    return (
      <div className="scheduele-container">
        <header className="scheduele-header">
          <h1 className='title'>Schedule</h1>
        </header>
				<div className='filters'>
          <h3 className={`filter ${this.state.FILTER_BY_DATE}`} onClick={() => this.onFilterClick(FILTER_BY_DATE)}>By Date</h3>
					<h3 className={`filter ${this.state.FILTER_BY_ROUND}`} onClick={() => this.onFilterClick(FILTER_BY_ROUND)}>By Round</h3>
				</div>
        <hr />
          {filter === FILTER_BY_DATE ? <ul className="schedule-list">
          {gamesByDate.map(([gamesForFiltered], j) => (
            <Day games={gamesForFiltered} key={j} id={j} filter={filter} />
          ))}
        </ul> :<ul className="schedule-list">
          {gamesByRound.map(([gamesForFiltered], i) => (
            <Round games={gamesForFiltered} key={i} id={i} filter={filter} />
          ))}
        </ul>}
        
      </div>
    );
  }
}

export default Schedule;



/***
 * 
// Trade off: we could save space by sorting everytime a user switches filters
// but it'll be costly in time so we choose to sort only once on mount since we in control/aware 
// how much data we have in the postseason 

//Otherwise:

  //in onFilterClick  we would add this logic for the other approach

    // if the filter is changed to byRound
    // this.setState({ games: filterByRound(games) })

    // if the filter is changed to byDate
    // this.setState({ games: filterByDate(games) })

 */