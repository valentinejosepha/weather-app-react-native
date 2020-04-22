import React, { Component } from 'react';
import {
  Keyboard,
  Dimensions,
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchResult: 0,
      error: 'Search for a city...',
      item: {},
    };
  }

  searchCity = () => {
    this.fetchCityTemp(this.state.searchInput);
  };

  fetchCityTemp = city => {
    this.setState({
      item: {},
      searchResult: 0,
      error: 'Search for a city...',
    });

    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=5d7fc00a2159b9e5213d4d88292559e1&units=metric',
    )
      .then(response => response.json())
      .then(responseJson => {
        const r = responseJson.main;
        const obj = responseJson;
        if (responseJson.cod !== 200) {
          this.setState({
            searchResult: 0,
            error: 'City not found!',
          });
        } else {
          const city = {
            name: obj.name,
            // country: country,
            temp: Math.ceil(r.temp),
            type: obj.weather[0].main,
            desc: 'Humidity: ' + r.humidity + '% - ' + obj.weather[0].main,
          };

          // newList.push(city);
          this.setState({
            item: city,
            searchResult: 1,
          });
        }
      });
  };

  getTempRange = temp => {
    if (temp < 11) {
      return 'cold';
    }

    if (temp > 10 && temp < 20) {
      return 'medium';
    }

    if (temp >= 20 && temp < 30) {
      return 'hot';
    }

    if (temp >= 30) {
      return 'veryHot';
    }
  };

  getEmoji = weatherType => {
    if (weatherType == 'Clouds') {
      return '☁️';
    }

    if (weatherType == 'Clear') {
      return '☀️';
    }

    if (weatherType == 'Haze') {
      return '🌥';
    }

    if (weatherType == 'Smoke') {
      return '🌥';
    }

    if (weatherType == 'Thunderstom') {
      return '⛈';
    }

    if (weatherType == 'Rain') {
      return '🌧';
    }

    if (weatherType == 'Snow') {
      return '❄';
    }

    if (weatherType == 'Mist') {
      return '🌫';
    }
    if (weatherType == 'Fog') {
      return '🌫';
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.header}>☀️ CityWeather</Text>

        <View style={{ alignItems: 'center', width: '90%' }}>
          <Text style={styles.searchTitle}>Search for a city</Text>
          <TextInput
            onChangeText={text => this.setState({ searchInput: text })}
            value={this.state.searchInput}
            style={styles.searchInput}
            onSubmitEditing={this.searchCity}
          />
          <TouchableHighlight
            style={styles.searchButton}
            onPress={() => {
              this.searchCity();
              Keyboard.dismiss();
            }}
          >
            <Text style={{ fontSize: 14, color: 'white' }}>Search</Text>
          </TouchableHighlight>
        </View>

        {this.state.searchResult == 1 ? (
          <TouchableHighlight
            underlayColor="white"
            onPress={() => alert(this.state.item.desc)}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
              start={[0, 0.5]}
            >
              <View style={styles.row}>
                <Text
                  style={[
                    styles[this.getTempRange(this.state.item.temp)],
                    styles.cityTemp,
                  ]}
                >
                  {this.getEmoji(this.state.item.type)} {this.state.item.temp}°C
                </Text>
                <Text style={styles.cityName}>{this.state.item.name}</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
        ) : (
          <View style={styles.errorMessage}>
            <Text>{this.state.error}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchTitle: {
    textAlign: 'center',
    lineHeight: 20,
    padding: 5,
    fontSize: 16,
  },
  searchInput: {
    width: '80%',
    padding: 15,
    margin: 5,
    backgroundColor: 'black',
    color: 'white',
  },
  searchButton: {
    backgroundColor: 'grey',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    width: Dimensions.get('window').width,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  cityName: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir',
  },
  cityTemp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  cold: {
    color: 'blue',
  },
  medium: {
    color: 'green',
  },
  hot: {
    color: 'orange',
  },
  veryHot: {
    color: 'red',
  },
});