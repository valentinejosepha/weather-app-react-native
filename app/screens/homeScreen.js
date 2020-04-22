import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      cities: [
        {
          name: 'London',
          country: 'UK'
        },
        {
          name: 'Paris',
          country: 'France'
        },
        {
          name: 'Lisbon',
          country: 'Portugal'
        },
        {
          name: 'Doha',
          country: 'Qatar'
        },
        {
          name: 'Cancun',
          country: 'Mexico'
        },
        {
          name: 'Sydney',
          country: 'Australia'
        },
        {
          name: 'Madrid',
          country: 'Spain'
        },
        {
          name: 'New York',
          country: 'US'
        },
        {
          name: 'Los Angeles',
          country: 'US'
        },
        {
          name: 'Barcelona',
          country: 'Spain'
        },
        {
          name: 'New Delhi',
          country: 'India'
        },
        {
          name: 'Athens',
          country: 'Greece'
        },
        {
          name: 'Warsaw',
          country: 'Poland'
        },
        {
          name: 'Copenhagen',
          country: 'Denmark'
        },
        {
          name: 'Texas',
          country: 'US'
        },
        {
          name: 'Dublin',
          country: 'Ireland'
        },
        {
          name: 'Rome',
          country: 'Italy'
        },
        {
          name: 'Tokyo',
          country: 'Japan'
        },
        {
          name: 'Wellington',
          country: 'New Zealand'
        },
        {
          name: 'Amsterdam',
          country: 'Netherlands'
        },
        {
          name: 'Oslo',
          country: 'Norway'
        },
        {
          name: 'Panama City',
          country: 'Panama'
        },
        {
          name: 'Moscow',
          country: 'Russia'
        },
      ],
      list: [],
      refresh: true,
    }
    this.fetchTemps();
  }

  getRandom = (array, number) => {
    var result = new Array(number),
    len = array.length,
    taken = new Array (len);
    while(number--) {
      var x = Math.floor(Math.random() * len);
      result[number] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  loadNewTemps = () => {
    this.setState({
      list: [],
      refresh: true,
    })
    this.fetchTemps();
  }

  fetchTemps = () => {
    var newList = [];
    var list = this.getRandom(this.state.cities, 7);
    for( city in list ){
      var name = list[city].name;
      var country = list[city].country;
      this.fetchCityTemp(name, country, newList);
    }
  }

  fetchCityTemp = (city, country, newList) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=5fb2333ba75358bc5030738944a75305&units=metric')
    .then((response) => response.json() )
    .then((responseJson) => {
      var res = responseJson.main;
      var object = responseJson;
      var city = {
        name: object.name,
        country: country,
        temp: Math.ceil(res.temp),
        type: object.weather[0].main
      };
      newList.push(city);
      console.log(newList);
      this.setState({
        list: newList,
        refresh: false,
      })
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View>
              <Text>{item.temp}C - {item.name}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})