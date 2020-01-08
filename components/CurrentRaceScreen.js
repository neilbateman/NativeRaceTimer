import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { List, ListItem, Button, Icon, Card } from 'react-native-elements';
import { Stopwatch } from 'react-native-stopwatch-timer';
import firebase from '../Firebase';
import { activateKeepAwake } from 'expo-keep-awake';

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
  }
  onCollectionUpdate = (querySnapshot) => {
    const racers = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author, time } = doc.data();
      racers.push({
        key: doc.id,
        doc,
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
    this._activate();
    this.setState({startTime: Date.now(), isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false});
    console.log(this.state.startTime);
  }
  resetStopwatch = () => {
    this.setState({isStopwatchStart: false, resetStopwatch: true});
  }
  millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }
  _activate = () => {
    activateKeepAwake();
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer} >
      <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}} centerContent>
      <View style={styles.scrollViewContainer}>
      <View styles={{alignItems: 'center'}}>
      <Stopwatch laps msecs
        start={this.state.isStopwatchStart}
        reset={this.state.resetStopwatch}
        options={options}
         />
      </View>
      <TouchableHighlight onLongPress={this.startStopStopWatch} style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginTop:10, alignContent: 'center'}}>
          {!this.state.isStopwatchStart ? "START" : "STOP"}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight onLongPress={this.resetStopwatch} style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginTop:10}}>RESET</Text>
      </TouchableHighlight>

          {
            this.state.racers.map((item, i) => (
              <ListItem
                titleStyle={{backgroundColor:  '#e8e8e8'}}
                key={i}
                title={item.title}
                subtitle={item.time}
                leftIcon={{name: 'face', type: 'material'}}
                onPress={() => {
                  let nowTime = Date.now();
                  let resolveTime = nowTime - this.state.startTime;
                  let resolveTimeMins = this.millisToMinutesAndSeconds(resolveTime);
                  let racerRef = firebase.firestore().collection('racers').doc(item.key)
                  racerRef.update({
                    time: resolveTimeMins,
                    exactTime: resolveTime

                  })
                }}
              />

            ))
          }
      </View>
      </ScrollView>
      </View>
    );
  }
}



const options = {
  container: {
    backgroundColor: '#ffccc7',
    padding: 10,
    paddingLeft: 10,
    borderRadius: 5,
    width: 'fit-content',
    alignItems:'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 25,
    color: '#873800',
    marginLeft: 7,
    alignItems: 'center'
  }
};
const styles = StyleSheet.create({scrollView : {
  height : Dimensions.get('window').height, }, mainContainer : {
  flex : 1, alignItems: 'center',  }, scrollViewContainer : { },

  container: {
    padding: 50,
    flex: 1,
    paddingBottom: 22,
    //alignContent: 'center'

   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
})

export default RacerScreen;
