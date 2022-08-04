import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';

export default function Upload() {
    const [uri, setUri] = useState(null);
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [2, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setUri(result.uri);
            setImage(result);
        }
    };

    const UploadImage = () => {
        console.log(image);
    }
    return (
        <View style={styles.container}>
            <Button icon="file" mode="outlined" onPress={pickImage} style={styles.button}>
                Select Meme
            </Button>
            {uri && <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} />}

            <TextInput
                label='Meme Caption (Optional)'
                mode="outlined"
                value={caption}
                onChangeText={caption => setCaption(caption)}
                style={styles.input}
            />

            <Button icon="upload" mode="contained" onPress={UploadImage} style={styles.button}>
                Select Meme
            </Button>
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
        margin: 20,
        // backgroundColor: 'red',
        width: 300,
        height: 50,
    },
    button: {
        margin: 10,
        width: 300,
        height: 50,
    },
})