import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage, TouchableOpacity} from 'react-native';
import {  } from 'react-native-gesture-handler';

export default function Auth(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegView, setIsRegView] = useState(false);

  useEffect(() => {
    getToken();
  }, [])

  const auth = () => {
    if (isRegView){
        fetch(`http://moviey-rater.herokuapp.com/api/users/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: username, password: password})
        })
        .then( res => res.json())
        .then( res => {
          console.log(res)
          setIsRegView(false);
        })
        .catch( error => console.log(error))

    } else {
        fetch(`http://moviey-rater.herokuapp.com/auth/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: username, password: password})
        })
        .then( res => res.json())
        .then( res => {
          console.log(res)
          saveToken(res.token);
          props.navigation.navigate('MovieList');
        })
        .catch( error => console.log(error))
    }
  }

  const saveToken = async (token) => {
    await AsyncStorage.setItem('MR-token', token);
  }

  const getToken = async (token) => {
    const value = await AsyncStorage.getItem('MR-token');
    if (value) props.navigation.navigate('MovieList')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize={'none'}
        />
      <Text style={styles.label}>Password </Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize={'none'}
      />
      <Button
        title={isRegView ? "Register" : "Login"}
        onPress={() => auth()}
      />
      <TouchableOpacity style={styles.link} onPress={() => setIsRegView(!isRegView)}>
          {isRegView ? <Text>Already have an account ? Log in</Text> :
          <Text>Don't have an account? Sign up</Text>}
      </TouchableOpacity>
      <Text>Hello</Text>

    </View>
  );
}

Auth.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
      backgroundColor: "orange"
  },
  headerTintColor: '#fff',
  headetTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  }
})


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

  },
  link: {
    color: "white",
    fontSize: 20
  }
});
