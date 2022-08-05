import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, RadioButton, Text, TextInput } from 'react-native-paper'

export default function Upload({ navigation, route }) {
    const [type, setType] = React.useState('clean');
    const token = route.params
    const [url, setUrl] = useState(null);
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    const resultHandler = (result) => {
        if (result.status == 'error') {
            Alert.alert('Upload Failed','The URL entered is not an image URL')
            setIsLoading(false)
        }
        else if (result.errors == []) {
            Alert.alert('Upload Failed', 'Please enter a valid image URL')
            setIsLoading(false)
        }
        else if (result.status == 'success') {
            setIsLoading(false);
            setUrl('')
            setType('clean')
            setCaption('')
            navigation.pop(2);
            Alert.alert('Upload Successful', 'Hope your meme is funny, I go just delete am in 2 seconds')
        }
        console.log(result);
    }
    const UploadImage = async () => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://memejokes.herokuapp.com/api/meme/upload?meme=${url}&type=${type}&caption=${caption}`, requestOptions)
            .then(response => response.json())
            .then(result => resultHandler(result))
            .catch(error => console.log('error', error));
    }
    const _goBack = () => {
        navigation.goBack()
    }
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Upload Meme" />
            </Appbar.Header>
            <View style={styles.container}>
                <TextInput
                    label='Meme URL'
                    mode="outlined"
                    value={url}
                    onChangeText={url => setUrl(url)}
                    style={styles.input}
                />
                <Text style={styles.label}>Select Meme type</Text>
                <RadioButton.Group onValueChange={newtype => setType(newtype)} value={type}>
                    <View>
                        <Text style={styles.label2}>Clean</Text>
                        <RadioButton value="clean" />
                    </View>
                    <Text style={styles.label2}>Dark</Text>
                    <RadioButton value="dark" />
                    <View>
                    </View>
                </RadioButton.Group>
                <TextInput
                    label='Meme Caption (Optional)'
                    mode="outlined"
                    value={caption}
                    onChangeText={caption => setCaption(caption)}
                    style={styles.input}
                />
                {(isLoading) && (
                    <>
                        <ActivityIndicator size="large" />
                        <Text style={styles.activityIndicator}>Uploading...</Text>
                    </>
                )}
                <Button icon="upload" mode="contained" onPress={UploadImage} style={styles.button}>
                    Upload Meme
                </Button>
            </View>
        </>
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
        width: 300,
        height: 50,
    },
    button: {
        margin: 10,
        width: 300,
        height: 50,
    },
    radios: {
        flexDirection: 'row',
        backgroundColor: 'red',
        width: 300,
        height: 50,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label2: {
        fontSize: 15,
    }
})