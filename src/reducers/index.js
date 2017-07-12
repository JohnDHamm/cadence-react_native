import { combineReducers } from 'redux';
import AthletesReducer from './reducer_athletes';
import CurrentAthleteReducer from './reducer_current_athlete';

const rootReducer = combineReducers ({
	athletes: AthletesReducer,
	currentAthlete: CurrentAthleteReducer
})

export default rootReducer;
