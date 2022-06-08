import React, { useContext, useState } from 'react';
import { View, Text, Share, TouchableOpacity, FlatList } from 'react-native';
import { SectionName } from '../../components/SectionName';
import  { StatusBar } from 'expo-status-bar';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

import AppContext from '../../context/contexts';

import { FlatListItem } from '../../components/FlatListItem';
import { EmptyContainer } from '../../components/EmptyContainer';
import { CheckButton } from '../../components/CheckButton';
import { LineDivider } from '../../components/LineDivider';
import { CardFooter } from '../../components/CardFooter';
import { createShareMessage } from '../../utils/text-functions';
import { Customer } from '../../models/Customer';

type TableOptionsProps = {
    [couvert: string]: boolean;
    serviceFee: boolean;
    customers: boolean;
    items: boolean;
}

export const ShareTable = () => {
    
    const { store } = useContext(AppContext);
    const { table, customers, items } = store; 

    const [selectedOption, setSelectedOption] = useState<'table' | 'customer'>('table');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>({} as Customer);

    const [tableOptions, setTableOptions] = useState({
        couvert: false,
        serviceFee: false,
        customers: true,
        items: true,
    } as TableOptionsProps);


    const tableOptionsHandler = (option: string) => {
        setTableOptions({...tableOptions, [option]: !tableOptions[option]});
    }

    const selectCustomerHandler = (customer: Customer) => setSelectedCustomer(customer);    

    const shareHandler = () => {
        const message = 
        createShareMessage({
            table, 
            customers, 
            items, 
            selectedOption, 
            tableOptions, 
            selectedCustomer
        });

        Share.share({message: message})
    }

    const TableOptions = () => {
        return (                                
            <View style={styles.cards}>
                
                <View style={styles.cardsRow}>
                    <TouchableOpacity style={{flex: 1,}} onPress={() => tableOptionsHandler('serviceFee')} >
                        <CardFooter title="Taxa de serviço" highlight={tableOptions.serviceFee} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{flex: 1,}} onPress={() => tableOptionsHandler('couvert')} >
                        <CardFooter title="Couvert artístico" highlight={tableOptions.couvert} />
                    </TouchableOpacity>                    
                </View>
                
                <View style={styles.cardsRow}>
                <TouchableOpacity style={{flex: 1,}} onPress={() => tableOptionsHandler('customers')} >
                        <CardFooter title="Pessoas" highlight={tableOptions.customers} />
                    </TouchableOpacity>                    
                    
                    <TouchableOpacity style={{flex: 1,}} onPress={() => tableOptionsHandler('items')} >
                        <CardFooter title="Itens" highlight={tableOptions.items} />
                    </TouchableOpacity>                                        
                </View>
            </View>
        )
    }

    const CustomerOptions = () => {
        return (
            
            <EmptyContainer style={{height: 270}}>
                <FlatList 
                    data={customers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <FlatListItem 
                            name={item.name} 
                            icon={item.icon}  
                            consumed={selectedCustomer.id == item.id.toString()}                          
                            noPayTag 
                            onPress={()=> {selectCustomerHandler(item)}} 
                        />} 
                    ListFooterComponent={() => <LineDivider />}                       
                    numColumns={4}
                    contentContainerStyle={styles.flatList}
                />

            </EmptyContainer>
        )
    }

    return(
        <View style={styles.container}>                        
            <View>
                <SectionName name="Compartilhar:" />            
                <LineDivider style={{ backgroundColor: 'gray', marginTop: -5, height: 0.5,}} />

                <View style={styles.selectArea}>
                    <CheckButton 
                        placeholder='Mesa' 
                        status={selectedOption == 'table' ? 'checked' : 'unchecked'} 
                        onPress={() => setSelectedOption('table')}    
                    />
                    <CheckButton 
                        placeholder='Pessoa' 
                        status={selectedOption == 'customer' ? 'checked' : 'unchecked'} 
                        onPress={() => setSelectedOption('customer')}    
                    />                
                </View>
            </View>

            <View>
                    <SectionName name="SELECIONE:" />            
                    <LineDivider style={{ backgroundColor: 'gray', marginTop: -5, height: 0.5,}} />

                    { selectedOption == 'table' && 
                        <TableOptions />
                    }
                    
                    { selectedOption == 'customer' && 
                        <CustomerOptions />
                    }
            </View>


            <TouchableOpacity style={styles.shareButton} onPress={shareHandler}>
                <Feather
                    name="share-2"
                    size={24}
                    color="white"
                />
                <Text style={styles.shareButtonText}>
                    Enviar
                </Text>
            </TouchableOpacity>                        
        </View>
    )
}