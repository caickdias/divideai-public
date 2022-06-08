import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '../../global/styles/theme';
import { CustomersList } from '../Lists/CustomersList';
import { ItemsList } from '../Lists/ItemsList';

const TopTab = createMaterialTopTabNavigator();

export const CurrentTableRoutes = () => (
    <TopTab.Navigator 
        screenOptions={{ 
            tabBarLabelStyle: { 
                    fontFamily: theme.fonts.Bold700, 
                    fontSize: 15 ,                    
                },
            tabBarActiveTintColor: theme.colors.PRIMARY_2,
            }}
        >
        
        <TopTab.Screen name="Pessoas">
            {() => 
                <CustomersList addButton />
            }
        </TopTab.Screen>

        <TopTab.Screen name="Itens">
            {() => 
                <ItemsList />
            }
        </TopTab.Screen>
                
        
    </TopTab.Navigator>
)
