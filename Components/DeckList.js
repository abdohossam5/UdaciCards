import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DeckCard from './DeckCard';
import { Platform } from 'react-native';
import { gray } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';


class DeckList extends Component {

    navigateToDeckView = (title, numberOfCards) => {
        this.props.navigation.navigate('DeckView', {title, numberOfCards})
    };

    render(){
        const {decks} = this.props;

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
              <FlatList
                data={decks}
                renderItem={({item}) => (
                  <DeckCard
                    key={item.key}
                    title={item.title}
                    numberOfCards={item.numberOfCards}
                    viewDeck={() => this.navigateToDeckView(item.title, item.numberOfCards)}
                  />
                )}
              />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    }
});

const mapStateToProps = (rawDecks) => ({
    decks: Object.keys(rawDecks).reduce((decks, key) => {
        decks.push({
            title: rawDecks[key].title,
            numberOfCards: rawDecks[key].questions.length,
            key
        });
        return decks;
    }, [])
});

export default connect(mapStateToProps)(DeckList);