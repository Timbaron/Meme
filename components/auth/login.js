import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisibible, setpasswordVisibible] = React.useState(true);
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
        label="Password"
        secureTextEntry={passwordVisibible}
        right={<TextInput.Icon name="eye" onPress={() => setpasswordVisibible(false)} />}
        value={password}
        onChangeText={password => setPassword(password)}
        style={styles.input}
      />
      {/* login botton */}
      <View style={styles.button}>
        <Button icon="login" mode="contained" onPress={() => console.log('Pressed')}>
          Login
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
  }
})
