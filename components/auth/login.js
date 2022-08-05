import React from 'react'
import { Alert, DevSettings, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper'

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisibible, setpasswordVisibible] = React.useState(true);
  const [isLoading, setisLoading] = React.useState(false)
  const storeData = async (token) => {
    console.log(token)
    try {
      AsyncStorage.setItem('token', result.token)
      global.token = token
      Alert.alert('Login Completed', 'Welcome back!')
      navigation.navigate('Profile')
    } catch (e) {
      console.log(e)
    }
  }

  const resultHandler = (result) => {
    if (result.error == 'Invalid credentials') {
      Alert.alert(result.error, 'Please check your email and password and try again')
    }
    else if(result.token != '') {
      AsyncStorage.setItem('token', result.token)
      DevSettings.reload();
    }
    else{
      Alert.alert('Login Failed', 'Please check your email and password and try again')
    }
  }
  
  const submitHandler = async () => {
    setisLoading(true)
    try {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      // fatch api
      await fetch(`https://memejokes.herokuapp.com/api/login?email=${email}&password=${password}`, requestOptions)
        .then(response => response.text())
        .then(result => resultHandler(JSON.parse(result)))
        .catch(error => console.log('error', error));
      // console.log('Pressed')
      setisLoading(false)
    } catch (error) {
      console.log(error)
      setisLoading(false)
    }
  }
  return (
    <View>
      <TextInput
        mode="outlined"
        label="Email Address"
        placeholder="Type something"
        right={<TextInput.Affix text="/100" />}
        value={email}
        onChangeText={email => setEmail(email)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={passwordVisibible}
        right={<TextInput.Icon name="eye" onPress={() => setpasswordVisibible(false)} />}
        value={password}
        onChangeText={password => setPassword(password)}
        style={styles.input}
      />
      {/* login botton */}
      {(isLoading) && (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.activityIndicator}>Attempting to Login...</Text>
        </>
      )}
      <View style={styles.button}>
        <Button icon="login" mode="contained" onPress={submitHandler}>
          Login
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    // backgroundColor: 'red',
    width: 300,
    height: 50,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  button: {
    margin: 10,
    width: 300,
    height: 70,
  },
  activityIndicator: {
    margin: 10,
    alignItems: 'center',
    textAlign: 'center',
  }
})
