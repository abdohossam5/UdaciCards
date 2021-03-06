import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {blue, lightblue, white} from '../utils/colors';
import {getDeckKeyFromTitle} from '../utils/helpers';
import {connect} from 'react-redux';

class DeckView extends Component {


    btnAction = btn => {
        const {title} = this.props.navigation.state.params;
        this.props.navigation.navigate(btn, {key: getDeckKeyFromTitle(title)})
    };

    render(){
        const {title, numberOfCards} = this.props;
        return (
          <View style={styles.container}>
              <Text style={styles.mainTxt}>{title}</Text>
              <Text style={styles.caption}>{numberOfCards} Cards</Text>
              <View style={styles.btnContainer}>
                  <TouchableOpacity style={[styles.btn, {backgroundColor: 'transparent'}]} onPress={() => this.btnAction('AddCard')}>
                      <Text style={[styles.btnTxt,{color: blue}]}>Add Card</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, {opacity: numberOfCards === 0 ? 0.5 : 1}]}
                    onPress={() => this.btnAction('Quiz')}
                    disabled={numberOfCards === 0}>
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


const mapStateToProps = (decks, {navigation}) => {
    const {title} = navigation.state.params;
    let key = getDeckKeyFromTitle(title);
    return {
        title: decks[key].title,
        numberOfCards: decks[key].questions.length
    }
};

export default connect(mapStateToProps)(DeckView);