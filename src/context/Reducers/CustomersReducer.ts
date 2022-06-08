import { Customer } from "../../models/Customer";
import { ADD_CUSTOMERS, SET_CUSTOMERS, DELETE_CUSTOMER, CALC_CUSTOMERS_TOPAY, RESET } from "../Actions/CustomersActions";

import { InsertCustomers, DeleteCustomers } from "../../services/db";
import { Item } from "../../models/Item";
import { Table } from "../../models/Table";
import { getServiceFeeTotalValue } from "../../utils/calculations";

type State = Customer[];

type Actions = {
    type: string;
    payload: Payload;
}

type Payload = {
    id?: string;
    customers?: Customer[];
    table?: Table;
    currentItems?: Item[];
}

export const CustomersReducer = (state: State, actions: Actions) => {
    const { id, customers, table, currentItems: items } = actions.payload;
            
    switch(actions.type){
        case ADD_CUSTOMERS:                    
            return addCustomer(state, customers);
        case SET_CUSTOMERS:                            
            return setCustomers(customers);
        case DELETE_CUSTOMER:
            return deleteCustomer(state, id);
        case CALC_CUSTOMERS_TOPAY:
            return calcCustomersToPay(state, table, items);
        case RESET:
            DeleteCustomers();
            return [];
        default:          
            InsertCustomers([...state]);  
            return state;
    }    
}

const addCustomer = (state: State, customers: Customer[] | any) => {        
    InsertCustomers([...state, ...customers ]);  
    return [...state,...customers];    
}

const setCustomers = (customers: Customer[] | any) => {        
    InsertCustomers([...customers]);    
    return [...customers];
}

const deleteCustomer = (state: State, id: string | any) => {
    const updatedCustomers = state.filter((customer: Customer) => customer.id != id);
    InsertCustomers(updatedCustomers);
    return updatedCustomers;
}

const calcCustomersToPay = (state: State, table: Table | any, items: Item[] | any) => {    
    
    if(table){
        const updatedCustomers = state.map((customer: Customer) => {
            const toPay = items.reduce((total: number, item: Item) => {
                if(item.customers.includes(customer.id.toString())) return total + ((item.price * item.quantity) / item.customers.length);
                return total;
            }, 0);
            return {
                ...customer,
                toPay: toPay 
                + getServiceFeeTotalValue(table.serviceFee, toPay)
                + table.couvert                 
            }
        })
        InsertCustomers(updatedCustomers);    
        return updatedCustomers;
    }
    InsertCustomers(state);
    return state;
}
