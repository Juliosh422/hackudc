// navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    TouchableOpacity,
    Image,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Wishlist')}
                            style={{ marginRight: 15 }}
                        >
                            <Image
                                source={require('../assets/heart-filled.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Results"
                component={ResultsScreen}
                options={{ title: 'Results' }}
            />
            <Stack.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{ title: 'Wishlist' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;