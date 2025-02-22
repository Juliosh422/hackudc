import React from 'react';
import { View, Image, StyleSheet, ScrollView, Linking, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface ResultsScreenProps {
    route: ResultsScreenRouteProp;
}

const exampleProducts = [
    {
        id: "367022517",
        name: "GEOMETRIC JACQUARD SHIRT",
        price: {
            currency: "EUR",
            value: {
                current: 29.95
            }
        },
        link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
        brand: "zara"
    },
    {
        id: "367196402",
        name: "METALLIC THREAD RUSTIC SHIRT",
        price: {
            currency: "EUR",
            value: {
                current: 15.99,
                original: 27.95
            }
        },
        link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
        brand: "zara"
    }
];

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route }) => {
    const { imageUri } = route.params;

    const renderProductItem = ({ item }: { item: typeof exampleProducts[0] }) => (
        <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.brand}>{item.brand.toUpperCase()}</Text>

            <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>
                    €{item.price.value.current.toFixed(2)}
                </Text>
                {item.price.value.original && (
                    <Text style={styles.originalPrice}>
                        €{item.price.value.original.toFixed(2)}
                    </Text>
                )}
            </View>

            <Text
                style={styles.link}
                onPress={() => Linking.openURL(item.link)}
            >
                VIEW PRODUCT
            </Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <Text style={styles.resultsTitle}>Similar Products</Text>

            {exampleProducts.map((product) => (
                <View key={product.id}>
                    {renderProductItem({ item: product })}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        marginBottom: 24,
    },
    resultsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 4,
    },
    brand: {
        fontSize: 14,
        color: '#e17055',
        fontWeight: '500',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    currentPrice: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: 14,
        color: '#636e72',
        textDecorationLine: 'line-through',
        marginLeft: 8,
    },
    link: {
        color: '#0984e3',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});

export default ResultsScreen;