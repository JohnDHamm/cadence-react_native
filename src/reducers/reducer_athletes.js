import { GET_ATHLETES, UPDATE_CADENCE, SAVE_ATHLETE, DELETE_ATHLETE } from '../actions';
import _ from 'lodash';

export default function(state={}, action) {
	switch (action.type) {
		case GET_ATHLETES:
			return action.payload;
		case UPDATE_CADENCE:
			return { ...state, [action.payload.name]: action.payload };
		case SAVE_ATHLETE:
			return { ...state, [action.payload.name]: action.payload };
		case DELETE_ATHLETE:
			return _.omit(state, action.payload);
		default:
			return state;
	}
}
