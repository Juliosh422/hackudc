import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Linking,
    Text,
    TouchableOpacity,
    Share,
    Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Product {
    id: string;
    name: string;
    brand: string;
    price: {
        currency: string;
        value: {
            current: number;
        };
    };
    link: string;
}

interface ResultsScreenProps {
    route: ResultsScreenRouteProp;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route }) => {
    const { imageUri, products } = route.params;
    const [wishlistItems, setWishlistItems] = useState<string[]>([]);

    // Fetch wishlist on component mount
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch('http://10.20.27.122:8082/api/wishlist');
                const wishlist: { products: Product[] } = await response.json();
                setWishlistItems(wishlist.products.map((p) => p.id));
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);

    // Toggle product in/out of wishlist
    const toggleWishlist = async (product: Product) => {
        const isInWishlist = wishlistItems.includes(product.id);

        try {
            let response;
            if (isInWishlist) {
                response = await fetch(
                    `http://10.20.27.122:8082/api/wishlist/products/${product.id}`,
                    { method: 'DELETE' }
                );
            } else {
                // Create properly structured product object for the backend
                const productToSend = {
                    ...product,
                    price: {
                        currency: product.price.currency || 'EUR',
                        value: {
                            current: product.price.value.current,
                        },
                    },
                };

                response = await fetch(
                    'http://10.20.27.122:8082/api/wishlist/products',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(productToSend),
                    }
                );
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setWishlistItems((prev) =>
                isInWishlist
                    ? prev.filter((id) => id !== product.id)
                    : [...prev, product.id]
            );
        } catch (error) {
            Alert.alert('Error', 'Could not update wishlist');
            console.error('Wishlist error:', error);
        }
    };

    // Share products
    const handleShare = async () => {
        try {
            const message = products
                .map((product) => `${product.name}: ${product.link}`)
                .join('\n\n');

            await Share.share({
                message: message,
                title: 'Check out these similar products!',
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    // Render each product card
    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <TouchableOpacity
                style={styles.heartButton}
                onPress={() => toggleWishlist(item)}
            >
                <Text style={[styles.heartIcon, { color: wishlistItems.includes(item.id) ? '#E74C3C' : '#000000' }]}>
                    {wishlistItems.includes(item.id) ? '❤️' : '🖤'}
                </Text>
            </TouchableOpacity>


            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.brand}>{item.brand.toUpperCase()}</Text>

            <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>
                    {item.price.currency} {item.price.value.current.toFixed(2)}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Linking.openURL(item.link)}
            >
                <Text style={styles.linkText}>VIEW PRODUCT</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

                <View style={styles.titleContainer}>
                    <Text style={styles.resultsTitle}>Similar Products</Text>
                    <TouchableOpacity onPress={handleShare}>
                        <Image
                            source={require('../assets/share-icon.png')}
                            style={styles.shareIcon}
                        />
                    </TouchableOpacity>
                </View>

                {products.length === 0 ? (
                    <Text style={styles.noResultsText}>No matching products found</Text>
                ) : (
                    products.map((product) => (
                        <View key={product.id}>{renderProductItem({ item: product })}</View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 320,
        borderRadius: 14,
        marginBottom: 24,
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    resultsTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        letterSpacing: 0.5,
    },
    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#2C3E50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ECF0F1',
    },
    productName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 6,
        lineHeight: 24,
    },
    brand: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: '500',
        marginBottom: 10,
        letterSpacing: 0.8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    currentPrice: {
        fontSize: 16,
        color: '#27AE60',
        fontWeight: '700',
    },
    originalPrice: {
        fontSize: 14,
        color: '#95A5A6',
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    linkButton: {
        backgroundColor: '#2C3E50',
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 12,
    },
    linkText: {
        color: '#FFFFFF',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 14,
        letterSpacing: 0.5,
    },
    shareIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    noResultsText: {
        fontSize: 18,
        color: '#95A5A6',
        textAlign: 'center',
        marginVertical: 20,
    },
    heartButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 2,
        padding: 8,
    },
    heartIcon: {
        fontSize: 20,
    },
});

export default ResultsScreen;