import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CreateTable } from '../screens/CreateTable';
import { CurrentTable } from '../screens/CurrentTable';
import { CheckTable } from '../screens/CheckTable';
import { TableHistoryDetails } from '../screens/TableHistoryDetails';
import { ShareTable } from '../screens/ShareTable';

export type RootStackParamList = {
    Home: undefined;
    CreateTable: undefined;
    CurrentTable: undefined;
    CheckTable: undefined;
    TableHistoryDetails: undefined;    
    ShareTable: undefined;
}

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export const AppRoutes = () => {
    return(
        <Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Home"
        >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="CreateTable"
                component={CreateTable}
            />
            <Screen 
                name="CurrentTable"
                component={CurrentTable}
            />
            <Screen 
                name="CheckTable"
                component={CheckTable}
            />
            <Screen 
                name="TableHistoryDetails"
                component={TableHistoryDetails}
            />  
            <Screen 
                name="ShareTable"
                component={ShareTable}
            />          
        </Navigator>
    );
}

