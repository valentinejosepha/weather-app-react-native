import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        {
          name: 'London',
          country: 'UK',
        },
        {
          name: 'Edinburgh',
          country: 'UK',
        },
        {
          name: 'New York',
          country: 'US',
        },
        {
          name: 'Washington',
          country: 'US',
        },
        {
          name: 'Paris',
          country: 'France',
        },
        {
          name: 'Doha',
          country: 'Qatar',
        },
        {
          name: 'Sydney',
          country: 'Australia',
        },
        {
          name: 'Cancun',
          country: 'Mexico',
        },
        {
          name: 'Madrid',
          country: 'Spain',
        },
        {
          name: 'Berlin',
          country: 'Germany',
        },
        {
          name: 'Brussels',
          country: 'Belgium',
        },
        {
          name: 'Copenhagen',
          country: 'Denmark',
        },
        {
          name: 'Athens',
          country: 'Greece',
        },
        {
          name: 'New Delhi',
          country: 'India',
        },
        {
          name: 'Dublin',
          country: 'Ireland',
        },
        {
          name: 'Rome',
          country: 'Italy',
        },
        {
          name: 'Tokyo',
          country: 'Japan',
        },
        {
          name: 'Wellington',
          country: 'New Zealand',
        },
        {
          name: 'Amsterdam',
          country: 'Netherlands',
        },
        {
          name: 'Oslo',
          country: 'Norway',
        },
        {
          name: 'Panama City',
          country: 'Panama',
        },
        {
          name: 'Lisbon',
          country: 'Portugal',
        },
        {
          name: 'Warsaw',
          country: 'Poland',
        },
        {
          name: 'Moscow',
          country: 'Russia',
        },
      ],
      list: [],
      isRefreshing: true,
      isLoading: true,
      newAlert: 0,
    };
  }

  componentDidMount() {
    this.fetchTemps();
  }

  fetchTemps = () => {
    let newList = [];
    let list = this.getRandomCities(this.state.cities, 7);
    for (city in list) {
      let cityName = list[city].name;
      let country = list[city].country;

      this.fetchCityTemp(cityName, country, newList);
    }
  };

  getRandomCities = (arr, n) => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  loadNewTemps = () => {
    this.setState({
      list: [],
      isRefreshing: true,
    });

    this.fetchTemps();
  };

  fetchCityTemp = (city, country, newList) => {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',' +
        country +
        '&appid=5d7fc00a2159b9e5213d4d88292559e1&units=metric',
    )
      .then(response => response.json())
      .then(responseJson => {
        const r = responseJson.main;
        const obj = responseJson;
        const city = {
          name: obj.name,
          country: country,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          desc: 'Humidity: ' + r.humidity + '% - ' + obj.weather[0].main,
        };

        newList.push(city);
        console.log('before', this.state.list);
        this.setState({
          list: newList,
          isRefreshing: false,
        });
        console.log('after', this.state.list);
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

    if (weatherType == 'Thunderstorm') {
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

    if (weatherType == 'Drizzle') {
      return '🌫';
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.header}>☀️ CityWeather</Text>
        <FlatList
          style={{ width: '100%' }}
          data={this.state.list}
          refreshing={this.state.isRefreshing}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              underlayColor="white"
              onPress={() =>
                this.setState({ newAlert: 1, alertMsg: item.desc })
              }
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                  <Text
                    style={[
                      styles[this.getTempRange(item.temp)],
                      styles.cityTemp,
                    ]}
                  >
                    {this.getEmoji(item.type)} {item.temp}°C
                  </Text>
                  <Text style={styles.cityName}>{item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}
        />

        {this.state.newAlert == 1 ? (
          <View style={styles.newAlertContainer}>
            <View style={styles.alertMessageContainer}>
              <LinearGradient
                style={styles.gradientBackground}
                colors={['#136a8a', '#267871']}
                start={[0, 0.65]}
              >
                <Text style={styles.alertMessageText}>
                  {this.state.alertMsg}
                </Text>

                <TouchableHighlight
                  underlayColor="white"
                  onPress={() => this.setState({ alertMsg: '', newAlert: 0 })}
                >
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableHighlight>
              </LinearGradient>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  row: {
    flex: 1,
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
  gradientBackground: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 5,
  },
  newAlertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertMessageContainer: {
    width: '75%',
    height: 90,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  alertMessageText: {
    fontSize: 16,
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  closeButton: {
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
});