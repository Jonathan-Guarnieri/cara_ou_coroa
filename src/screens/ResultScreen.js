import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button, BackHandler, Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as playActions from '../actions'
import cara from '../images/cara.jpg'
import coroa from '../images/coroa.png'
import background from '../images/background-rock.jpg'
var SoundPlayer = require('react-native-sound')

class ResultScreen extends Component {

  state = {
    listWin: [
      [24, 26],
      [26, 31.5],
      [44, 47],
    ],
    listFail: [
      [11, 14],
      [14, 19],
      [20, 24],
      [28, 29],
      [33, 35],
      [37, 39],
      [41, 45],
    ],
    buttonOpacity: 0
  }

  componentDidMount() {

    win = (this.props.result === this.props.choice);

    min = 1;
    max = win ? (this.state.listWin.length - 1) : (this.state.listFail.length - 1);
    randomIndex = Math.floor(Math.random() * (max - min + 1) + min);

    start = win ? this.state.listWin[randomIndex][0] : this.state.listFail[randomIndex][0];
    end = win ? this.state.listWin[randomIndex][1] : this.state.listFail[randomIndex][1];

    song = new SoundPlayer(
      win ? 'epic_win_sound_effects.mp3' : 'epic_fail_sound_effects.mp3',
      SoundPlayer.MAIN_BUNDLE,
      (error) => (error) ? alert('erro') : [
        song.setCurrentTime(start),
        song.setVolume(1),
        song.play(),
        setTimeout(() => {
          song.stop();
          song.setVolume(0);
          this.setState({ buttonOpacity: 1 })
        }, ((end - start) * 1000)
        )
      ],
    );
  }

  exit = () => {
    Alert.alert(
      'Sair do jogo?',
      null,
      [
        { 
          text: 'Cancelar', 
          onPress: () => null 
        },
        { 
          text: 'Sair', 
          onPress: () => BackHandler.exitApp() 
        },
      ],
      { cancelable: false }
    )
  }

  render() {

    return (
      <View style={styles.container}>

        <Image source={background} style={styles.background} />

        <Image
          source={this.props.result === 'cara' ? cara : coroa}
          style={styles.image}
        />

        <Text style={styles.text}>
          DEU {this.props.result.toUpperCase()}!
        </Text>
        <Text style={styles.text}>
          VOCÊ {this.props.result === this.props.choice ? 'GANHOU' : 'PERDEU'}!
        </Text>

        <View style={[styles.buttonContainer, { opacity: this.state.buttonOpacity }]}>
          <Button
            title='Jogar Novamente'
            onPress={() => this.props.navigation.navigate('Game')}
            style={styles.button}
          />
          <Button
            title='SAIR'
            onPress={this.exit}
            style={styles.button}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  sortContainer: {
    backgroundColor: 'grey',
    top: 1,
    bottom: 1,
    right: 1,
    left: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortImage: {
    width: 500,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    maxHeight: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  image: {
    height: 160,
    width: 160,
    margin: 50,
    borderRadius: 160,
    resizeMode: 'contain',

  },
  text: {
    color: 'white',
    paddingHorizontal: 5,
    fontFamily: 'times new roman',
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  button: {
  }
});

const mapStateToProps = state => ({
  result: state.play.result,
  choice: state.play.choice,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(playActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
