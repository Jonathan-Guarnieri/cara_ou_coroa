import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated, TouchableHighlight, BackHandler, ToastAndroid } from 'react-native'
import Video from 'react-native-video'
import video from '../videos/moeda-girando-cinematografica.mp4'

export default class WelcomeScreen extends Component {

  constructor() {
    super()
    this.animatedValue = new Animated.Value(0)
    this.animate()
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.noBackForYou);
  }

  noBackForYou = () => {
    //ToastAndroid.show('Sorry, no back for you Jonny boy', ToastAndroid.LONG);
    return true; // se retornar false tudo funciona igual porém o botão funciona
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start(() => this.animate())
  }

  onTouch = () => {
    this.props.navigation.navigate('Game')
  }

  render() {

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })

    return (

      <TouchableHighlight onPress={this.onTouch} style={{ flex: 1 }} >
        <View style={styles.container}>

          <Video
            source={video}
            resizeMode='cover'
            style={styles.video}
            repeat={true}
          />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Cara ou Coroa</Text>
            <Text style={styles.subtitle}>the game</Text>
          </View>

          <Animated.Text style={[{ opacity }, styles.message]}>
            touch anywhere to continue
          </Animated.Text>

        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({

  // Main view
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Background container
  video: {
    position: 'absolute',
    height: 592,
    width: 384 / 0.75,
    zIndex: 0,
    transform: [{ scaleX: 0.75 }],

  },

  // Title container
  titleContainer: {
    position: 'absolute',
    right: 1,
    marginRight: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontFamily: 'times new roman',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'times new roman',
    color: 'white',
    fontSize: 26,
    fontStyle: 'italic',
  },

  // Message container
  message: {
    position: 'absolute',
    bottom: 1,
    marginBottom: 10,
    fontFamily: 'times new roman',
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
  }

});
