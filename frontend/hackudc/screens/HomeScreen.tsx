import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    Alert,
    Text,
    ActivityIndicator
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RNCamera, TakePictureResponse } from 'react-native-camera';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const cameraRef = useRef<RNCamera | null>(null);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'Camera permission is required');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const takePicture = async () => {
        if (cameraRef.current && !selectedImage) {
            const options = { quality: 0.5, base64: true };
            const data: TakePictureResponse = await cameraRef.current.takePictureAsync(options);
            setSelectedImage(data.uri);
        } else {
            setSelectedImage(null);
        }
    };

    const handleChooseFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (
                !response.didCancel &&
                !response.errorCode &&
                response.assets &&
                response.assets[0].uri
            ) {
                setSelectedImage(response.assets[0].uri);
            }
        });
    };

    const handleSend = async () => { // Make async
        if (selectedImage) {
            setIsLoading(true);
            try {
                // const imageToSend = selectedImage || 'https://fotografiaprincipiantes.wordpress.com/wp-content/uploads/2015/11/image17.png';
                const imageToSend = 'https://fotografiaprincipiantes.wordpress.com/wp-content/uploads/2015/11/image17.png';

                const encodedImage = encodeURIComponent(imageToSend);

                const response = await fetch(
                    `http://10.20.27.122:8080/api/search?imageUrl=${encodedImage}`
                );

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();
                navigation.navigate('Results', {
                    imageUri: selectedImage,
                    products: result // Pass API result to results screen
                });
            } catch (error) {
                Alert.alert('Error', 'Couldn\'t load results. Please try again.');
                console.error('API Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.loadingText}>Searching for matches...</Text>
                </View>
            )}
            {!selectedImage ? (
                <RNCamera
                    ref={cameraRef}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    onCameraReady={() => setCameraReady(true)}
                    captureAudio={false}
                />
            ) : (
                <Image source={{ uri: selectedImage }} style={styles.camera} />
            )}

            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={styles.galleryButton}
                    onPress={handleChooseFromGallery}>
                    <Image source={require('../assets/gallery-icon.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.shutterButton}
                    onPress={takePicture}>
                    {selectedImage && (
                        <View style={styles.discardOverlay}>
                            <Text style={styles.discardText}>X</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.sendButton, !selectedImage && styles.disabledButton]}
                    onPress={handleSend}
                    disabled={!selectedImage}>
                    <Image source={require('../assets/send-icon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 40,
    },
    shutterButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryButton: {
        padding: 15,
    },
    sendButton: {
        padding: 15,
        backgroundColor: '#2196F3',
        borderRadius: 25,
    },
    disabledButton: {
        opacity: 0.5,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    discardOverlay: {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: -5,
        right: -5,
    },
    discardText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
});

export default HomeScreen;