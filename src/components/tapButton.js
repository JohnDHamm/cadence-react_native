import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class TapButton extends React.Component {

	render() {

		return (
			<View style={styles.tapBtn}>
				<Text style={styles.athleteName}>{this.props.athleteName}</Text>
				<Text style={styles.readout}>{this.props.readout}</Text>
				<Text style={styles.athleteName}> </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	tapBtn: {
		width: Dimensions.get('window').width * 0.95,
		height: Dimensions.get('window').width * 0.95,
		backgroundColor: '#000',
		borderStyle: 'solid',
		borderColor: '#444',
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
	}
})
