import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { saveAthlete, getAthletes } from '../actions';


class AddAthlete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputName: '' }
	}

	addAthlete() {
		if (this.state.inputName === '') {
			alert("please enter a name");
			return
		}
		let newName = this.state.inputName.toUpperCase();
		newName = newName.replace(' ', '_');
		const newAthlete = {
			name: newName,
			cadence: 0.00
		}
		this.props.saveAthlete(newAthlete);
		this.setState({inputName: ''});
		AsyncStorage.setItem(`${newName}`, JSON.stringify(newAthlete))
			.then(() => this.props.navigation.navigate('Athletes'));

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.titleText}>enter new name:</Text>
				</View>
				<View style={styles.input}>
					<TextInput
					autoFocus={true}
						style={styles.inputText}
						onChangeText={(inputName) => this.setState({inputName})}
						value={this.state.inputName}
					/>
				</View>
				<View style={styles.btnGroup}>
					<TouchableOpacity onPress={ () => {
						this.props.navigation.navigate('Athletes')
					}}>
						<Text style={styles.cancelBtn}>CANCEL</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={ () => {
						this.addAthlete()}}>
						<Text style={styles.saveBtn}>SAVE</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 25,
		paddingLeft: 25,
		paddingRight: 25
	},
	title: {
		paddingTop: 25
	},
	titleText: {
		color: '#2F0000',
		fontSize: 25
	},
	input: {
		paddingTop: 25,
		justifyContent: 'center'
	},
	inputText: {
		height: 45,
		borderColor: '#888',
		borderWidth: 1,
		borderRadius: 2,
		paddingLeft: 10,
		fontSize: 25,
		color: '#2F0000'
	},
	btnGroup: {
		paddingTop: 25,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
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

export default connect(mapStateToProps, { saveAthlete, getAthletes })(AddAthlete);
