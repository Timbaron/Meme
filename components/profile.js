import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import Auth from './auth'
import Details from './profileDetails'

export default function Profile({ navigation }) {
    const _goBack = () => {
        navigation.goBack()
    }
    const [isloggedin, setIsLoggedin] = useState(false)
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="My Profile" />
            </Appbar.Header>
            <View style={styles.container}>
                {(isloggedin) ? <Details /> : <Auth />}
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
