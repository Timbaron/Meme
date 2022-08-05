import React, { useState, useEffect } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, RadioButton, Text, TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
// import { useFormik } from 'formik';
// import RNFetchBlob from 'rn-fetch-blob'

export default function Upload({ navigation, route }) {
    const [type, setType] = React.useState('clean');
    const token = route.params
    const [url, setUrl] = useState(null);
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         // allowsEditing: true,
    //         // aspect: [2, 4],
    //         quality: 1,
    //     });


    //     if (!result.cancelled) {
    //         console.log(result);
    //         seturl(result.url);
    //         setImage(result);
    //     }
    // };

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
                {/* <Button icon="file" mode="outlined" onPress={pickImage} style={styles.button}>
                    Select Meme
                </Button> */}
                <TextInput
                    label='Meme URL'
                    mode="outlined"
                    value={url}
                    onChangeText={url => setUrl(url)}
                    style={styles.input}
                />
                {/* {url && <Image source={{ url: url }} style={{ width: 200, height: 200 }} />} */}
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