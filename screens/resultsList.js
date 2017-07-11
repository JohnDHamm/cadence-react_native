import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import _ from 'lodash';

export default class ResultsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			athletes: {
				1: {
					name: 'CLARA',
					cadence: 0.75
				},
				2: {
					name: 'LUCY',
					cadence: 0.59
				},
				3: {
					name: 'MAKENNA',
					cadence: 0.76
				},
				4: {
					name: 'MAYA',
					cadence: 0.00
				},
				5: {
					name: 'MILES B',
					cadence: 0.81
				},
				6: {
					name: 'RUTH',
					cadence: 0.80
				},
				7: {
					name: 'TRINITY',
					cadence: 0.71
				},
				8: {
					name: 'WELLINGTON',
					cadence: 0.59
				}
			},
			numAthletes: 8
		};
	}


	renderResultsList() {
		return _.map(this.state.athletes, athlete => {
			const cadenceRPM = Math.floor(60 / athlete.cadence);
			if (athlete.cadence !== 0) {
				return (
					<View key={athlete.name} style={styles.athleteBlock}>
						<View>
							<Text style={styles.athleteName}>{athlete.name}</Text>
						</View>
						<View>
							<Text><Text style={styles.resultNumText}>{athlete.cadence}</Text><Text style={styles.resultMetricText}>s/</Text><Text style={styles.resultNumText}>{cadenceRPM}</Text><Text style={styles.resultMetricText}>rpm</Text></Text>
						</View>
					</View>
				);
			}
		})
	}

	clearResults() {
		//open modal to confirm?
		//clear all cadence values in state
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.titleText}>results:</Text>
				</View>

				<View style={styles.resultsList}>
					{this.renderResultsList()}
				</View>

				<View style={styles.clearResults}>
					<TouchableOpacity onPress={() => this.clearResults()}>
						<Text style={styles.titleText}>clear all</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#00002F',
		paddingTop: Constants.statusBarHeight,
		paddingLeft: 10,
		paddingRight: 10,
	},
	title: {
		paddingTop: 25
	},
	titleText: {
		color: '#888',
		fontSize: 25
	},
	resultsList: {
		paddingTop: 15,
	},
	athleteBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: 12
	},
	athleteName: {
		color: '#ddd',
		fontSize: 26,
	},
	resultNumText: {
		color: '#ddd',
		fontSize: 26,
	},
	resultMetricText: {
		color: '#888',
		fontSize: 23
	},
	clearResults: {
		paddingTop: 10
	}
});
