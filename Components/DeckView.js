import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {blue, lightblue, white} from "../utils/colors";

export default class DeckView extends Component {


    render(){
        const {title, numberOfCards} = this.props.navigation.state.params;
        return (
          <View style={styles.container}>
              <Text style={styles.mainTxt}>{title}</Text>
              <Text style={styles.caption}>{numberOfCards} Cards</Text>
              <View style={styles.btnContainer}>
                  <TouchableOpacity style={[styles.btn, {backgroundColor: 'transparent'}]}>
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
