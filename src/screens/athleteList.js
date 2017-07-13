import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getAthletes, setCurrentAthlete, saveAthlete } from '../actions';


class AthleteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			modalVisible: false,
			inputName: ''
		}
	}

	componentWillMount() {
		console.log("this.state.inputName", this.state.inputName);
		// this.props.getAthletes();
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
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
		let newName = this.state.inputName.toUpperCase();
		newName = newName.replace(' ', '_');
		const newAthlete = {
			name: newName,
			cadence: 0.00
		}
		this.props.saveAthlete(newAthlete);

		this.setModalVisible(!this.state.modalVisible)
		this.setState({inputName: ''});
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
						<TouchableOpacity onPress={() => this.setModalVisible(true)}>
							<Text style={styles.titleText}>add new athlete</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={ () => {alert("Modal has been closed")}}>
					<View style={{marginTop: 40}}>
						<View>

							<TextInput
								style={{height: 40, borderColor: 'gray', borderWidth: 1}}
								onChangeText={(inputName) => this.setState({inputName})}
								value={this.state.inputName}
							/>

							<TouchableOpacity onPress={ () => {
								this.setModalVisible(!this.state.modalVisible)
							}}>
								<Text style={{paddingTop: 35}}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={ () => {
								this.addAthlete()}}>
								<Text style={{paddingTop: 35}}>Save athlete</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

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

export default connect(mapStateToProps, { getAthletes, setCurrentAthlete, saveAthlete })(AthleteList);
