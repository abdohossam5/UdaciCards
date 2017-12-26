import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {StackNavigator, TabNavigator } from 'react-navigation';
import DeckList from './Components/DeckList';
import AddDeck from './Components/AddDeck';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


const Tabs = TabNavigator({
   DeckList: {
       screen: DeckList,
       navigationOptions:{
           tabBarLabel: 'DECKS',
           tabBarIcon: ({ tintColor }) => (
             <MaterialCommunityIcons
               name="cards-outline"
               size={30}
               color={tintColor}
             />
           ),
       }
   },
   AddDeck: {
       screen: AddDeck,
       navigationOptions:{
           tabBarLabel: 'Add Deck',
           tabBarIcon: ({ tintColor }) => {
               if( Platform.OS === 'ios'){
                   return (
                     <Ionicons
                       name="ios-add"
                       size={30}
                       color={tintColor}
                     />
                   )
               }
               return (
                  <Ionicons
                       name="md-add-circle"
                       size={30}
                       color={tintColor}
                  />
               )

           },
       }
   }
},{
    navigationOptions:{header: null},
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
} );

const MainNavigator = StackNavigator({
   Home:{
       screen: Tabs
   }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
