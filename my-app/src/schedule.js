import React from "react";
// import mlbLogo from "./assets/mlbLogo.svg";
import wrap from './assets/wrap.png';
import highlights from './assets/highlights.png';
import helpers from './helpers';
import Game from './game'


class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			gamesByDate: [],
			gamesByRound:[],
			filter: {
				ByDate: 'active',
				ByRound: ''
			},
			selected: 'gamesByDate'
    };
  }

  componentDidMount() {
		this.setState({gamesByDate : helpers.listGames(this.props.games, 'ByDate'),
									gamesByRound : helpers.listGames(this.props.games, 'ByRound')})
		this.setState({})
	}
	
	onFilterClick = (event) => {
		//change css
		let by             = event.target.innerText.split(' ').join(''),
		    filterSelected = {[by] : 'active'};
		this.setState({filter : filterSelected, selected: `games${by}`}, ()=> console.log(this.state))
		//render required filtered games
	}



  render() {
		let { gamesByDate, filter, selected, gamesByRound } = this.state;
		
			console.log('selected:', gamesByRound)


    return (
      <div className="scheduele-container">
        <header className="scheduele-header">
          <h1 className='title'>Schedule</h1>
        </header>
				<div className='filters'>
					<h3 className={`filter ${filter.ByDate}`} onClick={this.onFilterClick}>By Date</h3>
					<h3 className={`filter ${filter.ByRound}`} onClick={this.onFilterClick}>By Round</h3>
				</div>
        <hr />
        <ul className="schedule-list">
				{console.log(this.state[selected])}
          {this.state[selected].map((game, j) => (
						<li className="listItem-section" key={j}>
						
              <ul className="listed-games">
                {game[0][j].map((game, i) => (
                  
                    <Game game={game} key={i} i={i} filter= {selected}/>
										
                  
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
