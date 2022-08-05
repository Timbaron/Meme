import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Surface, Text } from 'react-native-paper'
import ShareButton from './share'

export default function Item({item}) {
    return (
        <Card style={styles.memes} key={index}>
            <Text>{item.meme_url}</Text>
            <View>
                <Card.Cover source={{ uri: item.meme_url }} style={styles.meme} />
            </View>
            <Surface style={styles.surface} elevation={8}>
                <Text variant="displayLarge">By: Koniblack </Text>
                <ShareButton />

            </Surface>
        </Card>
    )
}

const styles = StyleSheet.create({
    memes: {
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    meme: {
        borderRadius: 10,
        marginBottom: 5,
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
    }
})