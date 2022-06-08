const toCurrency = (number: number) => {
    const string = number
        .toString()
        .padStart(4, '0');
    
    const decimal = string.slice(-2);
        
    return string
        .slice(0, -2)
        .concat(`,${decimal}`);                        
}

const formatPriceInput = (value: string) => {
    
    const format = value.replace(/\D/g, '');

    if(value.length>2){
        return format.replace(/([0-9]+)([0-9]{2})/, "$1,$2");
    }
    return format;
}

const formatNumberToPrice = (value: number) => {
         return `R\$${(value || 0).toFixed(2)}`;
}

export {
    toCurrency,
    formatPriceInput,
    formatNumberToPrice,
}