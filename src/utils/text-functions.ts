import { Table } from "../models/Table"
import { Customer } from "../models/Customer"
import { Item } from "../models/Item";

import { formatNumberToPrice} from './masks';
import { getItemsTotalValue, getServiceFeeTotalValue } from './calculations';

type TableOptionsProps = {
    [couvert: string]: boolean;
    serviceFee: boolean;
    customers: boolean;
    items: boolean;
}

type Props = {
    table: Table;
    customers: Customer[];
    items: Item[];
    selectedOption: 'table' | 'customer';
    tableOptions: TableOptionsProps;
    selectedCustomer: Customer;
}

type NameIdProps = {
    [id: string]: string;
}

const createShareMessage = ({ table, customers, items, selectedOption, tableOptions, selectedCustomer}: Props) => {
    
    //variables initializations
    let namesId = {} as NameIdProps;
    let selectedCustomerItemsInfo = '';
    let name = '';
    let serviceFeeInfo = '';
    let couvertInfo = '';
    let itemsInfo = `Consumo:`;
    let customersInfo = `Pessoas:`;

    //gather namesId object key values
    customers.forEach((customer: Customer) => {
        customersInfo += `\n${customer.name} - ${formatNumberToPrice(customer.toPay)}`;
        namesId[customer.id.toString()] = customer.name;
    });
    name = selectedOption == 'table' ? 'pessoal' : selectedCustomer.name;

    //text messages calculations in variables
    if(selectedOption == 'table'){
        serviceFeeInfo = table.serviceFee > 0 ? `A taxa de serviço foi de ${table.serviceFee}%. ` : `Não teve taxa de serviço.`;
        couvertInfo = table.couvert > 0 ? `O couvert artístico foi R$${table.couvert.toFixed(2)} reais. ` : `Não teve couvert artístico.`;
        items.forEach((item: Item) => {
            itemsInfo += `\n${item.quantity} - ${item.name} (${formatNumberToPrice(item.price)}) por ${
                formatNumberToPrice(item.price * item.quantity)
            }`
        });        
        
        if(table.serviceFee > 0){
            itemsInfo += `\nTaxa de serviço: ${                
                formatNumberToPrice(getServiceFeeTotalValue(table.serviceFee, getItemsTotalValue(items)))
            }`;
        }
        if(table.couvert > 0){
            itemsInfo += `\nCouvert artístico: ${formatNumberToPrice(table.couvert * customers.length)}`;
        }
    }
    else {
        const customerItems = items.filter((item: Item) => item.customers.includes(selectedCustomer.id.toString()));
        selectedCustomerItemsInfo = `\nSua parte foi de ${formatNumberToPrice(selectedCustomer.toPay)} e você consumiu:\n\n`;

        customerItems.forEach((item: Item) => {
            selectedCustomerItemsInfo += 
            `${item.quantity} - ${item.name} ${item.customers.length == 1 ? 'sozinho' : 'com ' + 
                item.customers.map((customerId: string) => {
                    if(customerId != selectedCustomer.id.toString()){
                        return namesId[customerId]
                    }
                })
                .filter(n => n)
                .join(', ')
            } por ${
                formatNumberToPrice(item.price * item.quantity / item.customers.length)
            } (Total: ${formatNumberToPrice((item.price * item.quantity))})\n`;
        });        

        if(table.serviceFee > 0){
            selectedCustomerItemsInfo += `\nTaxa de serviço: ${
                formatNumberToPrice((selectedCustomer.toPay - table.couvert) * (table.serviceFee/ (100 + table.serviceFee)))
            }`;
        }
        if(table.couvert > 0){
            selectedCustomerItemsInfo += `\nCouvert artístico: ${formatNumberToPrice(table.couvert)}`;
        }
    }

    //starts building single message according to options
    let message = `Olá, ${name}!\nEstivemos em ${table.name} e a conta ficou R$${table.totalValue.toFixed(2)}.\n`;
    
    if(selectedOption == 'table'){
        message += tableOptions.serviceFee ? `${serviceFeeInfo}` : '';
        message += tableOptions.couvert ? `${couvertInfo}` : '';                      
        message += tableOptions.items ? `\n\n${itemsInfo}` : '';
        message += tableOptions.customers ? `\n\n${customersInfo}` : '';
    } else {                
        message += `${selectedCustomerItemsInfo}`;
    }    
    
    return message;

}

export {
    createShareMessage,
}