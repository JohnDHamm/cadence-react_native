import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { setCurrentAthlete, deleteAthlete } from '../actions';


class AthleteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			modalVisible: false,
			athleteToDelete: ''
		}
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	selectAthlete(athleteName) {
		this.props.setCurrentAthlete(athleteName);
		this.props.navigation.navigate('Home');
	}

	_deleteAthlete() {
		console.log("athlete to delete", this.state.athleteToDelete);
		this.setModalVisible(false);
		this.props.deleteAthlete(this.state.athleteToDelete);
		AsyncStorage.removeItem(this.state.athleteToDelete);
	}

	renderAthleteList() {
		return _.map(this.props.athletes, athlete => {
			return (
				<TouchableOpacity
					key={athlete.name}
					onPress={() => this.selectAthlete(athlete.name)}
					onLongPress={() => {
						this.setState({ athleteToDelete: athlete.name })
						this.setModalVisible(true)
					}}
				>
					<Text style={styles.athleteText}>{athlete.name}</Text>
				</TouchableOpacity>
			);
		})
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
						<TouchableOpacity onPress={() => this.props.navigation.navigate('AddAthlete')}>
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
							<Text style={styles.modalTitleText}>Delete {this.state.athleteToDelete}?</Text>
						</View>

						<View style={styles.modalBtnGroup}>
							<TouchableOpacity onPress={ () => {
								this.setModalVisible(!this.state.modalVisible)
							}}>
								<Text style={styles.cancelBtn}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={ () => {
								this._deleteAthlete()}}>
								<Text style={styles.saveBtn}>DELETE</Text>
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
		paddingTop: 25
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
	modalContainer: {
		marginTop: (Dimensions.get('window').height - 100) / 2,
		marginBottom: (Dimensions.get('window').height - 100) / 2,
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
		color: '#444',
		fontSize: 22
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
		color: '#888'
	},
	saveBtn: {
		fontSize: 20,
		color: 'green'
	}
});

function mapStateToProps({ athletes }) {
	return { athletes };
}

export default connect(mapStateToProps, { setCurrentAthlete, deleteAthlete })(AthleteList);
