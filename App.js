// import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import data from './Exampledata';
// const data = [
//   {title: 'a', sender: 'A', subject: 'sub_A'},
//   {title: 'b', sender: '', subject: 'sub_B'},
//   {title: 'c', sender: 'c', subject: 'sub_C'},
//   {title: 'd', sender: 'd', subject: 'sub_D'},
// ];
const data = [
  {id: '1', value: '1'},
  {id: '2', value: '2'},
  {id: '3', value: '3'},
  {id: '4', value: '4'},
  {id: '5', value: '5'},
  {id: '6', value: '6'},
  {id: '7', value: '7'},
  {id: '8', value: '8'},
  {id: '9', value: '9'},
  {id: '10', value: '10'},
];

export default function App() {
  const [emails, setEmails] = useState(data);

  const ListItem = ({val}) => {
    const {id, value} = val;

    const height = new Animated.Value(40);
    const animatedDelete = () => {
      Animated.timing(height, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }).start(() =>
        setEmails(prevState => prevState.filter(e => e.id !== val.id)),
      );
    };

    const swipeRight = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-200, 0],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
      });
      return (
        <Animated.View
          style={{
            backgroundColor: 'red',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Animated.Text
            style={{
              marginLeft: 'auto',
              marginRight: 50,
              fontSize: 15,
              fontWeight: 'bold',
              transform: [{scale}],
            }}>
            Delete Item
          </Animated.Text>
        </Animated.View>
      );
    };
    return (
      <Swipeable
        renderRightActions={swipeRight}
        rightThreshold={-200}
        onSwipeableOpen={animatedDelete}>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
            borderBottomWidth: 1,
            backgroundColor: 'white',
          }}>
          <Text style={{width: 150, textAlign: 'center'}}>{value}</Text>
          {/* <View style={{overflow: 'visible'}}>
            <Text>From: {}</Text>
            <Text>Subject: {}</Text>
          </View> */}
        </Animated.View>
      </Swipeable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={emails}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListItem val={item} />}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
