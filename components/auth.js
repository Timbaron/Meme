import React from 'react'
import { Button, Modal, Portal, Provider, Text } from 'react-native-paper'

export default function Auth({ authmodalvisible, setAuthModalVisible }) {
    // Another screen is coming here for login and registration
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const hideModal = () => {
        setAuthModalVisible(false);
    }
    const showModal = () => {
        setAuthModalVisible(true);
    }
  return (
      <Provider>
          <Portal>
              <Modal visible={authmodalvisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                  <Text>Example Modal.  Click outside this area to dismiss.</Text>
              </Modal>
          </Portal>
          <Button style={{ marginTop: 30 }} onPress={showModal}>
              Show
          </Button>
      </Provider>
  )
}
