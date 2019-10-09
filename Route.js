import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RacerScreen from './components/RacerScreen';
import RacerDetailScreen from './components/RacerDetailScreen';
import AddRacerScreen from './components/AddRacerScreen';
import EditRacerScreen from './components/EditRacerScreen';
import HomeScreen from './components/HomeScreen';
import RaceScreen from './components/RaceScreen';
import RaceResult from './components/RaceResult'
import CurrentRaceScreen from './components/CurrentRaceScreen';
import Login from './login/Login';
import 'firebase/auth';
import { FirebaseAuthProvider, IfFirebaseAuthed } from '@react-firebase/auth'
import firebase from './Firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';


const Stack = createStackNavigator(
  {
    Login: Login,
    Home: HomeScreen,
    Racer: RacerScreen,
    RacerDetails: RacerDetailScreen,
    AddRacer: AddRacerScreen,
    EditRacer: EditRacerScreen,
    RaceScreen: RaceScreen,
    RaceResult: RaceResult,
    CurrentRaceScreen: CurrentRaceScreen
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
);


const RootStack = createAppContainer(Stack);


export default class Route extends React.Component {

  render() {
    return(

        <RootStack />

    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#777776',
    alignItems: 'center',
    justifyContent: 'center',
  },
});