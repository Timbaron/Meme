import React, {useState, useEffect} from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View, Share } from 'react-native'
import { ActivityIndicator, Button, Card, Surface, Text } from 'react-native-paper'
import ShareButton from '../share';

export default function DarkMeme() {
  // image urls in array
  const [isLoading, setIsLoading] = React.useState(true)
  const [memes, setMemes] = React.useState([])
  const resultHandler = (result) => {
    if (result.status === 'success') {
      setMemes(result.memes)
      setIsLoading(false)
    }
  }
  const _getmemes = async () => {
    setIsLoading(true)
    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://memejokes.herokuapp.com/api/memes/dark", requestOptions)
        .then(response => response.json())
        .then(result => resultHandler(result))
        .catch(error => console.log('error', error));
    }
    catch (error) {
      console.log(error)
    }
  }
  const _MemeEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No memes found</Text>
      </View>
    )
  }

  useEffect(() => {
    _getmemes()
  }, [])
  // setTimeout(() =>{
  //   _getmemes()
  // },30000)
  const renderMeme = ({ item }) => {
    return (
      <>
        <Card style={styles.memes} key={item.id}>
          <View>
            <Card.Cover source={{ uri: item.meme_url }} style={styles.meme} />
          </View>
          <Surface style={styles.surface} elevation={8}>
            <Text variant="displayLarge">Uploaded By: {item.owner.username}</Text>
            <ShareButton url={item.meme_url} />

          </Surface>
        </Card>
      </>
    );
  };
  return (
    <View>
      <SafeAreaView style={styles.container}>

        {(isLoading) ? <ActivityIndicator size={45} /> : (
          <>
            <Button size={45} mode="outline" onPress={() => _getmemes()}>Refresh Dark memes</Button>
            <FlatList
              data={memes}
              renderItem={renderMeme}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={_MemeEmptyComponent}
            />
          </>
        )}
      </SafeAreaView>

    </View>
  )
}

const styles = StyleSheet.create({
  memes: {
    // justifyContent: 'center',
    // marginLeft: 20,
    // marginRight: 20,
    // marginBottom: 10,
    margin: 10,
  },
  meme: {
    borderRadius: 10,
    margin: 20,
    height: 300,
    width: 300,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  surface: {
    padding: 1,
    height: 60,
    // width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    borderColor: "#000",
    borderWidth: 2,
    width: 50,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})