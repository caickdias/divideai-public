import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ModalProps, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

import Person from '../../assets/person.svg';
import { ModalContainer } from '../ModalContainer';
import { LineDivider } from '../LineDivider';
import { EmptyContainer } from '../EmptyContainer';
import { Button } from '../Button';
import AppContext from '../../context/contexts';
import { Item } from '../../models/Item';
import { FlatListItem } from '../FlatListItem';
import { Customer } from '../../models/Customer';
import { theme } from '../../global/styles/theme';

type Props = ModalProps & {
    id: string;
    onConfirm: () => void;
    onPressPayed: () => void;
    onDelete: () => void;
};

export const CustomerDetailsModal = ({onConfirm, onPressPayed, onDelete, id, ...props}: Props) => {

    const { store } = useContext(AppContext);
    const { items, customers, table } = store;
    const [toggleMenu, setToggleMenu] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({} as Customer);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    
    useEffect(() => {
        setCustomer({...customers.filter((customer: Customer) => customer.id == id)[0]});        
        setFilteredItems(items.filter((item: Item) => item.customers.includes(id)));                        
    },[id, items]);        

    useEffect(() => {
        if(Object.keys(customer).length > 0) setLoading(false);
    }, [customer]);

    const paymentHandler = () => {
        onPressPayed();
        closeModal()
    }

    const deleteCustomerHandler = () => {
        onDelete();
        closeModal()
    }
   
    const closeModal = () => {
        setToggleMenu(false);
        setLoading(true);
        setCustomer({} as Customer);
        setFilteredItems([] as Item[]);
        onConfirm();
    }

    return (
        <ModalContainer
            height={500}
            {...props}
        >            
            <View style={styles.container}>
                { !loading && <>
                <View style={styles.header}>
                    {             
                        <View style={{flex: 1}}>                   
                            <Person 
                                width={30} 
                                height={30} 
                                fill={customer.hasPaid ? theme.colors.PAYED : 'white'} 
                                stroke="black" 
                            />
                        </View>                    
                    }
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerName} adjustsFontSizeToFit numberOfLines={2}>
                            {customer.name.toUpperCase()}
                        </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.settings} onPress={() => setToggleMenu(!toggleMenu)}>                        
                        <Feather
                            name="settings"     
                            size={24}                           
                        />
                    </TouchableOpacity>
                </View>

                { toggleMenu &&
                <View style={styles.settingsOptions} >
                    <TouchableOpacity style={styles.settingsRow} onPress={paymentHandler}>
                        <Text>
                            Pagou a conta
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsRow} onPress={deleteCustomerHandler}>
                        <Text>
                            Excluir
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.settingsRow} onPress={() => setToggleMenu(false)}>
                        <Text>
                            Sair
                        </Text>
                    </TouchableOpacity>
                </View>
                }

                <View style={styles.mathArea}>
                    <View style={styles.mathRow}>
                        <Text style={styles.rowName}>
                            Sub-total:
                        </Text>
                        <Text style={styles.rowValue}>
                            R${((customer.toPay - table.couvert) * 100 / (100 + table.serviceFee)).toFixed(2)}                            
                        </Text>
                    </View>
                    <View style={styles.mathRow}>
                        <Text style={styles.rowName}>
                            Taxa de serviço:
                        </Text>
                        <Text style={styles.rowValue}>
                        R${((customer.toPay - table.couvert) * table.serviceFee / (100 + table.serviceFee) ).toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.mathRow}>
                        <Text style={styles.rowName}>
                            Couvert artístico:
                        </Text>
                        <Text style={styles.rowValue}>
                            R${(table.couvert).toFixed(2)}
                        </Text>
                    </View>

                    <LineDivider style={{marginBottom: 5}} />

                    <View style={styles.mathRow}>
                        <Text style={styles.rowName}>
                            Total:
                        </Text>
                        <Text style={styles.rowValue}>
                            R${customer.toPay.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.consumed}>
                        Consumiu:
                    </Text>

                    <EmptyContainer style={styles.itemsContainer}>
                        <FlatList 
                            data={filteredItems as Item[]}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => 
                                <FlatListItem 
                                    name={item.name} 
                                    quantity={item.quantity} 
                                    icon={item.icon} 
                                    toPay={(item.price * item.quantity) / item.customers.length} 
                                />
                            }                        
                            ItemSeparatorComponent={() => <LineDivider />}
                            ListFooterComponent={() => <LineDivider />}
                            numColumns={4}
                            contentContainerStyle={styles.flatList}                            
                        /> 
                    </EmptyContainer>
                </View>
                </>}
                <View style={styles.buttonArea}>
                    <Button title="Ok" onPress={closeModal}/>
                </View>

            </View>
            
        </ModalContainer>
    );    
}