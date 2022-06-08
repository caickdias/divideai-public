import { CustomersReducer } from "./CustomersReducer";
import { ItemsReducer } from "./ItemsReducer";
import { TableReducer } from "./TableReducer";

import { Customer } from "../../models/Customer";
import { Item } from "../../models/Item";
import { Table } from "../../models/Table";

type Props = {
    customers: Customer[];
    items: Item[];
    table: Table;
}

type Action = {
    type: string;
    payload: Payload;    
}

type Payload = {
    currentCustomers?: Customer[];    
    currentItems?: Item[];
    currentTable?: Table;
    customers?: Customer[];    
    items?: Item[];
    table?: Table;
    id?: string;
}

const mainReducer = ({ customers, items, table }: Props, action: Action) => {
    return {
        customers: CustomersReducer(customers, action),
        items: ItemsReducer(items, action),
        table: TableReducer(table, action),
    };
}

export default mainReducer;