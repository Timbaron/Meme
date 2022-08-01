import React from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'

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
          {images.map(image =>
          (
            <Card style={styles.memes}>
              <View>
                <Card.Cover source={{ uri: image }} style={styles.meme} />
              </View>
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
    borderRadius: 10,
  },
  meme: {
    marginBottom: 15,
  },
})
