import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, Button, ToggleButton } from 'react-native-paper'
import ImageMeme from './meme/image';
import TextMeme from './meme/text';

export default function Home() {
  const [type, setType] = useState('pictures');
  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="Meme Store" />
      </Appbar.Header>
      <View style={styles.button}>
        <Button icon="image" mode="contained" onPress={() => setType('pictures')}>
          image
        </Button>
        <Button icon="text" mode="contained" onPress={() => setType('text')}>
          Text
        </Button>        
      </View>
      {(type === 'pictures') ? <ImageMeme /> : <TextMeme />}
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
