import React, { useState, useEffect } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, RadioButton, Text, TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';

export default function Upload({ navigation, route }) {
    const [type, setType] = React.useState('clean');
    const token = route.params
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

    const resultHandler = (result) => {
        if(result.message != ''){
            setImage(null);
            setIsLoading(false)
            Alert.alert(result.message)
        }
    }
    const UploadImage = () => {
        setIsLoading(true);
        console.log(image);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("caption", caption);
        formdata.append("type", type);
        formdata.append('meme', {type: 'image/jpg', uri: uri, name: 'uploadimagetmp.png'});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata, 
            redirect: 'follow'
        };

        fetch("https://memejokes.herokuapp.com/api/meme/upload", requestOptions)
            .then(response => response.text())
            .then(result => resultHandler(JSON.parse(result)))
            .catch(error => console.log('error', error));
    }
    const _goBack = () => {
        navigation.goBack()
    }
    useEffect(() => {
        // _getDetails()
    }, [])
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Upload Meme" />
            </Appbar.Header>
            <View style={styles.container}>
                <Button icon="file" mode="outlined" onPress={pickImage} style={styles.button}>
                    Select Meme
                </Button>
                {uri && <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} />}
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
        // backgroundColor: 'red',
        width: 300,
        height: 50,
    },
    button: {
        margin: 10,
        width: 300,
        height: 50,
    },
    radios: {
        // margin: 20,
        flexDirection: 'row',
        backgroundColor: 'red',
        width: 300,
        height: 50,
    },
    /* The text that is displayed on the screen. */
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label2: {
        fontSize: 15,
        // fontWeight: ',
    }
})