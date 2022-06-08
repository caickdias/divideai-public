import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

import Drink from '../../assets/drink.svg';
import Food from '../../assets/food.svg';
import Other from '../../assets/other.svg';
import { Feather } from '@expo/vector-icons';

import AppContext from '../../context/contexts';
import { Item } from '../../models/Item';
import { Customer } from '../../models/Customer';

type Props = {
    id: string;
}

export const CheckLineInfo = ({ id }: Props) => {

    const { store } = useContext(AppContext);
    const { items, customers } = store;
    const [loading, setLoading] = useState(true);
    
    const selectedItem = useRef({} as Item);
    const includedCustomers = useRef([] as Customer[])
    const customersList = useRef<string[]>([])

    useEffect(() => {
        selectedItem.current = items.find((item: Item) => item.id == id);  
        customersList.current = selectedItem.current.customers;
        includedCustomers.current = customers.filter((customer : Customer) => {
            return customersList.current.includes(customer.id.toString());
        })               
        setLoading(false);                              
    }, []);
    

    return(
        <View style={styles.container}>            
           { !loading &&               
            <View style={styles.row}>
                <View style={styles.iconArea}>
                    {selectedItem.current.type == 'drink' ? <Drink width={40} height={40} stroke="black" />                    
                    : selectedItem.current.type == 'food' ? <Food width={40} height={40} stroke="black" />                    
                    : <Other width={40} height={40} stroke="black" />                                    
                    }
                </View>

                <View style={styles.toPay}>   
                    <Text style={styles.text}>
                        <Text style={styles.customerName}>                        
                        {                        
                            includedCustomers.current.length == customers.length ? 'TODOS ' :
                            includedCustomers.current.map((customer, index) =>                             
                                    {return `${customer.name.trim()}${includedCustomers.current.length == 1 ? ' '
                                        : index == includedCustomers.current.length - 2 ? ' e '
                                        : index == includedCustomers.current.length - 1 ? ' '
                                        : ', '}`    
                                }
                                
                            )
                        }
                        </Text>
                            {includedCustomers.current.length > 1 ? 'consumiram' : 'consumiu'} <Text style={styles.customerName}>{
                            selectedItem.current.quantity} {selectedItem.current.name.trim()}</Text> por 
                            R${(selectedItem.current.quantity * selectedItem.current.price).toFixed(2)}
                    </Text>
                </View>
            </View>                                                                  
            }
        </View>
    )
}