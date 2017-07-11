import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import TapButton from './components/tapButton';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pressedBtn: 'none',
			readout: 'tap to start',
			prevTap: 0,
			latestTap: 0,
			intervals: []
		};
	}

	chooseAthlete() {
		this.setState({pressedBtn: 'select athlete'});
	}

	getResults() {
		this.setState({pressedBtn: 'get results'});
	}

	tap() {
		let thisTap = Date.now();

		if (this.state.prevTap === 0) {
			this.state.prevTap = thisTap;
			this.state.latestTap = thisTap;
			this.state.readout = "started..."
		} else {
			this.state.prevTap = this.state.latestTap;
			this.state.latestTap = thisTap;
			let thisInterval = ((this.state.latestTap - this.state.prevTap)/1000);
			this.state.intervals.push(thisInterval);
			const sum = this.state.intervals.reduce((a, b) => a + b);
			let avgSecond = (sum / this.state.intervals.length).toFixed(2);
			let avgRPM = Math.floor(60 / (sum / this.state.intervals.length));
			this.state.readout = `${avgSecond}s / ${avgRPM}rpm`;
			// $scope.athletes[$scope.currentAthlete.id].resultSec = avgSecond;
			// $scope.athletes[$scope.currentAthlete.id].resultRPM = avgRPM;
		}

		this.setState({
			pressedBtn: 'tapped!'
		});
	}

	reset() {
		this.setState({
			pressedBtn: 'reset',
			readout: 'tap to start',
			prevTap: 0,
			latestTap: 0,
			intervals: []
		});
	}

	render() {

		return (
			<View style={styles.container}>
				<View style={styles.top}>
					<TouchableOpacity onPress={this.chooseAthlete.bind(this)}>
						<Image
							style={styles.iconBtn}
							source={require('./img/ic_group.png')}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.getResults.bind(this)}>
						<Image
							style={styles.iconBtn}
							source={require('./img/ic_list.png')}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.tapContainer}>
					<TouchableOpacity onPress={this.tap.bind(this)}>
						<TapButton
							athleteName='MAKENNA'
							readout={this.state.readout} />
					</TouchableOpacity>
				</View>

				<View style={styles.bottom}>
					<TouchableOpacity onPress={this.reset.bind(this)}>
						<Image
							style={styles.resetBtn}
							source={require('./img/ic_highlight_off.png')}
						/>
					</TouchableOpacity>
					<Text style={styles.testText}>{this.state.pressedBtn}</Text>
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
