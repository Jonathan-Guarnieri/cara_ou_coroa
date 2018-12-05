import { createStackNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import WelcomeScreen from './src/screens/WelcomeScreen'
import GameScreen from './src/screens/GameScreen'
import ResultScreen from './src/screens/ResultScreen'
import RaffleScreen from './src/screens/RaffleScreen';

const StackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Game: {
    screen: GameScreen,
    navigationOptions: {
      header: null,
    }
  },
  Raffle: {
    screen: RaffleScreen,
    navigationOptions: {
      header: null,
    }
  },
  Result: {
    screen: ResultScreen,
    navigationOptions: {
      header: null,
    }
  }
}, {
    initialRouteName: 'Welcome', // dev tool
  }
)

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <StackNavigator />
      </Provider>
    )
  }
}

export default App