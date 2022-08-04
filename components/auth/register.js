import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text, TextInput, MD2Colors } from 'react-native-paper'

export default function Register() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const [passwordVisibible, setpasswordVisibible] = React.useState(true);
    const [isLoading, setisLoading] = React.useState(false)

    const resultHandler = (result) => {
        if(result.errors !== undefined) {
            Alert.alert(result.errors[0])
        }
        else{
            Alert.alert('Registration Completed', 'Kindly login, If you like post boring stuffs, I go just block you.')
        }
    }

    const submitHandler = async () => {
        setisLoading(true)
        try {
            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };
            // fatch api
            await fetch(`https://memejokes.herokuapp.com/api/register?email=${email}&username=${username}&password=${password}&password_confirmation=${confirmpassword}`, requestOptions)
                .then(response => response.text())
                .then(result => resultHandler(JSON.parse(result)))
                .catch(error => console.log('error', error));
            // console.log('Pressed')
            setisLoading(false)
        } catch (error) {
            console.log(error)
            setisLoading(false)
        }
    }
    return (
        <View>
            <TextInput
                mode="outlined"
                label="User Name"
                placeholder="Type something"
                right={<TextInput.Affix text="/100" />}
                value={username}
                onChangeText={username => setUsername(username)}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label="Email Address"
                placeholder="Type something"
                right={<TextInput.Affix text="/100" />}
                value={email}
                onChangeText={email => setEmail(email)}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry={passwordVisibible}
                right={<TextInput.Icon name="eye" onPress={() => setpasswordVisibible(!passwordVisibible)} />}
                value={password}
                onChangeText={password => setPassword(password)}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label="Confirm Password"
                secureTextEntry={passwordVisibible}
                right={<TextInput.Icon name="eye" onPress={() => setpasswordVisibible(false)} />}
                value={confirmpassword}
                onChangeText={confirmpassword => setConfirmPassword(confirmpassword)}
                style={styles.input}
            />
            {/* login botton */}
            {/* show activityindicator if isloading */}
            {(isLoading) && (
                <>
                    <ActivityIndicator size="large" />
                    <Text style={styles.activityIndicator}>Attempting to Register...</Text>
                </>
            )}

            <View style={styles.button}>
                <Button icon="login" mode="contained" onPress={submitHandler}>
                    Register
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 10,
        // backgroundColor: 'red',
        width: 300,
        height: 50,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    button: {
        margin: 10,
        width: 300,
        height: 70,
    },
    activityIndicator: {
        margin: 10,
        alignItems: 'center',
        textAlign: 'center',
    }
})
