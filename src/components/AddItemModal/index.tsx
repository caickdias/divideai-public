import React, { useState, useContext, useEffect } from 'react';
import { ModalProps, View, Text, FlatList, Alert } from 'react-native';

import { styles } from './styles';

import uuid from 'react-native-uuid';

import { EmptyContainer } from '../EmptyContainer';
import { ModalContainer } from '../ModalContainer';
import { FlatListItem } from '../FlatListItem';
import { LineDivider } from '../LineDivider';
import { Input } from '../Input';
import { CheckButton } from '../CheckButton';
import { PriceInput } from '../PriceInput';
import { QuantityInput } from '../QuantityInput';
import { Button } from '../Button';

import { formatPriceInput } from '../../utils/masks';

import { Item } from '../../models/Item';
import { Customer } from '../../models/Customer';
import AppContext from '../../context/contexts';

type Props = ModalProps & {    
    onAdd: (newItem: Item) => void;
    onCancel: () => void;
}

export const AddItemModal = ({onAdd, onCancel, ...props}: Props) => {
        
    const { store } = useContext(AppContext);
    const { customers } = store;

    const [name, setName] = useState('');
    const [type, setType] = useState('drink');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);    
    const [whoConsumed, setWhoConsumed] = useState<string[]>([]);
    const [everyoneConsumed, setEveryoneConsumed] = useState(false);
    
    useEffect(() => {
        if(whoConsumed.length == customers.length){
            setEveryoneConsumed(true);
        } else {
            setEveryoneConsumed(false);
        }
    }, [whoConsumed]);

    const onCancelHandler= () => {
        clearInputs();
        onCancel();
    }

    const clearInputs = () => {
        setName('');
        setType('drink');
        setPrice('');
        setQuantity(1);
        setEveryoneConsumed(false);
        setWhoConsumed([]);
    }

    const checkName = () => name.trim() == '';
    const checkPrice = () => price.trim() == '';

    const validate = () => {
        if(checkName()){
            Alert.alert("Digite um nome para o item");
            return false;
        }

        if(checkPrice()){
            Alert.alert("Digite o valor do item");
            return false;
        }
        return true;
    }

    const addButtonHandler = async () => {                

        if(!validate()) return;        

        const newItem: Item = {
            id: uuid.v4().toString(),
            name,
            type,
            price: parseFloat(price.replace(',','.')),
            icon: type,
            quantity,            
            customers: whoConsumed,
        }

        onAdd(newItem);
        clearInputs();
    }

    const splitHandler = (customerID: string) => {
        if(whoConsumed.includes(customerID)){
            setWhoConsumed(oldArray => oldArray.filter(id => id != customerID))
        } else {
            setWhoConsumed(oldArray => [...oldArray, customerID]);
        }
    }

    const changePriceHandler = (value: string) => {
        if(!value) setPrice('');
        else setPrice(value);
    }

    const everyoneConsumedHandler = () => {
        if(everyoneConsumed){
            setWhoConsumed([]);
        } else {
            setWhoConsumed(customers.map((customer: Customer) => customer.id));
        }
        setEveryoneConsumed(!everyoneConsumed);
    }

    return( 
        <ModalContainer
            height={500}            
            {...props}
        >
            <View style={styles.container}>
                <Input 
                    onChangeText={(text) => setName(text)}
                    placeholder="Nome do item" 
                    style={styles.inputName} 
                />

                <View style={styles.itemType}>
                    <CheckButton 
                        placeholder="Bebida" 
                        status={type == 'drink' ? 'checked' : 'unchecked'}
                        onPress={() => setType('drink')}
                    />
                    <CheckButton 
                        placeholder="Comida" 
                        status={type == 'food' ? 'checked' : 'unchecked'} 
                        onPress={() => setType('food')}
                    />
                    <CheckButton 
                        placeholder="Outro" 
                        status={type == 'other' ? 'checked' : 'unchecked'} 
                        onPress={() => setType('other')}
                    />
                </View>

                <View style={styles.priceArea}>
                    <PriceInput                
                        value={price.toString()}        
                        onChangeText={text => changePriceHandler(formatPriceInput(text))} 
                        placeholder="00,00"
                        onFocus={() => setPrice('')}
                        clearTextOnFocus
                        editable
                    />

                    <View>
                        <QuantityInput
                            value={quantity}
                            onChangeValue={(newQuantity) => setQuantity(newQuantity)}
                        />
                    </View>
                </View>

                <View style={styles.aboveContainer}>
                    <Text style={styles.text}>Dividir entre:</Text>

                    <CheckButton 
                        placeholder='Todos'
                        status={everyoneConsumed ? 'checked' : 'unchecked'}
                        onPress={everyoneConsumedHandler}
                    />
                </View>

                <EmptyContainer style={{height: 150}}>
                    <FlatList 
                        data={customers}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <FlatListItem 
                                name={item.name} 
                                icon={item.icon}
                                consumed={whoConsumed.includes(item.id.toString())} 
                                noPayTag 
                                onPress={()=> splitHandler(item.id.toString())} 
                            />} 
                        ListFooterComponent={() => <LineDivider />}                       
                        numColumns={4}
                        contentContainerStyle={styles.flatList}
                    />

                </EmptyContainer>

                <View style={styles.addItemButtonArea}>
                    <Button title="Cancelar" onPress={onCancelHandler} />
                    <Button title="Adicionar" onPress={addButtonHandler} />
                </View>
            </View>
        </ModalContainer>
    )
}