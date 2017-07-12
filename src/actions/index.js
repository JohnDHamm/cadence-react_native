export const SET_CURRENT_ATHLETE = 'set_current_athlete';

export function setCurrentAthlete(name) {
	return {
		type: SET_CURRENT_ATHLETE,
		payload: name
	}
}
