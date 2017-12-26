import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import MyTextInput from './MyTextInput';
import {blue, white} from "../utils/colors";


export default class AddDeck extends Component {
    state = {
        name: ''
    };

    render() {
        const {name} = this.state;
        return (
          <View style={styles.container}>
              <Text style={styles.mainTxt}>What is the title of your new deck?</Text>
              <MyTextInput
                value={name}
                onChangeText={(text) => this.setState({name:text})}
                placeholder="Deck Name"
              />
              <TouchableOpacity style={styles.submitBtn}>
                  <Text style={styles.submitTxt}>Submit</Text>
              </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    mainTxt: {
        fontSize: 50,
        marginTop: 50,
        marginBottom: 50,
        justifyContent:'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    submitBtn: {
        margin: 50,
        borderRadius: 8,
        height: 30,
        width: 150,
        padding: 20,
        backgroundColor: blue,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    submitTxt: {
        textAlign: 'center',
        color: white,
        fontSize: 16
    }
});