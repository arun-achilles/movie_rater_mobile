import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

  const movie = props.navigation.getParam('movie', null);
  const [highlight, setHighlight] = useState(0);
  const token = props.navigation.getParam('token');

  const updateRating = () => {
    fetch(`http://moviey-rater.herokuapp.com/api/movies/${movie.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({stars: highlight})
    })
    .then( res => res.json())
    .then( res => {
      Alert.alert('Rating', res.message)
      props.navigation.navigate('Detail', {movie: movie, title: movie.title, token: token})
    })
    .catch( error => Alert.alert('Error', error))

  }
  return (
    <View style={styles.container}>
      <Text>{movie.title} </Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon icon={faStar} style={movie.average_rating > 0 ? styles.orange : styles.white }></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={movie.average_rating > 1 ? styles.orange : styles.white }></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={movie.average_rating > 2 ? styles.orange : styles.white }></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={movie.average_rating > 3 ? styles.orange : styles.white }></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={movie.average_rating > 4 ? styles.orange : styles.white }></FontAwesomeIcon>
        <Text style={styles.white}>({movie.ratings_count}) </Text>
      </View>
      <Text style={styles.description}>{movie.description} </Text>
      <View style={{borderBottomColor: 'white', borderBottomWidth: 2}} />
      <Text style={styles.description}>Rate it!! </Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon icon={faStar} style={highlight > 0 ? styles.purple : styles.grey } size = {40} onPress={() => setHighlight(1)}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={highlight > 1 ? styles.purple : styles.grey } size = {40} onPress={() => setHighlight(2)}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={highlight > 2 ? styles.purple : styles.grey } size = {40} onPress={() => setHighlight(3)}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={highlight > 3 ? styles.purple : styles.grey } size = {40} onPress={() => setHighlight(4)}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar} style={highlight > 4 ? styles.purple : styles.grey } size = {40} onPress={() => setHighlight(5)}></FontAwesomeIcon>
      </View>
      <Button
        title="rate" color="orange"
        onPress={() => updateRating()}
      />

    </View>
  );
}

Detail.navigationOptions = screenProps => ({
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
    <Button title="Edit" 
      onPress={() => screenProps.navigation.navigate('Edit', {movie: screenProps.navigation.getParam('movie', null), token: screenProps.navigation.getParam('token')})}
    />
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35'
  },
  starContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  orange: {
     color: 'orange'
  },
  white: {
      color: 'white'
  },
  purple: {
    color: 'purple'
  },
  grey: {
    color: 'grey'
  },

  description: {
    padding: 10,
    color: 'white',
    fontSize: 24
  }
});
