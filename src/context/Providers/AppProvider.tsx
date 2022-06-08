import React, { ReactNode, useReducer } from 'react';
import AppContext from '../contexts';

import reducers from '../Reducers/';

import { Customer } from '../../models/Customer';
import { Item } from '../../models/Item';
import { Table } from '../../models/Table';

import { ADD_CUSTOMERS, RESET, DELETE_CUSTOMER, CALC_CUSTOMERS_TOPAY, SET_CUSTOMERS } from '../Actions/CustomersActions';
import { ADD_ITEM, DELETE_ITEM, REMOVE_CUSTOMER_FROM_ITEMS, SET_ITEMS } from '../Actions/ItemsActions';
import { CALC_TABLE, CREATE_TABLE, SET_TABLE } from '../Actions/TableActions';

import * as DB from '../../services/db';

type Props = {
    children: ReactNode;
}

type Store = {
    customers: Customer[];
    items: Item[];
    table: Table;
};

const initialState: Store = {
    customers: [],
    items: [],
    table: {},
};

export const AppProvider = ({ children }: Props) => {
    
    const [store, dispatch] = useReducer(reducers, initialState);      
    const { table: currentTable, customers: currentCustomers, items: currentItems } = store;  

    const setInitialStore = (customers: Customer[], items: Item[], table: Table) => {
        dispatch({ type: SET_CUSTOMERS, payload: { customers } });
        dispatch({ type: SET_ITEMS, payload: { items } });
        dispatch({ type: SET_TABLE, payload: { table } });        
    }        

    const addCustomers = (customers: Customer[]) => {            
        dispatch({ type: ADD_CUSTOMERS, payload: { customers } });         
    }

    const addItem = (items: Item[]) => {
        dispatch({ type: ADD_ITEM, payload: { items }});
    }

    const deleteItem = (id: string) => {
        dispatch({ type: DELETE_ITEM, payload: { id }})
    }

    const setItems = (items: Item[]) => {
        dispatch({ type: SET_ITEMS, payload: { items }});
    }

    const createTable = (table: Table) => {
        dispatch({ type: CREATE_TABLE, payload: { table }});
    }

    const deleteCustomer = (id: string) => {
        dispatch({ type: DELETE_CUSTOMER, payload: { id } })
        dispatch({ type: REMOVE_CUSTOMER_FROM_ITEMS, payload: { id }})
    }

    const setCustomers = (customers: Customer[]) => {        
        dispatch({ type: SET_CUSTOMERS, payload: { customers } });        
    }

    const calcCustomersToPay = (table: Table) => {        
        dispatch({ type: CALC_CUSTOMERS_TOPAY, payload: { table, currentItems }});
    }

    const setTable = (table: Table) => {
        dispatch({ type: SET_TABLE, payload: { table }})
    }

    const calcTableTotal = () => {
        dispatch({ type: CALC_TABLE, payload: { currentCustomers, currentItems }})
    }

    const endTable = () => {        
        dispatch({ type: RESET, payload: {}});
    }

    return(
        <AppContext.Provider 
            value={{ 
                store, 
                addCustomers, 
                setCustomers, 
                calcCustomersToPay,
                setTable, 
                addItem, 
                deleteItem,
                setItems,
                createTable, 
                calcTableTotal,
                deleteCustomer,
                setInitialStore, 
                endTable,
             }}
        >
            {children}
        </AppContext.Provider>
    )
}