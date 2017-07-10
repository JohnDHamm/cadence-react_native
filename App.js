import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					<Image
						style={styles.iconBtn}
	          source={require('./img/ic_group.png')}
	        />
					<Image
						style={styles.iconBtn}
	          source={require('./img/ic_list.png')}
	        />
				</View>
				<View style={styles.tapContainer}>
					<View style={styles.tapBtn}>
						<Text style={styles.athleteName}>MAKENNA</Text>
						<Text style={styles.readout}>0.75s / 105rpm</Text>
						<Text style={styles.athleteName}> </Text>
					</View>
				</View>
				<View style={styles.bottom}>
					<Image
						style={styles.resetBtn}
	          source={require('./img/ic_highlight_off_444.png')}
	        />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
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
		borderColor: '#444',
		borderWidth: 1,
		borderStyle: 'solid'
	},
	iconBtn: {
		width: 50,
		height: 50
	},
	tapContainer: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width,
		// flex: 5,
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
		// flex: 1,
		width: Dimensions.get('window').width,
		height: (Dimensions.get('window').height - Dimensions.get('window').width) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#444',
		borderWidth: 1,
		borderStyle: 'solid'
	},
	iconBtn: {
		width: 40,
		height: 40
	}
});
