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
    initialRouteName: 'CurrentRaceScreen',

  },
);

const RootStack = createAppContainer(Stack);

const Route = () => (
  <RootStack />
)
export default Route;