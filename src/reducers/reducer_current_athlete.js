import { SET_CURRENT_ATHLETE } from '../actions';

export default function (state='', action) {
	switch (action.type) {
		case SET_CURRENT_ATHLETE:
			return action.payload;
		default:
			return state;
	}
}

