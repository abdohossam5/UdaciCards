import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DeckCard from './DeckCard'
import { ActivityIndicator, Platform } from 'react-native';
import { lightblue, gray } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';


export default class DeckList extends Component {

    state = {
        decks: [],
        isFetching: false
    };

    render(){
        const {decks, isFetching} = this.state;

        if(isFetching){
            return (<View style={styles.container}><ActivityIndicator size="large" color={lightblue} /></View>)
        }

        if(!decks.length){
            return (
              <View style={[styles.container,{flexDirection: 'column'}]}>
                  <Ionicons
                    name={Platform.OS === 'ios'? 'ios-sad-outline' : 'md-sad'}
                    size={50}
                    style={{alignSelf: 'center', margin:20}}
                  />
                  <Text style={{alignSelf: 'center', color: gray, fontSize: 14}}>You haven't added any decks yet</Text>
              </View>
            )
        }
        return (
          <View style={styles.container}>
              <DeckCard></DeckCard>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    }
});