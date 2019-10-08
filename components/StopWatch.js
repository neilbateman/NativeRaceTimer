import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

export default class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSnapshot: null,
      startTime: null,
      isStopwatchStart: false,
      timerDuration: 90000,
      resetStopwatch: false,
    };
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  startStopStopWatch = () => {
    this.setState({startTime: Date.now(), isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
    console.log(this.state.startTime);
  }
  resetStopwatch = () => {
    this.setState({isStopwatchStart: false, resetStopwatch: true});
  }

  collectTime = () => {
    let currentTime = Date.now();
    console.log("CurrentTime:",currentTime, "StartTime",this.state.startTime)
    let resolvedTime = currentTime - this.state.startTime;
    console.log(resolvedTime)
    this.setState({timeSnapshot: resolvedTime})
    console.log("timeDiff:", this.state.timeSnapshot)
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,marginTop:32, alignItems:'center', justifyContent:'center'}}>
          <Stopwatch laps msecs
            start={this.state.isStopwatchStart}
            //To start
            reset={this.state.resetStopwatch}
            //To reset
            options={options}
            //options for the styling
             />
          <TouchableHighlight onPress={this.startStopStopWatch}>
            <Text style={{fontSize: 20, marginTop:10}}>
              {!this.state.isStopwatchStart ? "START" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetStopwatch}>
            <Text style={{fontSize: 20, marginTop:10}}>RESET</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.collectTime}>
            <Text style={{fontSize: 20, marginTop:10}}>get time</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("Custom Completion Function");
const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems:'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  }
};
