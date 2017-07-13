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

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	selectAthlete(athleteName) {
		this.props.setCurrentAthlete(athleteName);
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
					style={styles.modal}
					animationType={"slide"}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={ () => {this.setModalVisible(!this.state.modalVisible)}}>
					<View style={styles.modalContainer}>

						<View style={styles.modalTitle}>
							<Text style={styles.modalTitleText}>enter athlete name</Text>
						</View>
						<View style={styles.modalInput}>
							<TextInput
								style={styles.modalInputText}
								onChangeText={(inputName) => this.setState({inputName})}
								value={this.state.inputName}
							/>
						</View>

						<View style={styles.modalBtnGroup}>
							<TouchableOpacity onPress={ () => {
								this.setModalVisible(!this.state.modalVisible)
							}}>
								<Text style={styles.cancelBtn}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={ () => {
								this.addAthlete()}}>
								<Text style={styles.saveBtn}>SAVE</Text>
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
	},
	modal: {

	},
	modalContainer: {
		marginTop: (Dimensions.get('window').height - 200) / 2,
		marginBottom: (Dimensions.get('window').height - 200) / 2,
		marginRight: 35,
		marginLeft: 35,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: 'rgba(255,255,255,0.95)'
	},
	modalTitle: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	modalTitleText: {
		color: '#888',
		fontSize: 25
	},
	modalInput: {
		flex: 1,
		width: '80%',
		justifyContent: 'center'
	},
	modalInputText: {
		height: 45,
		borderColor: '#888',
		borderWidth: 1,
		borderRadius: 2,
		paddingLeft: 10,
		fontSize: 25,
		color: '#444'
	},
	modalBtnGroup: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	},
	cancelBtn: {
		fontSize: 20,
		color: 'gray'
	},
	saveBtn: {
		fontSize: 20,
		color: 'green'
	}

});

function mapStateToProps({ athletes }) {
	return { athletes };
}

export default connect(mapStateToProps, { getAthletes, setCurrentAthlete, saveAthlete })(AthleteList);
