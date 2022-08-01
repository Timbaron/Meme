import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'

export default function ImageMeme() {
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
      <Card style={styles.memes}>
        <SafeAreaView style={styles.container}>
          <View>
            <FlatList data={images} renderItem={renderItem} keyExtractor={item => item.id} />
          </View>
        </SafeAreaView>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  memes: {
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  meme: {
    marginBottom: 15,
  }
})
