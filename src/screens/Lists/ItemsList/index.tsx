import React, { useState, useContext } from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import uuid from 'react-native-uuid';

import AppContext from '../../../context/contexts';
import { Item } from '../../../models/Item';

import { LineDivider } from '../../../components/LineDivider';
import { AddIconItem } from '../../../components/AddIconItem';
import { FlatListItem } from '../../../components/FlatListItem';

import { AddItemModal } from '../../../components/AddItemModal';
import { ItemDetailsModal } from '../../../components/ItemDetailsModal';

type RenderProps = {
    item: Item;
    index: number;
}

const add = {
    id: uuid.v4(),
    name: 'adicionar',
    toPay: 0,
    icon: 'add',
}

export const ItemsList = () => {

    const { store, addItem, deleteItem, setItems } = useContext(AppContext);
    const { items } = store;

    const [itemDetailsId, setItemDetailsId] = useState('');

    const [itemDetailsModal, setItemDetailsModal] = useState(false);
    const [addItemsModal, setAddItemsModal] = useState(false);
    
    const renderItem = ({ item, index }: RenderProps) => (
        index == 0 
        ? <AddIconItem onPress={() => setAddItemsModal(true)} />
        : <FlatListItem 
                onPress={() => itemDetailsHandler(item.id)}   
                name={item.name} 
                toPay={item.quantity * item.price}  
                quantity={item.quantity}            
                icon={item.icon} 
                alert={item.customers.length <= 0}
            />                            
    )

    const addNewItemHandler = (newItem: Item) => {        
        addItem([newItem]);              
        closeModalHandler();
    }

    const itemDetailsHandler = (id: string) => {
        setItemDetailsId(id);
        setItemDetailsModal(true);        
    }

    const deleteItemHandler = (id: string) => {
        deleteItem(id);
    }

    const editItemHandler = (id: string, quantity: number, customers: string[]) => {                        
        const index = items.findIndex((item: Item) => item.id == id);
        items[index].quantity = quantity;
        items[index].customers = customers;
        setItems(items);
        closeModalHandler();
    }

    const closeModalHandler = () => { 
        setItemDetailsId('');       
        setAddItemsModal(false);        
        setItemDetailsModal(false);        
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={[add, ...items] as Item[]}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}                                        
                extraData={items}
                numColumns={4}
                ItemSeparatorComponent={() => <LineDivider />}
                ListFooterComponent={() => <LineDivider />}
            />

            <AddItemModal
                visible={addItemsModal}
                onAdd={addNewItemHandler}
                onCancel={closeModalHandler}                        
            />                           

            <ItemDetailsModal
                visible={itemDetailsModal}
                id={itemDetailsId}
                onCancel={closeModalHandler}
                onDelete={() => deleteItemHandler(itemDetailsId)}
                onConfirm={editItemHandler}
            /> 
        </View>
    );
}

