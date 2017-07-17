import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { getAthletes, updateCadence } from '../actions';


import TapButton from '../components/tapButton';

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			readout: 'tap to start',
			prevTap: 0,
			latestTap: 0,
			intervals: [],
		};
	}

	componentWillMount() {
		if (!this.props.currentAthlete) {
			this.props.getAthletes();
			this.state.readout = 'no athlete selected';
		}
	}

	tap() {
		if (!this.props.currentAthlete) {
			return;
		}
		let thisTap = Date.now();

		if (this.state.prevTap === 0) {
			this.state.prevTap = thisTap;
			this.state.latestTap = thisTap;
			this.setState({readout: "started..."});
		} else {
			this.state.prevTap = this.state.latestTap;
			this.state.latestTap = thisTap;
			let thisInterval = ((this.state.latestTap - this.state.prevTap)/1000);
			this.state.intervals.push(thisInterval);
			const sum = this.state.intervals.reduce((a, b) => a + b);
			let avgSecond = (sum / this.state.intervals.length).toFixed(2);
			let avgRPM = Math.floor(60 / (sum / this.state.intervals.length));
			this.setState({readout: `${avgSecond}s / ${avgRPM}rpm`});

			const newCadenceObj = {
				name: this.props.currentAthlete,
				cadence: avgSecond
			}
			this.props.updateCadence(newCadenceObj);
			AsyncStorage.mergeItem(this.props.currentAthlete, JSON.stringify(newCadenceObj));
		}
	}

	reset() {
		if (this.props.currentAthlete) {
			const newCadenceObj = {
				name: this.props.currentAthlete,
				cadence: 0.00
			}
			this.props.updateCadence(newCadenceObj);
			this.setState({
				readout: 'tap to start',
				prevTap: 0,
				latestTap: 0,
				intervals: []
			});
		}
	}

	render() {
		const currentAthleteName =  this.props.currentAthlete;
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Athletes')}>
						<Image
							style={styles.iconBtn}
							source={require('../img/ic_group.png')}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Results')}>
						<Image
							style={styles.iconBtn}
							source={require('../img/ic_list.png')}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.tapContainer}>
					<TouchableOpacity onPress={this.tap.bind(this)}>
						<TapButton
							athleteName={currentAthleteName}
							readout={this.state.readout}

						/>
					</TouchableOpacity>
				</View>

				<View style={styles.bottom}>
					<TouchableOpacity onPress={this.reset.bind(this)}>
						<Image
							style={styles.resetBtn}
							source={require('../img/ic_highlight_off.png')}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#222',
	},
	top: {
		width: Dimensions.get('window').width,
		height: (Dimensions.get('window').height - Dimensions.get('window').width) / 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
	},
	iconBtn: {
		width: 50,
		height: 50
	},
	tapContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottom: {
		width: Dimensions.get('window').width,
		height: (Dimensions.get('window').height - Dimensions.get('window').width) / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	resetBtn: {
		width: 40,
		height: 40
	},
	testText: {
		color: '#666',
		fontSize: 18
	}
});

function mapStateToProps({ currentAthlete }) {
	return { currentAthlete };
}

export default connect(mapStateToProps, { getAthletes, updateCadence })(Timer);
