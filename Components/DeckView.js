import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {blue, lightblue, white} from '../utils/colors';
import {getDeckKeyFromTitle} from '../utils/helpers'
import {getDeck} from '../utils/api'

export default class DeckView extends Component {

    state = {
        title: '',
        numberOfCards: ''
    };

    async componentDidMount(){
        await this.loadDeck()
    }


    loadDeck = async () => {
        const {title} = this.props.navigation.state.params;
        let deck = await getDeck({title});
        if(deck.title !== title || deck.questions.length !== this.state.numberOfCards){
            this.setState({
                title: deck.title,
                numberOfCards: deck.questions.length
            })
        }
    };

    addCard = () => {
        const {title} = this.props.navigation.state.params;
        this.props.navigation.navigate('AddCard', {key: getDeckKeyFromTitle(title), onNavigateBack: this.loadDeck})
    };

    render(){
        const {title, numberOfCards} = this.state;
        return (
          <View style={styles.container}>
              <Text style={styles.mainTxt}>{title}</Text>
              <Text style={styles.caption}>{numberOfCards} Cards</Text>
              <View style={styles.btnContainer}>
                  <TouchableOpacity style={[styles.btn, {backgroundColor: 'transparent'}]} onPress={this.addCard}>
                      <Text style={[styles.btnTxt,{color: blue}]}>Add Card</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                      <Text style={styles.btnTxt}>Start Quiz</Text>
                  </TouchableOpacity>
              </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    mainTxt: {
        fontSize: 50,
        marginTop: 70,
        marginBottom: 20,
        justifyContent:'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        color: blue
    },
    caption: {
        fontSize: 30,
        flex:1,
        justifyContent:'center',
        alignSelf: 'center',
        color: lightblue
    },
    btnContainer: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        flex:1
    },
    btn: {
        margin: 20,
        borderRadius: 8,
        height: 50,
        width: 200,
        padding: 20,
        borderWidth: 2,
        borderColor: blue,
        backgroundColor: blue,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        textAlign: 'center',
        color: white,
        fontSize: 25
    }
});
