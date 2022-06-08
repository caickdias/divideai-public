import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from '../../global/styles/theme';
import { CheckTableConsume } from '../../components/CheckTableConsume';
import { CustomersList } from '../Lists/CustomersList';

const TopTab = createMaterialTopTabNavigator();


export const CheckTableRoutes = () => (
    <TopTab.Navigator 
        screenOptions={{ 
            tabBarLabelStyle: { 
                    fontFamily: theme.fonts.Bold700, 
                    fontSize: 15 ,                    
                },
            tabBarActiveTintColor: theme.colors.PRIMARY_2,
            }}
        >
        
        <TopTab.Screen name="quem já pagou">
            {() =>{                 
                return <CustomersList paymentHandler />                              }
            }
        </TopTab.Screen>

        <TopTab.Screen name="consumo">
            {() => 
                <CheckTableConsume />  
            }
        </TopTab.Screen>
                        
    </TopTab.Navigator>
)
