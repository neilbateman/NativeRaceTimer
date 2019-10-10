import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RacerScreen from './components/RacerScreen';
import RacerDetailScreen from './components/RacerDetailScreen';
import AddRacerScreen from './components/AddRacerScreen';
import EditRacerScreen from './components/EditRacerScreen';
import HomeScreen from './components/HomeScreen';
import RaceResult from './components/RaceResult'
import CurrentRaceScreen from './components/CurrentRaceScreen';
import Login from './components/Login';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {View, StyleSheet} from 'react-native'

const Stack = createStackNavigator(
  {
    Login: Login,
    Home: HomeScreen,
    Racer: RacerScreen,
    RacerDetails: RacerDetailScreen,
    AddRacer: AddRacerScreen,
    EditRacer: EditRacerScreen,
    RaceResult: RaceResult,
    CurrentRaceScreen: CurrentRaceScreen
  },
  {
    initialRouteName: 'Login',

  },
);

const BottomStack = createBottomTabNavigator(
  {

    Home: HomeScreen,
    CurrentRaceScreen: CurrentRaceScreen,
    Racer: RacerScreen,
    AddRacer: AddRacerScreen,
    RaceResult: RaceResult,

  },

);

const RootStack = createAppContainer(Stack);
const Route = () => (
  <View style={styles.container}>
  <RootStack />

  </View>
)
export default Route;

const styles = StyleSheet.create({
  container: {backgroundColor: '#adc6ff'}
})
