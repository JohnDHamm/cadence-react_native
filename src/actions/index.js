export const GET_ATHLETES = 'get_athletes';
export const SET_CURRENT_ATHLETE = 'set_current_athlete';
export const UPDATE_CADENCE = 'update_cadence';

export function getAthletes() {
	return { //replace with the AsyncStorage logic
		type: GET_ATHLETES,
		payload: {
				CLARA: {
					name: 'CLARA',
					cadence: 0.75
				},
				LUCY: {
					name: 'LUCY',
					cadence: 0.52
				},
				MAKENNA: {
					name: 'MAKENNA',
					cadence: 0.76
				},
				MAYA: {
					name: 'MAYA',
					cadence: 0.70
				},
				MILES_B: {
					name: 'MILES_B',
					cadence: 0.81
				},
				RUTH: {
					name: 'RUTH',
					cadence: 0.80
				},
				TRINITY: {
					name: 'TRINITY',
					cadence: 0.00
				},
				WELLINGTON: {
					name: 'WELLINGTON',
					cadence: 0.59
				}
			}
	}
}

export function setCurrentAthlete(name) {
	return {
		type: SET_CURRENT_ATHLETE,
		payload: name
	}
}

export function updateCadence(newCadenceObj) {
	return {
		type: UPDATE_CADENCE,
		payload: newCadenceObj
	}
}
