import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { blue} from './utils/colors';
import {Constants} from 'expo';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {Provider} from 'react-redux';
import {rehydrate} from './actions';
import {setLocalNotification} from './utils/helpers';
import {MainNavigator} from "./router";

/** store Initialization **/
const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(rehydrate());


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor:backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);



export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification()
    }

    render() {
        return (
          <View style={styles.container}>
              <MyStatusBar backgroundColor={blue} barStyle="light-content"/>
              <Provider store={store}>
                  <MainNavigator/>
              </Provider>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
