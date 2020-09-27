import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button, Alert, AsyncStorage} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MovieList(props) {

  const [movies, setMovies] = useState([{id: 1, title: 'pia'}, {id: 2, title: 'soup'}])
  let token = null;
  
  const getData = async () => {
    token = await AsyncStorage.getItem('MR-token');
    if (token) {
      getMovies();
      props.navigation.setParams({
        token: token
      });  
    } else {
      props.navigation.navigate('Auth');
    }
  }
  
  useEffect(() => {
    getData();
  });

  const getMovies = () => {
    fetch('http://moviey-rater.herokuapp.com/api/movies', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then( res => res.json())
    .then( jsonRes => {
      setMovies(jsonRes)
    })
    .catch( error => console.log(error))
  }

  const movieClicked = (movie) => {
    props.navigation.navigate("Detail", {movie: movie, title: movie.title, token: token})
  }

  return (
    <View>
      <Image
      source={require('../assets/logo.png')}
      style={{width: '100%', height: 135, paddingTop: 30}}
      />
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => movieClicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText} key={item.id}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

MovieList.navigationOptions = screenProps => ({
  title: 'List of Movies',
  headerStyle: {
      backgroundColor: "orange"
  },
  headerTintColor: '#fff',
  headetTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  headerRight: () => (
    <Button title="Add New" color="orange"
      onPress={() => screenProps.navigation.navigate('Edit', {movie: {title: '', description: ''}, token: screenProps.navigation.getParam('token')})}
    />
  )
})


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    width: '100%',
    backgroundColor: '#282C35'
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
    width: '100%'
  },
  movie: {
    fontSize: 40
  }
});
