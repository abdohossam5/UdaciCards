import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {blue, lightblue, white} from "../utils/colors";
import MyTextInput from './MyTextInput';
import {addCardToDeck} from "../utils/api";

export default class AddCard extends Component {

    state = {
        question: '',
        answer: '',
        bounceValue: new Animated.Value(0),
        key: ''
    };

    componentDidMount(){
        this.setState({
            key:this.props.navigation.state.params.key
        })
    }

    submit = async () => {
        const {question, answer, bounceValue, key} = this.state;

        if (!question || !answer) {
            return Animated.sequence([
                Animated.timing(bounceValue, {duration: 200, toValue: -10}),
                Animated.timing(bounceValue, {duration: 200, toValue: 10}),
                Animated.timing(bounceValue, {duration: 200, toValue: -10}),
                Animated.timing(bounceValue, {duration: 200, toValue: 10}),
                Animated.timing(bounceValue, {duration: 200, toValue: 0})
            ]).start()
        }

        await addCardToDeck(key, {question, answer});
        const {onNavigateBack} = this.props.navigation.state.params;
        if(onNavigateBack) onNavigateBack();
        this.props.navigation.goBack('AddCard')
    };


    render() {
        const {question, answer, bounceValue} = this.state;
        return (
          <View style={styles.container}>

              <MyTextInput
                overrideStyle={{margin:0}}
                value={question}
                onChangeText={(text) => this.setState({question: text})}
                placeholder="Question"
              />

              <MyTextInput
                overrideStyle={{margin:0}}
                value={answer}
                onChangeText={(text) => this.setState({answer: text})}
                placeholder="Answer"
              />


              <TouchableOpacity style={[styles.submitBtn]} onPress={this.submit}>
                  <Animated.Text
                    style={[styles.submitTxt, {transform: [{translateX: bounceValue}]}]}>Submit</Animated.Text>
              </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
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
        height: 50,
        width: 200,
        padding: 20,
        backgroundColor: blue,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    submitTxt: {
        textAlign: 'center',
        color: white,
        fontSize: 25
    }
});