import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import Question from './Question';
import * as Animatable from 'react-native-animatable';

class Quiz extends Component {
    state = {
        viewMode: 'question',
        scoreSheet: [],
        currentIdx: 0,
        resultOpacity: new Animated.Value(0)
    };

    handleSubmit = (correct) => {
        let {scoreSheet, currentIdx} = this.state;
        const {questions} = this.props
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
                <View style={styles.center}>
                    <Animatable.Text animation="fadeIn" duration={2000} style={[styles.resultTxt]}>
                        {`${correct}/${questions.length}`}
                    </Animatable.Text>
                </View>
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
    }
});

const mapStateToProps = (decks, {navigation}) => {
  const key = navigation.state.params.key;
  return {
      questions: decks[key].questions
  }
};

export default connect(mapStateToProps)(Quiz)