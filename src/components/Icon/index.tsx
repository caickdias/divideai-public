import React from 'react';
import { View, Image, ImageProps, StyleProp, ViewStyle } from 'react-native';

import { styles } from './styles';

type Props = {
    width?: number;
    height?: number;
    iconName?: string;
}

import Person from '../../assets/person.svg';
import Add from '../../assets/add.svg';

export const Icon = ({width=20, height=20, iconName='person'}: Props) => {
         
    return(
        <View style={[styles.container, {width, height}]}>
            {
                iconName == 'person'
                ? <Person width={width} height={height} fill="white" stroke="black" />
                : <Add width={width} height={height} stroke="black" />
            }           
        </View>
    );
}