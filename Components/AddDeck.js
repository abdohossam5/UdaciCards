import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import MyTextInput from './MyTextInput';
import {blue, white} from "../utils/colors";
import {saveDeckTitle, getDeck} from '../utils/api';


export default class AddDeck extends Component {
    state = {
        name: '',
        bounceValue: new Animated.Value(0)
    };

    submit = async () => {
        const {name, bounceValue} = this.state;
        let valid = true;
        if (!name) valid = false;

        let keyExist = await getDeck({title:name});
        if(keyExist && keyExist.title) valid = false;

        if (!valid) {
            return Animated.sequence([
                Animated.timing(bounceValue, {duration: 200, toValue: -10}),
                Animated.timing(bounceValue, {duration: 200, toValue: 10}),
                Animated.timing(bounceValue, {duration: 200, toValue: -10}),
                Animated.timing(bounceValue, {duration: 200, toValue: 10}),
                Animated.timing(bounceValue, {duration: 200, toValue: 0})
            ]).start()
        }


        await saveDeckTitle(name);
        this.props.navigation.navigate('DeckList')
    };

    render() {
        const {name, bounceValue} = this.state;
        return (
          <View style={styles.container}>
              <Text style={styles.mainTxt}>What is the title of your new deck?</Text>
              <MyTextInput
                value={name}
                onChangeText={(text) => this.setState({name:text})}
                placeholder="Deck Name"
              />
              <TouchableOpacity style={[styles.submitBtn]} onPress={this.submit}>
                  <Animated.Text style={[styles.submitTxt, {transform: [{translateX:bounceValue}]}]}>Submit</Animated.Text>
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