import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableHighlight } from 'react-native';
import { List, ListItem, Button, Icon, Card } from 'react-native-elements';
import { Stopwatch } from 'react-native-stopwatch-timer';
import firebase from '../Firebase';

class RacerScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Current Race',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddRacer') }}
        />
      ),
    };
  };
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('racers');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      racers: [],
      timeSnapshot: null,
      startTime: null,
      isStopwatchStart: false,
      resetStopwatch: false,
    };
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // console.log(ref.key)
  }
  onCollectionUpdate = (querySnapshot) => {
    const racers = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author, time } = doc.data();
      racers.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        time
      });
    });
    this.setState({
      racers,
      isLoading: false,
   });
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
    //console.log("CurrentTime:",currentTime, "StartTime",this.state.startTime)
    let resolvedTime = currentTime - this.state.startTime;
    //console.log("timeDiff:",resolvedTime)

    //firebase.firestore().collection('racers').doc(key).push(resolvedTime)
    //this.setState({racers.time: resolvedTime})
    //console.log(, this.state.timeSnapshot)
  }
  associateTimewithRunner = () => {
    this.collectTime();
    const updateRef = firebase.firestore().collection('racers').doc(this.state.key);
    updateRef.add({time: this.resolvedTime})

    console.log(this.state.racers)
  }
  getRaceTime = () => {
    this.collectTime();

    let currentRacer = this.state.key;
    let updateRacerTime = firebase.firestore().collection('racers').doc(currentRacer);
    updateRacerTime.add({time: this.resolvedTime})
  }
  logIt = () => {
    this.collectTime();
    console.log(this.resolvedTime)
  }
  addRacer = (key) => {
    let currentTime = Date.now();
    let currentRacer = this.state.racers[1];
    let resolveTime = currentTime - this.state.startTime;
    console.log(resolveTime)
    firebase.firestore().collection('racers').add({ time: resolveTime})
  }
  updateRacer = () => {
    this.collectTime();
    let currentRacer = this.state.racers[1];
    console.log(currentRacer)
    firebase.firestore().collection('racers').doc(currentRacer).add({
      time: this.resolvedTime})}

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (

      <ScrollView style={styles.container}>
      <Stopwatch laps msecs
        start={this.state.isStopwatchStart}
        reset={this.state.resetStopwatch}
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
        <Text style={{fontSize: 20, marginTop:10}}>get diff</Text>
      </TouchableHighlight>
          {
            this.state.racers.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                subtitle={item.time} 
                leftIcon={{name: 'face', type: 'material'}}
                onPress={() => {
                  let nowTime = Date.now();
                  let resolveTime = nowTime - this.state.startTime;
                  let racerRef = firebase.firestore().collection('racers').doc(item.key)
                  this.collectTime();
                  racerRef.update({
                    time: resolveTime
                  })
                }}
              />

            ))
          }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default RacerScreen;
