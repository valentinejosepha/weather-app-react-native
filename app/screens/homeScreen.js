import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      cities: [
        {
          name: "London",
          country: "UK",
        },
        {
          name: "Paris",
          country: "France",
        },
        {
          name: "Lisbon",
          country: "Portugal",
        },
        {
          name: "Doha",
          country: "Qatar",
        },
        {
          name: "Cancun",
          country: "Mexico",
        },
        {
          name: "Sydney",
          country: "Australia",
        },
        {
          name: "Madrid",
          country: "Spain",
        },
        {
          name: "New York",
          country: "US",
        },
        {
          name: "Los Angeles",
          country: "US",
        },
        {
          name: "Barcelona",
          country: "Spain",
        },
        {
          name: "New Delhi",
          country: "India",
        },
        {
          name: "Athens",
          country: "Greece",
        },
        {
          name: "Warsaw",
          country: "Poland",
        },
        {
          name: "Copenhagen",
          country: "Denmark",
        },
        {
          name: "Texas",
          country: "US",
        },
        {
          name: "Dublin",
          country: "Ireland",
        },
        {
          name: "Rome",
          country: "Italy",
        },
        {
          name: "Tokyo",
          country: "Japan",
        },
        {
          name: "Wellington",
          country: "New Zealand",
        },
        {
          name: "Amsterdam",
          country: "Netherlands",
        },
        {
          name: "Oslo",
          country: "Norway",
        },
        {
          name: "Panama City",
          country: "Panama",
        },
        {
          name: "Moscow",
          country: "Russia",
        },
      ],
      list: [],
      refresh: true,
    };
    this.fetchTemps();
  }

  getRandom = (array, number) => {
    var result = new Array(number),
      len = array.length,
      taken = new Array(len);
    while (number--) {
      var x = Math.floor(Math.random() * len);
      result[number] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  loadNewTemps = () => {
    this.setState({
      list: [],
      refresh: true,
    });
    this.fetchTemps();
  };

  fetchTemps = () => {
    var newList = [];
    var list = this.getRandom(this.state.cities, 7);
    for (city in list) {
      var name = list[city].name;
      var country = list[city].country;
      this.fetchCityTemp(name, country, newList);
    }
  };

  fetchCityTemp = (city, country, newList) => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "," +
        country +
        "&appid=5fb2333ba75358bc5030738944a75305&units=metric"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var res = responseJson.main;
        var object = responseJson;
        var city = {
          name: object.name,
          country: country,
          temp: Math.ceil(res.temp),
          type: object.weather[0].main,
          desc: 'Humidity: '+res.humidity+'% - '+object.weather[0].main,
        };
        newList.push(city);
        this.setState({
          list: newList,
          refresh: false,
        });
      });
  };

  getTempRange = (t) => {
    if (t < 11) {
      return 1;
    }
    if (t > 10 && t < 20) {
      return 2;
    }
    if (t >= 20 && t < 30) {
      return 3;
    }
    if (t >= 30) {
      return 4;
    }
  };

  getEmoji = (type) => {
    if (type == 'Clouds') {
      return '☁️';
    }
    if (type == 'Clear') {
      return '☀️';
    }
    if (type == 'Haze') {
      return '🌥';
    }
    if (type == 'Thunderstorm') {
      return '⛈';
    }
    if (type == 'Rain') {
      return '🌧';
    }
    if (type == 'Snow') {
      return '❄️';
    }
    if (type == 'Mist') {
      return '☁️';
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ width: "100%" }}
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              underlayColor='white'
              onPress={() => alert(item.desc)}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0)"]}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                  <Text
                    style={[
                      this.getTempRange(item.temp) == 1
                        ? styles.cold
                        : styles.temp,
                      this.getTempRange(item.temp) == 2
                        ? styles.medium
                        : styles.temp,
                      this.getTempRange(item.temp) == 3
                        ? styles.hot
                        : styles.temp,
                      this.getTempRange(item.temp) == 4
                        ? styles.vhot
                        : styles.temp,
                      styles.temp,
                    ]}
                  >
                    {this.getEmoji(item.type)} {item.temp}°C
                  </Text>
                  <Text style={styles.cityN}>{item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cold: {
    color: "blue",
  },
  medium: {
    color: "green",
  },
  hot: {
    color: "orange",
  },
  vhot: {
    color: "red",
  },
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  cityN: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: "Avenir",
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
