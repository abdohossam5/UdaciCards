import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import Question from './Question';
import * as Animatable from 'react-native-animatable';
import {blue, white} from "../utils/colors";
import { NavigationActions } from 'react-navigation';
import {setLocalNotification} from "../utils/helpers";

class Quiz extends Component {
    state = {
        viewMode: 'question',
        scoreSheet: [],
        currentIdx: 0,
        resultOpacity: new Animated.Value(0)
    };

    componentWillUnmount() {
        this.state.resultOpacity.removeAllListeners()
    }

    componentDidMount() {
        // clear scheduled notifications and schedule a new one
        setLocalNotification();
    }

    handleSubmit = (correct) => {
        let {scoreSheet, currentIdx} = this.state;
        const {questions} = this.props;
        scoreSheet[currentIdx] = correct;
        this.setState({
            scoreSheet
        }, () => {
            if(currentIdx < questions.length-1){
                this.setState({
                    currentIdx: currentIdx+1
                })
            } else {
                // show result
                this.setState({
                    viewMode: 'result'
                })
            }
        })
    };

    restart = () => {
        this.setState({
            viewMode: 'question',
            scoreSheet: [],
            currentIdx: 0,
            resultOpacity: new Animated.Value(0)
        })
    };

    backToDeck = () => {
        const {navigation} = this.props;
        const title = navigation.state.params.key.replace(/_/g, ' ');

        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'}),
                NavigationActions.navigate({ routeName: 'DeckView', params:{title}})
            ]
        });
        navigation.dispatch(resetAction);
    };

    render(){
        const {currentIdx, viewMode, scoreSheet} = this.state;
        const {questions} = this.props;
        const question = questions[currentIdx].question;
        const answer = questions[currentIdx].answer;
        const correct = (scoreSheet.filter(a => a === true)).length;

        return(
          <View style={styles.container}>
              {viewMode === 'question' && (
                <Question
                  index={currentIdx+1}
                  outOf={questions.length}
                  question={question}
                  answer={answer}
                  onSubmit={this.handleSubmit}
                />
              )}

              {viewMode === 'result' && (
                <Animatable.View  animation="fadeIn" duration={2000} style={styles.center}>
                    <Text style={[styles.resultTxt]}>
                        {`${correct}/${questions.length}`}
                    </Text>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: 'transparent'}]} onPress={this.restart}>
                        <Text style={[styles.btnTxt,{color: blue}]}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this.backToDeck}>
                        <Text style={styles.btnTxt}>Back to Deck</Text>
                    </TouchableOpacity>
                </Animatable.View>
              )}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    resultTxt: {
        fontSize: 100,
        paddingTop: 20,
        paddingBottom: 20
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
  const key = navigation.state.params.key;
  return {
      questions: decks[key].questions
  }
};

export default connect(mapStateToProps)(Quiz)