import React, { useContext, useState } from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import uuid from 'react-native-uuid';

import AppContext from '../../../context/contexts';
import { Customer } from '../../../models/Customer';

import { AddCustomersModal } from '../../../components/AddCustomersModal';
import { CustomerDetailsModal } from '../../../components/CustomerDetailsModal';

import { LineDivider } from '../../../components/LineDivider';
import { AddIconItem } from '../../../components/AddIconItem';
import { FlatListItem } from '../../../components/FlatListItem';

type RenderProps = {
    item: Customer;
    index: number;
}

type Props = {
    addButton?: boolean;
    paymentHandler?: boolean
}

const add: Customer = {
    id: uuid.v4(),
    name: 'adicionar',
    toPay: 0,
    hasPaid: false,
    icon: 'add',
}

export const CustomersList = ({ addButton=false, paymentHandler=false } : Props) => {

    const { store, addCustomers, setCustomers, deleteCustomer } = useContext(AppContext);
    const { customers, table } = store;
    
    const [addCustomersModal, setAddCustomersModal] = useState(false);
    const [customerDetailsModal, setCustomerDetailsModal] = useState(false);
    
    const [customerDetailsId, setCustomerDetailsId] = useState('');
        
    const renderItem = ({ item, index }: RenderProps) => (
        index == 0 && addButton
        ? <AddIconItem onPress={addCustomerHandler} />
        : <FlatListItem 
                onPress={() => {
                    paymentHandler
                    ? paymentsHandler(item.id.toString())
                    : customerDetailsHandler(item.id.toString())
                }}   
                toPay={item.toPay}              
                name={item.name} 
                hasPaid={item.hasPaid}
                icon={item.icon} 
            />                            
    )
    
    const addCustomerHandler = () => setAddCustomersModal(true); 
    
    const addNewCustomersHandler = ([customer1, customer2, customer3, customer4]: string[]) => {                
        const newCustomers = [customer1, customer2, customer3, customer4]
                .filter(value => value)
                .map(customer => {
                    return {
                        id: uuid.v4(),
                        name: customer,
                        icon: 'person',
                        hasPaid: false,
                        toPay: table.couvert,                    
                    }
                });
        addCustomers(newCustomers);                
        closeModalHandler();               
    }

    const customerDetailsHandler = (id: string) => {        
        setCustomerDetailsId(id);
        setCustomerDetailsModal(true);
    }

    const deleteCustomerHandler = (id: string) => {
        deleteCustomer(id);               
    }

    const paymentsHandler = (customerID: string) => {                
        const index = customers.findIndex((customer: Customer) => customer.id == customerID);
        customers[index].hasPaid = customers[index].hasPaid ? false : true;
        setCustomers(customers);                
    }

    const closeModalHandler = () => {
        setCustomerDetailsId('');
        setAddCustomersModal(false);   
        setCustomerDetailsModal(false);    
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={[...(addButton ? [add] : []), ...customers] as Customer[]}
                keyExtractor={(item: Customer) => item.id.toString()}
                renderItem={renderItem}                                        
                extraData={customers}
                numColumns={4}
                ItemSeparatorComponent={() => <LineDivider />}
                ListFooterComponent={() => <LineDivider />}
            />

            <AddCustomersModal 
                visible={addCustomersModal}
                onAdd={addNewCustomersHandler}
                onCancel={closeModalHandler}
            />

            <CustomerDetailsModal 
                visible={customerDetailsModal}
                id={customerDetailsId}
                onConfirm={closeModalHandler}
                onPressPayed={() => paymentsHandler(customerDetailsId)}
                onDelete={() => deleteCustomerHandler(customerDetailsId)}
            /> 
        </View>
    );
}

