import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import _ from 'lodash';

import { getAthletes, setCurrentAthlete } from '../actions';


class AthleteList extends React.Component {

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

export default connect(mapStateToProps, { getAthletes, setCurrentAthlete })(AthleteList);

				// <Modal
				// 	style={styles.modal}
				// 	animationType={"slide"}
				// 	transparent={true}
				// 	visible={this.state.modalVisible}
				// 	onRequestClose={ () => {this.setModalVisible(!this.state.modalVisible)}}>
				// 	<View style={styles.modalContainer}>

				// 		<View style={styles.modalTitle}>
				// 			<Text style={styles.modalTitleText}>enter athlete name</Text>
				// 		</View>
				// 		<View style={styles.modalInput}>
				// 			<TextInput
				// 				style={styles.modalInputText}
				// 				onChangeText={(inputName) => this.setState({inputName})}
				// 				value={this.state.inputName}
				// 			/>
				// 		</View>

				// 		<View style={styles.modalBtnGroup}>
				// 			<TouchableOpacity onPress={ () => {
				// 				this.setModalVisible(!this.state.modalVisible)
				// 			}}>
				// 				<Text style={styles.cancelBtn}>CANCEL</Text>
				// 			</TouchableOpacity>
				// 			<TouchableOpacity onPress={ () => {
				// 				this.addAthlete()}}>
				// 				<Text style={styles.saveBtn}>SAVE</Text>
				// 			</TouchableOpacity>
				// 		</View>

				// 	</View>
				// </Modal>
