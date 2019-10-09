import React from 'react';
import Route from './Route';
import 'firebase/auth';
import { FirebaseAuthProvider, IfFirebaseAuthed } from '@react-firebase/auth'
import firebase from './Firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';


// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };


export default class App extends React.Component {

  render() {
    return(

        <Route />

    )

  }
}
