import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { LinearGradient } from 'expo-linear-gradient';

type TableLine = TouchableOpacityProps & {
    tableName: string;
    totalValue: number;
    nOfPeople: number;
    nOfItems: number;
}

export const TableLineInfo = ({tableName, totalValue, nOfPeople, nOfItems, ...props}: TableLine) => {
    return(
        <TouchableOpacity 
            style={styles.lineContainer}
            {...props}
        >
            
            <View style={styles.column}>
                <View style={styles.iconContainer}>
                    <Text style={styles.tableFirstLetter}>
                        {tableName.toUpperCase()[0]}
                    </Text>
                </View>

                <View style={styles.tableInfo}>
                    <Text style={styles.tableName} adjustsFontSizeToFit numberOfLines={1}>
                        {tableName || ' '}
                    </Text>           
         
                     <Text style={styles.tableNOfPeople} adjustsFontSizeToFit numberOfLines={1}>
                        {nOfPeople} pessoas, {nOfItems} itens
                     </Text>
                 </View>
                
                <View style={styles.priceContainer}>
                    <Text style={styles.price} adjustsFontSizeToFit numberOfLines={1}>
                        R${totalValue.toFixed(2)}
                    </Text>           
                </View>                        
            </View>
            
            
        </TouchableOpacity>
    );
}
/*<Feather   
                name="chevron-right"
                size={22}
                color="black"                      
            />*/