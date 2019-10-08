import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import RacerScreen from './components/RacerScreen';
import RacerDetailScreen from './components/RacerDetailScreen';
import AddRacerScreen from './components/AddRacerScreen';
import EditRacerScreen from './components/EditRacerScreen';
import HomeScreen from './components/HomeScreen';
import RaceScreen from './components/RaceScreen';
import RaceResult from './components/RaceResult'
import CurrentRaceScreen from './components/CurrentRaceScreen';
import 'firebase/auth';
import { FirebaseAuthProvider, IfFirebaseAuthed } from '@react-firebase/auth'
import firebase from './Firebase';

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

const RacerScreenStack = createStackNavigator({
    RacerScreen: RacerScreen
});

const RacerDetailScreenStack = createStackNavigator({
    RacerDetail: RacerDetailScreen
});

const CurrentRaceScreenStack = createStackNavigator({
    CurrentRace: CurrentRaceScreen
});

const RaceResultStack = createStackNavigator({
    RaceResult: RaceResult
});

const 



const MainNavigator = createBottomTabNavigator(
{
    Home: { screen: HomeStack },
    Racers: { screen: RacerScreenStack },
    Race: { screen: CurrentRaceScreenStack },
    Results: { screen: RaceResultStack },
},
{
    navigationOptions: {
        header: null
    }
});

export default MainNavigator;