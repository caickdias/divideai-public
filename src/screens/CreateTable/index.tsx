import React, { useContext, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, FlatList, Alert } from 'react-native';

import { styles } from './styles';

import uuid from 'react-native-uuid';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Background } from '../../components/Background';
import { EmptyContainer } from '../../components/EmptyContainer';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { CheckButton } from '../../components/CheckButton';
import { CustomersAndItemsList } from '../../components/CustomersAndItemsList';
import { AddIconItem } from '../../components/AddIconItem';
import { FlatListItem } from '../../components/FlatListItem';
import { LineDivider } from '../../components/LineDivider';

import { Customer } from '../../models/Customer';
import { RootStackParamList } from '../../routes/app.routes';
import { AddCustomersModal } from '../../components/AddCustomersModal';
import { PriceInput } from '../../components/PriceInput';
import AppContext from '../../context/contexts';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'CreateTable'>;

 const add = {
    id: uuid.v4(),
    name: 'adicionar',
    toPay: 0,    
    icon:'add',
}

export const CreateTable = ({ navigation }: NavigationProps) => {

    const { addCustomers, createTable, teste } = useContext(AppContext);
    
    const [customers, setCustomers] = useState<Customer[]>([]);
   
    const [tableName, setTableName] = useState('');
    const [checkServiceFee, setCheckServiceFee] = useState(true);
    const [serviceFee, setServiceFee] = useState<number | string>(10);
    const [checkCouvert, setCheckCouvert] = useState(false);
    const [couvert, setCouvert] = useState<number>(5);

    const tabs = ['pessoas'];
    const [activeTab, setActiveTab] = useState('pessoas');     

    const [addCustomerModal, setAddCustomerModal] = useState(false);       

    const openCustomerModalHandler = () => {        
        setAddCustomerModal(true);
    }

    const closeCustomerModalHandler = () => {        
        setAddCustomerModal(false);                  
    }

    const addNewCustomersHandler = ([customer1, customer2, customer3, customer4]: string[]) => {                
        const newCustomers = [customer1, customer2, customer3, customer4]
                .filter(value => value)
                .map(customer => {
                    return {
                        id: uuid.v4(),
                        name: customer,
                        hasPaid: false,
                        icon: 'person',
                        toPay: 0,                    
                    }
                });                        
        setCustomers([...customers, ...newCustomers]);
        closeCustomerModalHandler();               
    }   

    const initTableHandler = async () => {        
  
        if(tableName.trim() === ''){
            Alert.alert('Digite um nome para o local');
            return;
        }

        const newTable = {
            id: uuid.v4(),
            name: tableName.trim(),
            serviceFee: checkServiceFee ? serviceFee : 0,
            couvert: checkCouvert ? (couvert || 5) : 0,
            totalValue: checkCouvert ? customers.length * (couvert || 5) : 0
        }        
        if(checkCouvert){
            customers.forEach((customer: Customer) => customer.toPay = couvert);
        }
        try{                        
            addCustomers(customers);
            createTable(newTable);               
        } catch(error){
            console.log('error db create table screen');
        } finally {            
            navigation.navigate('CurrentTable');        
        }
    }

    const changeServiceFeeHandler = (value: string) => {
        setServiceFee(parseInt(value) || '');
    }

    const changeCouvertHandler = (value: string) => {
        if(!value) {
            setCouvert(0);
        }
        else {
            setCouvert(parseFloat(value.replace(',','.')));        
        }
    }

    return(   
        <Background>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <EmptyContainer style={styles.containerTop}>                        
                        <View style={styles.topRow}>
                            <Input 
                                placeholder="Nome do local"
                                clearTextOnFocus
                                value={tableName}
                                onFocus={() => setTableName('')}
                                onChangeText={(text: string): void => setTableName(text)}
                                style={styles.nameInput}
                            />
                            
                        </View>
                        
                        <View style={[styles.midRow]}>
                            <CheckButton 
                                placeholder="Taxa de serviço:"   
                                status={checkServiceFee ? 'checked' : 'unchecked'}  
                                onPress={() => setCheckServiceFee(!checkServiceFee)}                        
                            />
                            
                            <View style={styles.inputArea}>
                                <Input 
                                    value={serviceFee.toString()}
                                    placeholder={'10'}
                                    onFocus={() => setServiceFee('')}                
                                    clearTextOnFocus                                                        
                                    onChangeText={changeServiceFeeHandler}                                    
                                    keyboardType="number-pad"
                                    maxLength={2}                         
                                    editable={checkServiceFee ? true : false}   
                                    lineStyle={{ width: 40, marginTop: 0}}
                                />
                                <Text style={styles.text}>%</Text>
                            </View>
                        </View>
                        
                        <View style={[styles.midRow]}>
                            <CheckButton 
                                clearTextOnFocus
                                placeholder="Couvert artístico:" 
                                status={checkCouvert ? 'checked' : 'unchecked'}
                                onPress={() => setCheckCouvert(!checkCouvert)}
                            />

                            <PriceInput                                 
                                onFocus={() => setCouvert(0)}
                                keyboardType="number-pad"
                                onChangeText={changeCouvertHandler}
                                clearTextOnFocus
                                editable={checkCouvert ? true : false}                                 
                            />
                        </View>                        
                    </EmptyContainer>

                    <CustomersAndItemsList
                        tabs={tabs}
                        activeTab={activeTab}                                            
                    >
                        <FlatList 
                            data={[add, ...customers]}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                index == 0
                                ? <AddIconItem
                                    onPress={openCustomerModalHandler}
                                />
                                : <FlatListItem 
                                    name={item.name} 
                                    icon={item.icon}                                   
                                    noPayTag
                                />
                            )}                                                                           
                            ItemSeparatorComponent={() => <LineDivider style={{marginBottom: 5}} />}                     
                            ListFooterComponent={() => <LineDivider style={{marginBottom: 5}} />}
                            numColumns={4}                                                                
                            contentContainerStyle={styles.flatList}
                        /> 
                    </CustomersAndItemsList>

                    <View style={styles.buttonArea}>
                        <Button 
                            title="Cancelar"
                            onPress={() => navigation.navigate('Home')}
                        />
                        
                        <Button 
                            title="Iniciar"
                            onPress={initTableHandler}
                        />
                    </View> 

                    <AddCustomersModal 
                        visible={addCustomerModal}
                        onAdd={addNewCustomersHandler}
                        onCancel={closeCustomerModalHandler}
                    />  
                </View>                
            </TouchableWithoutFeedback>    
        </Background>         
    );
}
