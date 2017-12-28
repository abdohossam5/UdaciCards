import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {blue, bottomGray} from '../utils/colors';

export default class MyTextInput extends Component{

    state = {
      isFocused: false
    };

    toggleInputFocus = (isFocused) => {
        this.setState({ isFocused })
    };

    render(){
        const {onFocusBorderColor = blue, overrideStyle= {}, ...props} = this.props;
        const {isFocused} = this.state;
        return (
          <View style={[styles.container, overrideStyle, {borderColor: isFocused ? onFocusBorderColor: bottomGray}]}>
              <TextInput
                style={[styles.input]}
                {...props}
                onFocus={()=> this.toggleInputFocus(true)}
                onBlur={()=> this.toggleInputFocus(false)}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
          </View>
        )
    }
}

const styles = StyleSheet.create({
   container:{
       flexDirection: 'row',
       height: 40,
       backgroundColor: 'transparent',
       // borderColor: gray,
       padding: 10,
       margin: 20,
       borderBottomWidth: 1.5
   },
    input: {
       flex:1
    }
});