import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { updateCadence } from '../actions';

import _ from 'lodash';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
	    this.state = {
			showClearAll: true
		}
	}

	renderResultsList() {
		return _.map(this.props.athletes, athlete => {
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

	clear() {
		_.map(this.props.athletes, athlete => {
			const newClearedObj = {
				name: athlete.name,
				cadence: 0.00
			}
			this.props.updateCadence(newClearedObj)
				this.setState({showClearAll: false});
		})
	}

	renderClearAll() {
		if (this.state.showClearAll) {
			return (
				<TouchableOpacity onPress={() => this.clear()}>
					<Text style={styles.titleText}>clear all</Text>
				</TouchableOpacity>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.top}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Athletes')}>
							<Image
								style={styles.iconBtn}
								source={require('../img/ic_group.png')}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.title}>
						<Text style={styles.titleText}>results:</Text>
					</View>

					<View style={styles.resultsList}>
						{this.renderResultsList()}
					</View>

					<View style={styles.clearResults}>
						{this.renderClearAll()}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#00002F',
		paddingTop: 25,
		paddingLeft: 10,
		paddingRight: 10,
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingTop: 10,
		paddingRight: 5,
	},
	iconBtn: {
		width: 50,
		height: 50
	},
	title: {

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
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	}
});

function mapStateToProps({ athletes }) {
	return { athletes };
}

export default connect(mapStateToProps, { updateCadence })(ResultsList);
