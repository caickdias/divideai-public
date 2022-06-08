import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

type Props = {
    value: number;
    onChangeValue: (quantity: number) => void;
}

export const QuantityInput = ({ value, onChangeValue}: Props) => {
    
    const [quantity, setQuantity] = useState(value || 1);
    
    const changeValueHandler = (operation: string) => {        
        if(operation == 'add'){
            setQuantity(quantity => quantity+1)
        } else {
            setQuantity(quantity => Math.max(1, quantity-1));        
        }                        
    }

    useEffect(()=>{
        onChangeValue(quantity);
    }, [quantity]);

    useEffect(() => {
        setQuantity(value);
    }, [value])

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.changeQuantity}
                onPress={() => changeValueHandler('subtract')}
            >
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>

            <View style={styles.quantityArea}>
                <Text style={styles.text}>
                    {quantity}
                </Text>            
            </View>
            
            <TouchableOpacity 
                style={styles.changeQuantity}
                onPress={() => changeValueHandler('add')}
            >
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    )
}