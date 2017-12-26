import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import {StackNavigator, TabNavigator } from 'react-navigation';
import DeckList from './Components/DeckList';
import DeckView from './Components/DeckView';
import AddDeck from './Components/AddDeck';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {white, blue} from './utils/colors';
import {Constants} from 'expo';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor:backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

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
        activeTintColor: blue,
    },
} );

const MainNavigator = StackNavigator({
   Home:{
       screen: Tabs
   },
    DeckView:{
       screen: DeckView,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            }
        })
    }
});

export default class App extends React.Component {
    render() {
        return (
          <View style={styles.container}>
              <MyStatusBar backgroundColor={blue} barStyle="light-content"/>
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
