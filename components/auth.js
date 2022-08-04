import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import Login from './auth/login'
import Register from './auth/register'

export default function Auth() {
    const [screen, setScreen] = useState('login')
    return (
        <>
            <View style={styles.button}>
                <Button mode="contained" onPress={() => setScreen('login')}>
                    Login
                </Button>
                <Button mode="contained" buttonColor="secondary" onPress={() => setScreen('dark')}>
                    Register
                </Button>
            </View>
            {(screen === 'login') ? <Login /> : <Register />}
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 3,
        width: 200,
    }
})

