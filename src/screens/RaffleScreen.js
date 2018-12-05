import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import image from '../images/juizes-futebol-jogando-moeda.jpg'
import cara from '../images/cara.jpg'
import coroa from '../images/coroa.png'

class RaffleScreen extends Component {
  
  state = {
    loading: '',
    mount: true,
  }

  loading = () => {
    if (this.state.mount) {
      if (this.state.loading === '') {
        setTimeout(
          function() {
            this.setState({loading: '.'});
          }
          .bind(this),
          70
        );
      }
      if (this.state.loading === '.') {
        setTimeout(
          function() {
            this.setState({loading: '. .'});
          }
          .bind(this),
          70
        );
      }
      if (this.state.loading === '. .') {
        setTimeout(
          function() {
            this.setState({loading: '. . .'});
          }
          .bind(this),
          70
        );
      }
      if (this.state.loading === '. . .') {
        setTimeout(
          function() {
            this.setState({loading: ''});
          }
          .bind(this),
          1000
        );
      }
    }
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({mount: false});
        this.props.navigation.navigate('Result');
      }
      .bind(this),
      5000
    );
  }

  render() {
    this.loading();
    return (
      <View style={styles.container}>

        <View style={styles.choiceContainer}>
          <Text style={styles.choiceText}>
            Você escolheu
          </Text>
          <Image
          source={this.props.choice === 'cara' ? cara : coroa}
          style={styles.choiceImage}
          />
        </View>

        <Image
        source={image}
        style={styles.image}
        />
        
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            os juízes estão jogando a moeda {this.state.loading}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  choiceContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 100,
  },
  choiceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  choiceText: {
    fontFamily: 'times new roman',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
    paddingRight: 10,
  },
  loadingContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 100,
  },
  loadingText: {
    fontFamily: 'times new roman',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
    left: 1,
    marginLeft: 25,
  },
  image: {
    height: 380,
    width: 384,
    resizeMode: 'cover',
  }
});

const mapStateToProps = state => ({
  choice: state.play.choice,
});

export default connect(mapStateToProps, null)(RaffleScreen);
