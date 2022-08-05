import React, { useState, useEffect } from 'react'
import {StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar} from 'react-native-paper'
import Auth from './auth'
import Details from './profileDetails'

export default function Profile({ navigation }) {
    const [isloggedin, setIsLoggedin] = useState(false)
    const [token, setToken] = useState('')
    const _goBack = () => {
        navigation.goBack()
    }
    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                setToken(value)
                setIsLoggedin(true)
            }
        } catch (error) {
            console.log(error)
            // Error retrieving data
        }
    };

    useEffect(() => {
        _retrieveData();
    },[]);
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="My Profile" />
            </Appbar.Header>
            <View style={styles.container}>
                {(isloggedin && token !== undefined) ? <Details token={token} setToken={setToken} setIsLoggedin={setIsLoggedin} navigation={navigation} /> : <Auth navigation={navigation}/>}
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

})
