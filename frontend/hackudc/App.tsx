import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [text, setText] = useState('');

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert('Permission Denied', 'Camera permission is required to take photos');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleChoosePhoto = () => {
    Alert.alert(
      'Select Source',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            requestCameraPermission().then(granted => {
              if (granted) {
                launchCamera({ mediaType: 'photo' }, (response) => {
                  if (
                    !response.didCancel &&
                    !response.errorCode &&
                    response.assets &&
                    response.assets.length > 0 &&
                    response.assets[0].uri // Ensure URI exists
                  ) {
                    setSelectedImage(response.assets[0].uri); // URI is guaranteed to be a string
                  } else {
                    setSelectedImage(null); // Fallback to null if URI is undefined
                  }
                });
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
              if (
                !response.didCancel &&
                !response.errorCode &&
                response.assets &&
                response.assets.length > 0 &&
                response.assets[0].uri // Ensure URI exists
              ) {
                setSelectedImage(response.assets[0].uri); // URI is guaranteed to be a string
              } else {
                setSelectedImage(null); // Fallback to null if URI is undefined
              }
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const handleSend = () => {
    // Add your send logic here
    Alert.alert('Sent!', 'Your content has been sent.');
  };

  return (
    <View style={styles.container}>
      {/* Image Picker Section */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleChoosePhoto}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>
            Take a picture of the item or choose it from your gallery
          </Text>
        )}
      </TouchableOpacity>

      {/* Text Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          maxLength={200}
          placeholder="Type your message here..."
          value={text}
          onChangeText={setText}
        />
        <Text style={styles.charCounter}>{text.length}/200</Text>
      </View>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles remain the same as in your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 0.5,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  inputContainer: {
    flex: 0.4,
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  charCounter: {
    alignSelf: 'flex-end',
    color: '#666666',
    fontSize: 12,
    marginTop: 5,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginVertical: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;