import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Linking,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface Product {
    id: string;
    name: string;
    brand: string;
    price: {
        value: {
            current: number;
            original?: number;
        };
    };
    link: string;
}

const WishlistScreen: React.FC = () => {
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [wishlistItems, setWishlistItems] = useState<string[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch('http://10.20.27.122:8082/api/wishlist');
                const wishlist: { products: Product[] } = await response.json();
                setWishlistProducts(wishlist.products);
                setWishlistItems(wishlist.products.map((p) => p.id));
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        if (isFocused) fetchWishlist();
    }, [isFocused]);

    const toggleWishlist = async (product: Product) => {
        try {
            const response = await fetch(
                `http://10.20.27.122:8082/api/wishlist/products/${product.id}`,
                { method: 'DELETE' }
            );

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            setWishlistProducts((prev) => prev.filter((p) => p.id !== product.id));
            setWishlistItems((prev) => prev.filter((id) => id !== product.id));
        } catch (error) {
            Alert.alert('Error', 'Could not remove from wishlist');
            console.error('Wishlist error:', error);
        }
    };

    const renderProductItem = (item: Product) => (
        <View style={styles.productCard} key={item.id}>
            <TouchableOpacity
                style={styles.heartButton}
                onPress={() => toggleWishlist(item)}
            >
                <Text style={[styles.heartIcon, { color: wishlistItems.includes(item.id) ? '#E74C3C' : '#000000' }]}>
                    {wishlistItems.includes(item.id) ? '❤️' : '🖤'}
                </Text>
            </TouchableOpacity>

            <Image
                source={{
                    uri: `http://10.20.27.122:8084/searchImage?query=${encodeURIComponent(`${item.name} ${item.brand}`)}`
                }}
                style={styles.productImage}
                onError={() => console.log("Failed to load image for", item.id)}
            />

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
                <View style={styles.titleContainer}>
                    <Text style={styles.resultsTitle}>Your Wishlist</Text>
                </View>

                {wishlistProducts.length === 0 ? (
                    <Text style={styles.noResultsText}>No items in your wishlist</Text>
                ) : (
                    wishlistProducts.map((product) => renderProductItem(product))
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
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fff',
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

export default WishlistScreen;