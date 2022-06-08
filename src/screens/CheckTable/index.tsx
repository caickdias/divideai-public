import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

import * as DB from '../../services/db';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../../components/Button';

import { Background } from '../../components/Background';
import { RootStackParamList } from '../../routes/app.routes';
import AppContext from '../../context/contexts';
import { CheckTableRoutes } from './routes';
import { getPaidCustomers } from '../../utils/calculations';
import { theme } from '../../global/styles/theme';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'CheckTable'>;

export const CheckTable = ({ navigation }: NavigationProps) => {
    
    const { store, endTable } = useContext(AppContext);
    const { customers, items, table } = store;
    const currentTable = table;

    const endTableHandler = async () => {
        Promise.all([DB.DeleteCustomers(), DB.DeleteItems(), DB.DeleteTable(), DB.AddToTableHistory(customers, items, table)])
        .then(endTable);
        navigation.navigate('Home');        
    }

    const Header = () => (
        <View style={styles.header}>
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

            </View>

            <View style={styles.headerSection2}>                
        
                <View style={styles.tableValueCard}>
                    <Text style={styles.tableValueCardTitle} adjustsFontSizeToFit numberOfLines={1}>Total</Text>
                    <Text style={styles.tableValueCardValue} adjustsFontSizeToFit numberOfLines={1}>R$
                        {currentTable.totalValue.toFixed(2) || '0'}
                    </Text>                        
                </View>

                <View style={styles.tableValueCard}>
                    <Text style={styles.tableValueCardTitle} adjustsFontSizeToFit numberOfLines={1}>A pagar:</Text>
                    <Text style={styles.tableValueCardValue} adjustsFontSizeToFit numberOfLines={1}>R$
                        {(currentTable.totalValue - getPaidCustomers(customers)).toFixed(2)}
                    </Text>
                </View>
                
            </View>
        </View>
    )

    return (
        <Background>
            { table.hasOwnProperty('id') &&
                <>
                    <Header />

                    <View style={styles.body}>
                        <CheckTableRoutes />
                        
                        <View style={styles.buttonArea}>
                            <TouchableOpacity style={styles.shareButton} onPress={() => {navigation.navigate('ShareTable')}}>
                                    <Feather
                                        name="share-2"
                                        size={24}
                                        color={theme.colors.PRIMARY}
                                    />
                                    <Text style={styles.shareButtonText}>
                                        Compartilhar relatório
                                    </Text>
                            </TouchableOpacity>

                            <View style={styles.buttonBottom}>
                                <Button 
                                    title="Voltar"
                                    onPress={() => navigation.goBack()}
                                />

                                <Button
                                    title="Finalizar mesa"
                                    onPress={endTableHandler}
                                />
                            </View>
                        </View>
                    </View>
                </>
            }
        </Background>
    )
}