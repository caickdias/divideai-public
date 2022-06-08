import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { Logo } from '../Logo';

type Props = {
    children: ReactNode;    
}

export const Background = ({ children }: Props) => {
   
    return (
        <>
        <LinearGradient 
            style={styles.header} 
            colors={[theme.colors.PRIMARY, theme.colors.PRIMARY]}
        >
            
        <Text style={styles.division1}>÷</Text>
        <Text style={styles.division2}>%</Text>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
        <View style={styles.circle3}></View>
        <Text style={styles.dots}>.....</Text>
        
        <View style={styles.logo}>
            <Logo />
        </View>

        </LinearGradient>
        <View style={styles.body}></View>
        
        <View style={styles.content}>
            {children}
        </View>
        </>
    );
}

/*type Props = {
    children: ReactNode;
}

export const Background = ({ children }: Props) => {
   
    return (
        <LinearGradient 
            style={styles.background} 
            colors={[theme.colors.SECONDARY, theme.colors.SECONDARY]}
        >
            
        <View style={styles.circle}></View>
        
        {children}

        </LinearGradient>
    );
}*/