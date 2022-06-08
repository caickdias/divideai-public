import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

type Props = {
    name: string;
}

export const SectionName = ({ name } : Props) => {
    return(
        <View style={styles.sectionName}>
            <Text style={styles.sectionNameText}>- {name.toUpperCase()} -</Text>
        </View>
    )
}