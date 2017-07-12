import { GET_ATHLETES, UPDATE_CADENCE } from '../actions';

export default function(state={}, action) {
	switch (action.type) {
		case GET_ATHLETES:
			return action.payload;
		case UPDATE_CADENCE:
			return { ...state, [action.payload.name]: action.payload };
		default:
			return state;
	}
}
