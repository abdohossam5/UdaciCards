import React, {Component} from 'react'
import {View, Text} from 'react-native'


export default class DeckList extends Component {

    render(){
        return (
          <View style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center'
          }}>
              <Text>Deck List</Text>
          </View>
        )
    }
}