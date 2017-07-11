import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

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
						<View style={styles.tapBtn}>
							<Text style={styles.athleteName}>MAKENNA</Text>
							<Text style={styles.readout}>0.75s / 105rpm</Text>
							<Text style={styles.athleteName}> </Text>
						</View>
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
	tapBtn: {
		width: Dimensions.get('window').width * 0.95,
		height: Dimensions.get('window').width * 0.95,
		backgroundColor: '#000',
		borderStyle: 'solid',
		borderColor: '#e2bb2d',
		borderWidth: 2,
		borderRadius: Dimensions.get('window').width * 0.475,
		justifyContent: 'center',
		alignItems: 'center'
	},
	athleteName: {
		color: '#e2bb2d',
		fontSize: 22
	},
	readout: {
		color: '#fff',
		fontSize: 37,
		paddingTop: 17,
		paddingBottom: 17
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
