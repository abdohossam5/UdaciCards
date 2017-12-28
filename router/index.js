import React from 'react';
import {StackNavigator, TabNavigator } from "react-navigation";
import {blue, lightblue, purple, white} from "../utils/colors";
import Quiz from "../Components/Quiz";
import AddDeck from "../Components/AddDeck";
import AddCard from "../Components/AddCard";
import DeckList from "../Components/DeckList";
import {Platform} from "react-native";
import DeckView from "../Components/DeckView";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


export const Tabs = TabNavigator({
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
        },
        tabBarOptions:{
            activeTintColor: purple,
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
        activeTintColor: purple,
        style:{
            height: 56,
            backgroundColor: Platform.OS === 'ios'? white : lightblue,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowRadius: 5,
            shadowOpacity: 1,
            shadowOffset:{
                width: 0,
                height:3
            }
        }
    },
} );

export const MainNavigator = StackNavigator({
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
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            }
        }
    }
});