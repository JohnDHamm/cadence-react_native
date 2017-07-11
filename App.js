import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import TapButton from './components/tapButton';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pressedBtn: 'none' };
	}

	chooseAthlete() {
		this.setState({pressedBtn: 'select athlete'});
	}

	getResults() {
		this.setState({pressedBtn: 'get results'});
	}

	tap() {
		this.setState({pressedBtn: 'tapped!'});
	}

	reset() {
		this.setState({pressedBtn: 'reset'});
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
							readout='0.85s / 102rpm' />
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
