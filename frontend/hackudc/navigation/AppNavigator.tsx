import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import { RootStackParamList } from '../types';

// Pass the RootStackParamList type to createStackNavigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="Results"
                component={ResultsScreen}
                options={{ title: 'Results' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;