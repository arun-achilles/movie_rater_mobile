import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default function Edit(props) {

  const movie = props.navigation.getParam('movie', null);
  const token = props.navigation.getParam('token', '');
  const [title, setTitle] = useState(movie.title)
  const [description, setDescription] = useState(movie.description)

  const updateMovie = () => {
    if (movie.id){
      fetch(`http://moviey-rater.herokuapp.com/api/movies/${movie.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, description: description})
      })
      .then( res => res.json())
      .then( movie => {
        console.log(movie)
        props.navigation.navigate('Detail', {movie: movie, title: movie.title, token: token})
      })
      .catch( error => console.log(error))      
    } else {
      fetch(`http://moviey-rater.herokuapp.com/api/movies/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, description: description})
      })
      .then( res => res.json())
      .then( movie => {
        console.log(movie)
        props.navigation.navigate('MovieList')
      })
      .catch( error => console.log(error))      

    }

    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description </Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <Button
        title="save"
        onPress={() => updateMovie()}
      />

    </View>
  );
}

Edit.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
      backgroundColor: "orange"
  },
  headerTintColor: '#fff',
  headetTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  headerRight: () => (
    <Button title="Remove" color="orange"
      onPress={() => removeMovie(screenProps)}
    />
  )
})

const removeMovie = (props) => {
  const movie = props.navigation.getParam("movie");
  fetch(`http://moviey-rater.herokuapp.com/api/movies/${movie.id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then( movie => {
    props.navigation.navigate('MovieList')
  })
  .catch( error => console.log(error))      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35'
  },
  label: {
    fontSize: 24,
    color: 'white',
    padding: 10
  },
  input: {
    fontSize: 24,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff'

  }
});
