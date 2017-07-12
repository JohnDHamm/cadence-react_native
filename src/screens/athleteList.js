import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getAthletes, setCurrentAthlete } from '../actions';


class AthleteList extends React.Component {
	componentWillMount() {
		// this.props.getAthletes();
	}

	selectAthlete(athlete) {
		// console.log("seletced athlete", athlete);
		//set state of current athlete + clear cadence value
		this.props.setCurrentAthlete(athlete);

		this.props.navigation.navigate('Home');
	}

	renderAthleteList() {
		return _.map(this.props.athletes, athlete => {
			return (
				<TouchableOpacity key={athlete.name} onPress={() => this.selectAthlete(athlete.name)}>
					<Text style={styles.athleteText}>{athlete.name}</Text>
				</TouchableOpacity>
			);
		})
	}

	addAthlete() {
		//open modal to enter name?
		//check name duplicate
		//save new athlete to state
		//save to AsyncStorage
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
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
				</ScrollView>
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
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	athleteText: {
		color: '#ddd',
		fontSize: 28,
		paddingBottom: 12
	}
});

function mapStateToProps({ athletes }) {
	return { athletes };
}

export default connect(mapStateToProps, { getAthletes, setCurrentAthlete })(AthleteList);
