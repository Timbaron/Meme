import React from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Surface, Text } from 'react-native-paper'

export default function CleanMeme() {
  // image urls in array
  const images = [
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700'
  ];
  const renderItem = ({ item }) => <Card.Cover source={{ uri: item }} style={styles.meme} />
    ;
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {images.map((image,index) =>
          (
            <Card style={styles.memes}>
              <View>
                <Card.Cover source={{ uri: image }} style={styles.meme} />
              </View>
              <Surface style={styles.surface} elevation={8}>
                <Text variant="displayLarge">By: Koniblack</Text>
                <Button icon="download" mode="contained" onPress={() => console.log('Why you wan download?')}>
                  Download
                </Button>
                
              </Surface>
            </Card>
          )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  memes: {
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
    marginBottom:10,
  },
  meme: {
    borderRadius: 10,
    marginBottom: 5,
  },
  surface: {
    padding: 1,
    height: 40,
    // width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
})
