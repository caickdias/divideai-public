import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CURRENT_TABLE } from '../configs/database';
import { CUSTOMERS_COLLECTION } from '../configs/database';
import { ITEMS_COLLECTION } from '../configs/database';
import { TABLE_HISTORY } from '../configs/database';

import { Table, TableHistory } from '../models/Table';
import { Customer } from "../models/Customer";
import { Item } from "../models/Item";

const CreateTable = async (table: Table) => {
    try{
        await AsyncStorage.setItem(CURRENT_TABLE, JSON.stringify(table));
    } catch(error){

    }
}

const LoadCurrentTable = async () => {
    try{        
        const table = await AsyncStorage.getItem(CURRENT_TABLE);
        return table ? JSON.parse(table) : {};
    } catch(error){

    }
}

const DeleteTable = async () => {
    try{
        await AsyncStorage.removeItem(CURRENT_TABLE);
    } catch(error){
        console.log("db delete table error");
        console.log(error);
    }
}

const InsertCustomers = async (customers: Customer[]) => {
    try{
        await AsyncStorage.setItem(CUSTOMERS_COLLECTION, JSON.stringify(customers));
    } catch(error){
        console.log("db insert customers error");
        console.log(error);
    }
}

const LoadCustomers = async () => {
    try{
        const customers = await AsyncStorage.getItem(CUSTOMERS_COLLECTION);
        return customers ? JSON.parse(customers) : [];        
    } catch(error){
        console.log("db load customers error");
        console.log(error);
    }
}

const DeleteCustomers = async () => {
    try{
        await AsyncStorage.removeItem(CUSTOMERS_COLLECTION);
    } catch(error){
        console.log("db delete customers error");
        console.log(error);
    }
}

const InsertItems = async (items: Item[]) => {
    try{
        await AsyncStorage.setItem(ITEMS_COLLECTION, JSON.stringify(items));
    } catch(error){
        console.log("db insert items erro");
        console.log(error);
    }
}

const LoadItems = async () => {
    try{
        const items = await AsyncStorage.getItem(ITEMS_COLLECTION);
        return items ? JSON.parse(items) : [];
    } catch(error){
        console.log("db load items error");
        console.log(error);
    }
}

const DeleteItems = async () => {
    try{
        await AsyncStorage.removeItem(ITEMS_COLLECTION);
    } catch(error){
        console.log("db delete items error");
        console.log(error);
    }
}

const AddToTableHistory = async (customers: Customer[], items: Item[], table: TableHistory) => {                
    const tableHistory = await LoadTableHistory();    
    const saveTable = {
        ...table,
        customers: [...customers],
        items: [...items],
    }    
    tableHistory.push(saveTable);    
    try{        
        await AsyncStorage.setItem(TABLE_HISTORY, JSON.stringify([...tableHistory]));
    } catch(error){
        console.log("error saving to history");
        console.log(error);
    }
}

const LoadTableHistory = async () => {
    try{
        const tables = await AsyncStorage.getItem(TABLE_HISTORY);
        /*await AsyncStorage.removeItem(TABLE_HISTORY);                
        await AsyncStorage.removeItem(CUSTOMERS_COLLECTION);                
        await AsyncStorage.removeItem(ITEMS_COLLECTION);                
        await AsyncStorage.removeItem(CURRENT_TABLE);                */
        return tables ? JSON.parse(tables) : [];
    } catch(error) {
        console.log("error loading table history");
        console.log(error);
    }
}

const DeleteTableFromHistory = async (id: string) => {
    const tableHistory = await LoadTableHistory();
    const deletedTable = tableHistory.filter((table: TableHistory) => table.id != id);

    try{
        await AsyncStorage.setItem(TABLE_HISTORY, JSON.stringify(deletedTable));        
    } catch(error){
        console.log("error deleting table");
        console.log("error");
    }
}


export { 
    CreateTable,
    InsertCustomers,
    InsertItems,
    LoadCurrentTable,
    LoadCustomers,   
    LoadItems,
    DeleteTable,
    DeleteCustomers,
    DeleteItems,
    AddToTableHistory,
    LoadTableHistory,
    DeleteTableFromHistory
}