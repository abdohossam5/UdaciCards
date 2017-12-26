import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {white, blue, lightblue} from '../utils/colors';

export default DeckCard = ({title, numberOfCards = 0}) => (
  <View style={styles.cardCont}>
      <Text style={styles.titleTxt}>Card</Text>
      <Text style={styles.countTxt}>{numberOfCards} Cards</Text>
  </View>
)

const styles = StyleSheet.create({
    cardCont: {
        flex: 1,
        height: 150,
        // flexDirection: 'row',
        backgroundColor: white,
        borderRadius: 8,
        margin: 10,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
        justifyContent:'center',
    },
    titleTxt: {
        fontSize: 30,
        marginTop: 50,
        justifyContent:'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: blue
    },
    countTxt: {
        fontSize: 15,
        flex:1,
        justifyContent:'center',
        alignSelf: 'center',
        color: lightblue
    }
});