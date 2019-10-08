import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon, Card } from 'react-native-elements';
import firebase from '../Firebase';
import StopWatch from './StopWatch';

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
  constructor() {
    super();
    this.ref = firebase.firestore().collection('racers');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      racers: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // console.log(ref.key)
  }
  onCollectionUpdate = (querySnapshot) => {
    const racers = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      racers.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      racers,
      isLoading: false,
   });
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
      <ScrollView style={styles.container}>
        <StopWatch/>
          {
            this.state.racers.map((item, i) => (
              <ListItem
                key={i}
                title={item.key}
                leftIcon={{name: 'face', type: 'material'}}
                onPress={() => {
                  this.props.navigation.navigate('RacerDetails', {
                    racerkey: `${JSON.stringify(item.key)}`,
                  });
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
    padding: 20,
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
