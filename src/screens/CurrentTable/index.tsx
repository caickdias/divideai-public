import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { styles } from './styles';
import { CurrentTableRoutes } from './routes';

import { Feather } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/app.routes';

import AppContext from '../../context/contexts';

import { Background } from '../../components/Background';
import { Button } from '../../components/Button';

import { EditTableModal } from '../../components/EditTableModal';
import { checkEmptyCustomerItems, getItemsTotalValue, getServiceFeeTotalValue } from '../../utils/calculations';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'CurrentTable'>;

export const CurrentTable = ({ navigation }: NavigationProps) => {
   
    const { store, calcTableTotal, calcCustomersToPay } = useContext(AppContext);    
    const { customers, table, items } = store;                
 
    const [editTableModal, setEditTableModal] = useState(false);    
    const currentTable = table;        

    useEffect(() => {        
        calcCustomersToPay(table);
    }, [items]);
    
    useEffect(() => {    
        calcTableTotal();
    }, [customers, items]);    

    const editTableHandler = () => {                
        setEditTableModal(false);
    }

    const checkTableHandler = () => {
        
        if(checkEmptyCustomerItems(items)){
            Alert.alert("Existem itens não divididos", "Deseja continuar?", [
                {
                    text: "Voltar",                    
                },
                {
                    text: "Continuar",
                    onPress: () => navigation.navigate('CheckTable')
                }
            ]);
        } else {
            navigation.navigate('CheckTable');
        }
    }

    const Header = () => (
        <TouchableOpacity style={styles.header} onPress={() => setEditTableModal(true)}>
            <View style={styles.headerSection1}>
                <View style={styles.tableNameArea}>
                    <Text style={styles.tableName} adjustsFontSizeToFit numberOfLines={2}>{table.name.toUpperCase()}, </Text>    
                    <Text style={styles.tableInfo}>{
                        currentTable.serviceFee > 0
                        ? `taxa de serviço: ${currentTable.serviceFee}%`
                        : 'sem taxa de serviço'
                    }, 
                        { currentTable.couvert > 0 
                            ? ` couvert artístico: ${currentTable.couvert} reais`
                            : ' sem couvert artístico'
                        }
                    </Text>
                </View>
                
                <View style={styles.settings}>                        
                    <Feather
                        name="settings"     
                        size={24}    
                        color="white"                       
                    />
                </View>

            </View>

            <View style={styles.headerSection2}>                
        
                <View style={styles.tableValueCard}>
                    <Text style={styles.tableValueCardTitle} adjustsFontSizeToFit numberOfLines={1}>Sub-total</Text>
                    <Text style={styles.tableValueCardValue} adjustsFontSizeToFit numberOfLines={1}>R$
                        {getItemsTotalValue(items).toFixed(2)}
                    </Text>
                </View>

                { currentTable.serviceFee > 0 &&
                <View style={styles.tableValueCard}>
                    <Text style={styles.tableValueCardTitle} adjustsFontSizeToFit numberOfLines={1}>T.S</Text>
                    <Text style={styles.tableValueCardValue} adjustsFontSizeToFit numberOfLines={1}>R$
                        {getServiceFeeTotalValue(table.serviceFee, getItemsTotalValue(items)).toFixed(2)}
                    </Text>                        
                </View>
                }

                { currentTable.couvert > 0 &&
                    <View style={styles.tableValueCard}>
                        <Text style={styles.tableValueCardTitle} adjustsFontSizeToFit numberOfLines={1}>C.A</Text>
                        <Text style={styles.tableValueCardValue} adjustsFontSizeToFit numberOfLines={1}>R$
                        {(currentTable.couvert * customers.length).toFixed(2)}
                        </Text>                        
                    </View>
                }
                
                <View style={styles.tableValueCard}>
                    <Text style={styles.tableValueCardTitle} adjustsFontSizeToFit numberOfLines={1}>Total</Text>
                    <Text style={styles.tableValueCardValue} adjustsFontSizeToFit numberOfLines={1}>R$
                        {currentTable.totalValue.toFixed(2) || '0'}
                    </Text>                        
                </View>                
            </View>            
        </TouchableOpacity>
    )
   
     return(   
        <Background>     
            
            <Header />

            <EditTableModal 
                visible={editTableModal} 
                onCancel={() => setEditTableModal(false)}
                onConfirm={() => editTableHandler()}
            />

            <View style={styles.body}>
                <CurrentTableRoutes />

                <View style={styles.buttonArea}>
                    <Button 
                        title="Voltar"
                        onPress={() => navigation.navigate('Home')}
                    />

                    <Button
                        title="Divide aí!"
                        onPress={checkTableHandler}
                    />
                </View>
            </View>

        </Background>
    );
}