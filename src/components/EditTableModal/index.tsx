import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ModalProps } from 'react-native';
import { ModalContainer } from '../ModalContainer';

import { styles } from './styles';

import AppContext from '../../context/contexts';
import { Button } from '../Button';
import { CheckButton } from '../CheckButton';
import { PriceInput } from '../PriceInput';
import { Input } from '../Input';

type Props = ModalProps & {
    onCancel: () => void;
    onConfirm: () => void;
}

export const EditTableModal = ({ onCancel, onConfirm, ...props }: Props) => {
    
    const { store, setTable, calcCustomersToPay } = useContext(AppContext);
    const { table } = store;
    
    const [tableName, setTableName] = useState(table.name);
    const [checkServiceFee, setCheckServiceFee] = useState(table.serviceFee ? true : false);
    const [serviceFee, setServiceFee] = useState(table.serviceFee);  
    const [checkCouvert, setCheckCouvert] = useState(table.couvert ? true : false); 
    const [couvert, setCouvert] = useState(table.couvert);
   
    const onCancelHandler = () => {
        setCheckServiceFee(serviceFee ? true : false);
        setServiceFee(serviceFee);
        setCheckCouvert(couvert > 0 ? true : false);
        setCouvert(couvert);
        onCancel();
    }

    const changeServiceFeeHandler = (value: string) => {
        setServiceFee(parseInt(value) || '');
    }

    const changeCouvertHandler = (value: string) => {
        setCouvert(parseFloat(value.replace(',','.')) || '');                
    }

    const updateTableHandler = () => {
        const newTable = {
            ...table,
            name: tableName.trim(),
            serviceFee: checkServiceFee ? serviceFee : 0,
            couvert: checkCouvert && couvert ? couvert : 0,
        }
        setTable(newTable);          
        calcCustomersToPay(newTable);      
        onConfirm();
    }

    return(
        <ModalContainer
            height={300}            
            {...props}
        >
            <View style={styles.container}>
                
                <View style={styles.nameRow}>
                    <Text style={styles.tableName}>Nome: </Text>
                    <Input                         
                        value={tableName}          
                        onChangeText={(text: string) => setTableName(text)}          
                        clearTextOnFocus   
                        onFocus={() => setTableName('')} 
                        style={styles.nameInput}
                    />
                    
                </View>
                
                <View style={[styles.row]}>
                    <CheckButton 
                        placeholder="Taxa de serviço:"   
                        status={checkServiceFee ? 'checked' : 'unchecked'}  
                        onPress={() => {
                            if(checkServiceFee){                                
                                setServiceFee('');
                                setCheckServiceFee(false);
                            } else {                                
                                setServiceFee(table.serviceFee || 10);
                                setCheckServiceFee(true);
                            }
                        }}                        
                    />
                    
                    <View style={styles.inputArea}>
                        <Input 
                            value={serviceFee.toString()}                                                                                                                                     
                            keyboardType="number-pad"
                            maxLength={2}    
                            clearTextOnFocus
                            onFocus={() =>  setServiceFee('')}
                            onChangeText={changeServiceFeeHandler}                     
                            editable={checkServiceFee ? true : false}   
                            lineStyle={{ width: 40, marginTop: 0}}
                        />
                        <Text style={[{fontSize: 18, color: checkServiceFee ? 'black' : 'grey' }]}>%</Text>
                    </View>
                </View>
                        
                <View style={[styles.row]}>
                    <CheckButton 
                        placeholder="Couvert artístico:" 
                        status={checkCouvert ? 'checked' : 'unchecked'}
                        onPress={() => {
                            if(checkCouvert){                                
                                setCouvert('');
                                setCheckCouvert(false);
                            } else {                                
                                setCouvert(table.couvert || 5);
                                setCheckCouvert(true);
                            }
                        }}          
                    />

                    <PriceInput                                                                                                                  
                        value={(couvert || '').toString()}
                        onFocus={() => setCouvert('')}
                        keyboardType="number-pad"
                        onChangeText={changeCouvertHandler}
                        clearTextOnFocus
                        editable={checkCouvert ? true : false}                                
                    />
                </View> 
                
                <View style={styles.buttonArea}>
                    <Button title='Voltar' onPress={onCancelHandler} />
                    <Button title='Salvar' onPress={updateTableHandler} />
                </View>

            </View>
        </ModalContainer>
    );
}