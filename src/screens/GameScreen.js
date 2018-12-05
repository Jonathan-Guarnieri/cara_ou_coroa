import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as playActions from '../actions'
import background from '../images/background-rock.jpg'

class GameScreen extends Component {

  play = (choice) => {
    this.props.play(choice)
    this.props.navigation.navigate('Raffle')
  }

  render() {

    return (
      <View style={styles.container}>

        <Image source={background} style={styles.background} />

        <View style={styles.questionContainer}>
          <Text style={styles.question}>Você quer cara ou coroa?</Text>
        </View>

        <View style={styles.choiceContainer}>

          <TouchableHighlight onPress={() => this.play('cara')}>
            <View style={styles.option}>
              <Text>Cara</Text>
              <Image source={require('../images/cara.jpg')} style={{ width: 120, height: 120 }} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.play('coroa')}>
            <View style={styles.option}>
              <Text>Coroa</Text>
              <Image source={require('../images/coroa.png')} style={{ width: 120, height: 120 }} />
            </View>
          </TouchableHighlight>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  // Main view
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  // Question view
  questionContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  question: {
    fontFamily: 'times new roman',
    color: 'black',
    fontSize: 22,
    fontStyle: 'italic',
  },

  // Options view
  choiceContainer: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  option: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    paddingTop: -10,
    margin: 20,
    borderWidth: 3,
    borderRadius: 3,
  }

});

const mapStateToProps = state => ({
  result: state.result,
  choice: state.choice,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(playActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
