import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './src/reducers';

import Timer from './src/screens/timer';
import AthleteList from './src/screens/athleteList';
import AddAthlete from './src/screens/addAthlete';
import ResultsList from './src/screens/resultsList';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const StackNavigatorConfig = {
	headerMode: 'none',
	cardStyle: {
		opacity: 1
	}
}

const MainScreenNavigator = StackNavigator({
  Home: { screen: Timer },
  Athletes: { screen: AthleteList },
  AddAthlete: { screen: AddAthlete },
  Results: { screen: ResultsList },
}, StackNavigatorConfig );

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStoreWithMiddleware(reducers)}>
				<MainScreenNavigator />
			</Provider>
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
