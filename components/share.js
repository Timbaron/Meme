import React from 'react'
import { StyleSheet, Text, View, Share } from 'react-native'
import { Button } from 'react-native-paper';

export default function ShareButton({id}) {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                  `😂 🤣 😂 🤣 Check out this meme i found on Meme Store App 😂 🤣 😂 🤣 ! https://memejokes.herokuapp.com/meme/${id}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed

            }
        } catch (error) {
            alert(error.message);
        }
    };
  return (
      <Button icon="share" mode="outline" onPress={onShare} style={styles.button}>Share</Button>
  )
}


const styles = StyleSheet.create({   
    button: {
        borderColor: "#000",
        borderWidth: 2,
        width: 100,
    }
})