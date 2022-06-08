import { Table } from '../models/Table';
import { Customer } from '../models/Customer';
import { Item } from '../models/Item';

const getTableTotalValue = (table: Table, customers: Customer[], items: Item[]) => {
   
    return items.reduce((total: number, item: Item) => {
        return total + (item.price * item.quantity);
    }, 0) 
    * (1 + (table.serviceFee ? (table.serviceFee / 100) : 0))
    + (customers.length * table.couvert);    
}

const getItemsTotalValue = (items: Item[]) => {
    return items.reduce((total: number, item: Item) => total + (item.price * item.quantity), 0);
}
const getCouvertTotalValue = (couvert: number, customers: Customer[]) => couvert * customers.length;

const getServiceFeeTotalValue = (serviceFee: number, totalValue: number) => (serviceFee/100) * totalValue;

const getValueWithServiceFee = (value: number, serviceFee: number) => value + (value * ((serviceFee/100) || 0));

const getPaidCustomers = (customers: Customer[]) => {
     return customers.reduce((total: number, customer: Customer) => {
        return customer.hasPaid ? total + customer.toPay : total;
     }, 0);
}

const getAllTablesPriceAverage = (tables: Table[]) => {
    return (tables.reduce((total, table) => (total + table.totalValue), 0) 
            / tables.length) 
            || 0
}

const getAllCustomersPriceAverage = (tables: Table[]) => {
    
    return getAllTablesPriceAverage(tables)
    /
    (tables.reduce((totalCustomers, table) => (
        totalCustomers + table.customers.length
        )
    , 0));
}

const checkEmptyCustomerItems = (items: Item[]) =>  items.some((item: Item) => item.customers.length == 0);

export {
    getItemsTotalValue,
    getCouvertTotalValue,
    getServiceFeeTotalValue,
    getTableTotalValue,
    getPaidCustomers,
    getValueWithServiceFee,
    checkEmptyCustomerItems,
    getAllTablesPriceAverage,
    getAllCustomersPriceAverage,
}