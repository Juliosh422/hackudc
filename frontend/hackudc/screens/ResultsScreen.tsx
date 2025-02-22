import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

// Route prop type for ResultsScreen
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface ResultsScreenProps {
    route: ResultsScreenRouteProp;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route }) => {
    const { imageUri, text } = route.params;

    return (
        <View style={styles.container}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ResultsScreen;