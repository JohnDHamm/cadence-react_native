export const GET_ATHLETES = 'get_athletes';
export const SET_CURRENT_ATHLETE = 'set_current_athlete';
export const SAVE_ATHLETE = 'save_athlete';
export const DELETE_ATHLETE = 'delete_athlete';
export const UPDATE_CADENCE = 'update_cadence';

import { AsyncStorage } from 'react-native';

export function getAthletes() {
	let storedKeys = [];
	const storedAthletes = {};
	AsyncStorage.getAllKeys()
		.then((keys) => {
			storedKeys = keys.sort();
		})
		.then(() => {
			storedKeys.forEach((key) => {
				AsyncStorage.getItem(key)
					.then((value) => {
						storedAthletes[key] = JSON.parse(value);
					});
			})
		});

	return {
		type: GET_ATHLETES,
		payload: storedAthletes
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

export function saveAthlete(newAthlete) {
	return {
		type: SAVE_ATHLETE,
		payload: newAthlete
	}
}

export function deleteAthlete(athleteId) {
	return {
		type: DELETE_ATHLETE,
		payload: athleteId
	}
}
