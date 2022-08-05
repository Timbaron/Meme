import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Details({ token, setToken, setIsLoggedin, navigation}) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState({})
  const [memecount, setMemeCount] = React.useState(0)

  const resultHandler = (result) => {
    if (result.status === 'success') {
      setIsLoading(false)
      setUser(result.user)
    }
  }

  const logoutHandler = (result) => {
    if(result.status === 'success') {
      AsyncStorage.removeItem('token')
      setToken('')
      setIsLoggedin(false)

    }
  }

  const _getDetails = async () => {
    setIsLoading(true)
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://memejokes.herokuapp.com/api/user", requestOptions)
        .then(response => response.text())
        .then(result => resultHandler(JSON.parse(result)))
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    _getDetails()
  }, [])

  const logout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://memejokes.herokuapp.com/api/logout", requestOptions)
      .then(response => response.text())
      .then(result => logoutHandler(JSON.parse(result)))
      .catch(error => console.log('error', error));
    
  }
  return (
    <View style={styles.container}>
      {(isLoading) ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.activityIndicator}>Retrieving Profile...</Text>
        </>
      )
        :
        <>
          <TextInput
            mode="outlined"
            label="User Name"
            placeholder="Type something"
            right={<TextInput.Affix text="/100" />}
            value={user.username}
            style={styles.input}
            disabled
          />
          <TextInput
            mode="outlined"
            label="User Name"
            placeholder="Type something"
            right={<TextInput.Affix text="/100" />}
            value={user.email}
            style={styles.input}
            disabled
          />
          <TextInput
            mode="outlined"
            label="Account Status"
            placeholder="Type something"
            right={<TextInput.Affix text="/100" />}
            value={user.status}
            style={styles.input}
            disabled
          />
          <View style={styles.buttonContain}>
            <Button icon="power" mode="contained" style={styles.button} onPress={logout}>
              Logout
            </Button>
           
            <Button icon="file" mode="contained" style={styles.button}>
              memes ({memecount})
            </Button>
          </View>
          <View style={styles.buttonContain}>
            <Button icon="upload" mode="contained" style={styles.buttonUPD} onPress={() => navigation.navigate('Upload', token)}>
              Upload meme
            </Button>
          </View>
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    width: 300,
    height: 50,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
  ,
  buttonContain: {
    margin: 10,
    width: 300,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    margin: 10,
    width: 130,
    height: 50,
  },
  buttonUPD: {
    margin: 10,
    width: 250,
    height: 50,
  }
})