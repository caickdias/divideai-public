import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';

import * as DB from '../../services/db';

import { Table, TableHistory } from '../../models/Table';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CardFooter } from '../../components/CardFooter';
import { Feather } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { TableLineInfo } from '../../components/TableLineInfo';
import { SectionName } from '../../components/SectionName';
import { RootStackParamList } from '../../routes/app.routes';
import { getAllTablesPriceAverage, getAllCustomersPriceAverage } from '../../utils/calculations';
import { formatNumberToPrice } from '../../utils/masks';


import AppContext from '../../context/contexts';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({ navigation }: NavigationProps) => {    

    const { store, setInitialStore } = useContext(AppContext);
    const { customers, table } = store;        

    const [latestTables, setLatestTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {        
        loadInitialState();                                  
    }, []);    

    useFocusEffect(useCallback(() => {                        
        setLoading(true);        
        loadHistory();                       
    }, [table]));

    const loadHistory = async () => {
        try {
            const tableHistory = await DB.LoadTableHistory();              
            setLatestTables(tableHistory);                        
        } catch(erro) {            
        } finally { 
            setLoading(false);
        }
    }

    const loadInitialState = async () => {
        try {
            const [customersResponse, tableResponse, itemsResponse, tableHistoryResponse] 
            = await Promise.all([DB.LoadCustomers(), DB.LoadCurrentTable(), DB.LoadItems(), DB.LoadTableHistory()]);                 
            setInitialStore(customersResponse, itemsResponse, tableResponse);            
            setLatestTables(tableHistoryResponse);                        
        } catch(error){
            console.log("erro loading initial state");
        } finally {
            setLoading(false);
        }
    }

    const renderItem = ({ item }: TableHistory) => {                
        return(
            <TableLineInfo 
                tableName={item.name} 
                nOfPeople={item.customers.length} 
                nOfItems={item.items.length}
                totalValue={item.totalValue}
                onPress={() => navigation.navigate('TableHistoryDetails', {...item} )} 
            />
        );
    }

    const tableScreenHandler = () => {
        if(table.hasOwnProperty('id')){
            navigation.navigate('CurrentTable');
        } else {
            navigation.navigate('CreateTable');
        }
    }

    const TableInfoHeader = () => {
        return(
            <>
                <View style={styles.showCurrentTable}>                                        
                    <Feather 
                        name="chevron-right"
                        color="white"
                        size={30}
                    />                    
                </View>
                
                <View style={styles.tableInfo1}>                        
                    <Text style={styles.tableName} adjustsFontSizeToFit numberOfLines={2}>{table.name.toUpperCase()}, </Text>    
                    <Text style={styles.tableNOfPeople}>{customers.length} PESSOAS</Text>                            
                </View>
                
                <View style={styles.tableInfo2}>                        
                    <Text style={styles.currentPriceText}>Valor atual</Text>    
                    <Text style={styles.tableTotalValue}>R${table.totalValue.toFixed(2)}</Text>                            
                </View>                
            </>
        );
    }

    const NoTableHeader = () => {
        return (
            <>                
                <View style={styles.showCurrentTable}></View>
                
                <View style={styles.tableInfo1}>                        
                    <Text style={styles.tableName}>Nenhuma mesa </Text> 
                    <Text style={styles.tableNOfPeople}>atualmente</Text>                                                                                       
                </View>
                
                <View style={styles.tableInfo2}>                        
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.currentPriceText}>Criar mesa</Text>
                        <Feather 
                            name="chevron-right"
                            color="white"
                            size={26}
                        />    
                    </View>                                
                </View>                
            </>
        );
    }

    if(loading) {
        return (
        <Background>
            <View style={styles.appLoading}>
                <ActivityIndicator size="large" />
            </View>
        </Background>
        );
    }

    return (        
        <Background>
            <View style={styles.container}>
                <TouchableOpacity style={styles.header} onPress={tableScreenHandler}>                            
                        
                        { table.hasOwnProperty('id') > 0 
                            ? <TableInfoHeader />
                            : <NoTableHeader /> 
                        }
                </TouchableOpacity>
                
                <View style={styles.body}>                                            
                                              
                    <FlatList 
                        data={[...latestTables].reverse()} 
                        keyExtractor={item => item.id}
                        renderItem={renderItem}                            
                        ListHeaderComponent={<SectionName name="histórico" />}                                                            
                        stickyHeaderIndices={[0]}   
                        ListEmptyComponent={() => <Text>Nenhuma mesa no histórico</Text>} 
                        maxToRenderPerBatch={10}
                    />

                    <View style={styles.footer}>
                        <SectionName name="média total de consumo" />

                        <View style={styles.footerCardsArea}>
                        
                            <CardFooter
                                title="Por mesa"
                                value={formatNumberToPrice(getAllTablesPriceAverage(latestTables))}
                            />

                            <CardFooter 
                                title="Por pessoa" 
                                value={formatNumberToPrice(getAllCustomersPriceAverage(latestTables))}
                            />
                                                                                  
                        </View>                    
                    </View>                                        
                </View>                
            </View>              
        </Background>
    );
}