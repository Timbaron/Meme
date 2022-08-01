import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, Button, ToggleButton } from 'react-native-paper'
import CleanMeme from './meme/clean';
import DarkMeme from './meme/dark';

export default function Home() {
  const [type, setType] = useState('clean');
  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="🤣 😂Meme Store 😛 😜 " />
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
