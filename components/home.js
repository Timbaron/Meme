import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, Button } from 'react-native-paper'
import CleanMeme from './meme/clean';
import DarkMeme from './meme/dark';

export default function Home({navigation}) {
  const [type, setType] = useState('clean');
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="🤣 😂Meme Store 😛 😜 " />
        <Appbar.Action icon="account" onPress={() => navigation.navigate('Profile')} />
      </Appbar.Header>
      <View style={styles.button}>
        <Button mode="contained" onPress={() => setType('clean')}>
          😇 clean memes
        </Button>
        <Button mode="contained" buttonColor="secondary" onPress={() => setType('dark')}>
          😈 dark memes
        </Button>        
      </View>
      {(type === 'clean') ? <CleanMeme /> : <DarkMeme />}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  }
})
