import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {lightblue, white, red, green, gray} from '../utils/colors';
import * as Animatable from 'react-native-animatable';
import TextButton from './TextButton'


export default class Question extends Component {

    state = {
        showing: 'question'
    };

    animateCard = () => {
        this.refs.question.flipOutX(1000).then(() => {
            const {showing} = this.state;
            this.setState({
                showing: showing === 'question' ? 'answer' : 'question'
            }, () => {
                this.refs.question.flipInX(1000)
            });

        })
    };

    render() {
        let {showing} = this.state;
        const {index, outOf, question, answer, onSubmit} = this.props;
        return (
          <Animatable.View ref='question' style={[styles.container]}>

              <Text style={styles.questionCountTxt}>
                  {`${index}/${outOf}`}
              </Text>

              {showing === 'question' && (
                <View style={styles.mainTxtCont}>
                    <Text style={styles.mainTxt}>{question}</Text>
                </View>
              )}

              {showing === 'answer' && (
                <View style={styles.mainTxtCont}>
                    <Text style={styles.mainTxt}>{answer}</Text>
                </View>
              )}


              <TextButton style={styles.captionTxt} onPress={this.animateCard}>
                  <Text>Show {showing === 'answer'? 'Question' : 'Answer'}</Text>
              </TextButton>

              <View style={styles.submitBtnCont}>
                  <TouchableOpacity style={[styles.submitBtn]} onPress={()=>onSubmit(true)}>
                      <Animated.Text style={[styles.submitTxt]}>Correct</Animated.Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.submitBtn,{backgroundColor: red}]} onPress={()=>onSubmit(false)}>
                      <Animated.Text style={[styles.submitTxt]}>Incorrect</Animated.Text>
                  </TouchableOpacity>
              </View>

          </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
        justifyContent: 'flex-start',
    },
    mainTxtCont: {
        flexDirection: 'row',
        // flex:1,
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    mainTxt:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    questionCountTxt: {
        padding:10,
        justifyContent: 'flex-start',
        color: gray,
        fontSize: 20,
        fontWeight: 'bold'
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150,
        height: 75,
        backgroundColor: green,
        borderRadius: 8
    },
    captionTxt: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        color: lightblue
    },
    submitBtnCont: {
        flex:1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    submitBtn: {
        margin: 10,
        borderRadius: 8,
        height: 50,
        width: 200,
        padding: 20,
        backgroundColor: green,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    submitTxt: {
        textAlign: 'center',
        color: white,
        fontSize: 25
    }
});