import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VisitPage from './src/pages/VisitPage';
import LoginPage from './src/pages/LoginPage';
import DashboardPage from './src/pages/DashboardPage';


export type PrivateParamList = {
    Visit: undefined,
    Dashboard: undefined
}

export type PublicParamList = {
    Login: undefined
}

const PrivateStack = createNativeStackNavigator<PrivateParamList>();
const PublicStack = createNativeStackNavigator<PublicParamList>();


export function PrivateStackNavigation() {
    return (
        <PrivateStack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false, animation: 'none' }}>
            <PrivateStack.Screen name="Dashboard" component={DashboardPage} />
            <PrivateStack.Screen name="Visit" component={VisitPage} />
        </PrivateStack.Navigator>
    )
}


export function PublicStackNavigation() {
    return (
        <PublicStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <PublicStack.Screen name="Login" component={LoginPage} />
        </PublicStack.Navigator>
    )
}