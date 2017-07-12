import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import _ from 'lodash';

export default class AthleteList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			athletes: {
				1: {
					name: 'CLARA',
				},
				2: {
					name: 'LUCY',
				},
				3: {
					name: 'MAKENNA',
				},
				4: {
					name: 'MAYA',
				},
				5: {
					name: 'MILES B',
				},
				6: {
					name: 'RUTH',
				},
				7: {
					name: 'TRINITY',
				},
				8: {
					name: 'WELLINGTON',
				}
			},
			numAthletes: 8
		};
	}

	setCurrentAthlete() {
		//set state of current athlete
		this.props.navigation.navigate('Home');
	}

	renderAthleteList() {
		return _.map(this.state.athletes, athlete => {
			return (
				<TouchableOpacity key={athlete.name} onPress={() => this.setCurrentAthlete(athlete.name)}>
					<Text style={styles.athleteText}>{athlete.name}</Text>
				</TouchableOpacity>
			);
		})
	}

	addAthlete() {
		//open modal to enter name?
		//check name duplicate
		//save new athlete to state
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.titleText}>select athlete:</Text>
				</View>

				<View style={styles.athleteList}>
					{this.renderAthleteList()}
				</View>

				<View style={styles.addAthlete}>
					<TouchableOpacity onPress={() => this.addAthlete()}>
						<Text style={styles.titleText}>add new athlete</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2F0000',
		paddingTop: Constants.statusBarHeight
	},
	title: {
		paddingLeft: 25,
		paddingTop: 25
	},
	titleText: {
		color: '#888',
		fontSize: 25
	},
	athleteList: {
		paddingLeft: 25,
		paddingTop: 15,
	},
	addAthlete: {
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	athleteText: {
		color: '#ddd',
		fontSize: 28,
		paddingBottom: 12
	}
});
