import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import Timer from './screens/timer';
import AthleteList from './screens/athleteList';
import ResultsList from './screens/resultsList';


const StackNavigatorConfig = {
	headerMode: 'none'
}

const MainScreenNavigator = StackNavigator({
  Home: { screen: Timer },
  Athletes: { screen: AthleteList },
  Results: { screen: ResultsList },
}, StackNavigatorConfig );

export default class App extends React.Component {
	render() {
		return (
			<MainScreenNavigator />
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#222',
		paddingTop: Constants.statusBarHeight
	}
});
