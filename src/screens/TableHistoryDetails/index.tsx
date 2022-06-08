import React, { useState,  } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles';

import { Feather } from '@expo/vector-icons';

import Person from '../../assets/person.svg';
import Drink from '../../assets/drink.svg';

import { Customer } from '../../models/Customer';
import { Item } from '../../models/Item';

import * as DB from '../../services/db';

import { HistoryCustomerDetailsModal } from '../../components/HistoryCustomerDetailsModal';
import { HistoryItemDetailsModal } from '../../components/HistoryItemDetailsModal';
import { LineDivider } from '../../components/LineDivider';
import { Table } from '../../models/Table';
import { FlatListItem } from '../../components/FlatListItem';
import { theme } from '../../global/styles/theme';
import { CardFooter } from '../../components/CardFooter';
import { EmptyContainer } from '../../components/EmptyContainer';

import { formatNumberToPrice } from '../../utils/masks';

export const TableHistoryDetails = ({ navigation, route }: Table) => {
    
    const table = route.params;            

    const [toggleMenu, setToggleMenu] = useState(false);
    const [showCustomersInfo, setShowCustomersInfo] = useState(false);   
    const [showItemsInfo, setShowItemsInfo] = useState(false); 
    const [customerDetailsModal, setCustomerDetailsModal] = useState(false);
    const [itemDetailsModal, setItemDetailsModal] = useState(false);
    const [currentItem, setCurrentItem] = useState({} as Item);
    const [currentCustomer, setCurrentCustomer] = useState({} as Customer);    

    const showCustomerDetailsHandler = (customer: Customer) => {
        setCurrentCustomer(customer);
        setCustomerDetailsModal(true);        
    }

    const showItemDetailsHandler = (item: Item) => {
        setCurrentItem(item);
        setItemDetailsModal(true);
    }

    const closeModal = () => {
        setCustomerDetailsModal(false);
        setItemDetailsModal(false);
    }

    const showCustomersHandler = () => {
        setShowItemsInfo(false);
        setShowCustomersInfo(!showCustomersInfo);
    }

    const showItemsHandler = () => {
        setShowCustomersInfo(false);
        setShowItemsInfo(!showItemsInfo);
    }

    const deleteTableHandler = () => {         
        DB.DeleteTableFromHistory(table.id)
        .finally(() => navigation.goBack());
        
    }

    return (
        <View style={styles.container}>
            
            <TouchableWithoutFeedback onPress={() => setToggleMenu(true)}>
                <View style={styles.tableInfoContainer}>
                <Text style={styles.tableName} adjustsFontSizeToFit numberOfLines={2}>
                    {table.name || ' '}
                </Text>

                <View style={styles.settings}>
                    <Feather
                        name="settings"                            
                        color="white"
                        size={20}
                    />
                </View>

                { toggleMenu &&                    
                    <View style={styles.settingsOptions} >
    
                        <TouchableOpacity style={styles.settingsRow} onPress={deleteTableHandler}>
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
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.tableInfoArea}>

                <View style={styles.tableInfoRow}>
                    <TouchableOpacity style={styles.tableInfo} onPress={showCustomersHandler}>
                        <View style={styles.infoCircle}>
                            <Person height={35} width={35} stroke='white' fill={theme.colors.PRIMARY_2} />
                        </View>
                        <Text style={styles.infoText}>
                            {table.customers.length} pessoas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tableInfo} onPress={showItemsHandler}>
                        <View style={styles.infoCircle}>
                            <Drink height={40} width={40} stroke='white' fill={theme.colors.PRIMARY_2} />
                        </View>
                        <Text style={styles.infoText}>
                            {table.items.length} itens
                        </Text>
                    </TouchableOpacity>
                   
                </View>

                {
                    showCustomersInfo &&
                    <EmptyContainer style={styles.list}>
                        <FlatList 
                            data={table.customers}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <FlatListItem
                                    name={item.name}
                                    icon="person"
                                    toPay={item.toPay}
                                    onPress={() => showCustomerDetailsHandler(item)}
                                />
                            )}                                                                           
                            ItemSeparatorComponent={() => <LineDivider style={{marginBottom: 5}} />}                     
                            ListFooterComponent={() => <LineDivider style={{marginBottom: 5}} />}
                            numColumns={4}                                                                                            
                        /> 
                    </EmptyContainer>
                }

                {
                    showItemsInfo &&
                    <EmptyContainer style={styles.list}>
                        <FlatList 
                            data={table.items}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <FlatListItem
                                    name={item.name}
                                    icon={item.type}
                                    quantity={item.quantity}                                    
                                    toPay={item.price * item.quantity}
                                    onPress={() => showItemDetailsHandler(item)}
                                />
                            )}                                                                           
                            ItemSeparatorComponent={() => <LineDivider style={{marginBottom: 5}} />}                     
                            ListFooterComponent={() => <LineDivider style={{marginBottom: 5}} />}
                            numColumns={4}                                                                                            
                        /> 
                    </EmptyContainer>
                }

                <View style={styles.tableInfoRow}>
                    <View style={styles.tableInfo}>
                        <View style={styles.infoCircle}>
                            <Text style={styles.infoIconText}>CA</Text>    
                        </View>
                        <Text style={styles.infoText}>R${table.couvert.toFixed(2)}</Text>
                    </View>

                    <View style={styles.tableInfo}>
                        <View style={styles.infoCircle}>
                            <Text style={styles.infoIconText}>TS</Text>    
                        </View>
                        <Text style={styles.infoText}>{table.serviceFee}%</Text>
                    </View>


                </View>
            </View>

            <View style={styles.tableCards}>
                <CardFooter title="Total" value={formatNumberToPrice(table.totalValue)} />
                
                <CardFooter title="Média por pessoa" value={formatNumberToPrice((table.totalValue / table.customers.length) || 0)} />
            </View>           

            <HistoryCustomerDetailsModal 
                visible={customerDetailsModal}
                customer={currentCustomer}
                items={table.items}
                couvert={table.couvert}
                serviceFee={table.serviceFee}
                onConfirm={closeModal}
            />

            <HistoryItemDetailsModal 
                visible={itemDetailsModal}
                selectedItem={currentItem}
                customers={table.customers}
                onConfirm={closeModal}
            />

        </View>
    )
}