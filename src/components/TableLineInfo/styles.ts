import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    lineContainer: {
        flex: 1,                
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',    
        marginBottom: 15,                    
    },
    text: {
        fontFamily: theme.fonts.Default400,
        fontSize: 18,
    },
    numberOfPeople: {         
        flex: 1,       
        flexDirection: 'row',                
    },

    iconContainer: {        
        justifyContent: 'center',
        alignItems: 'center',    
        backgroundColor: theme.colors.SECONDARY,    
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 20,
    },
    tableFirstLetter: {
        fontFamily: theme.fonts.Bold700,
        color: theme.colors.PRIMARY,
        fontSize: 24,
    },
    column: {                        
        flexDirection: 'row',
        justifyContent: 'space-between',                     
    },
    tableInfo: {        
        justifyContent: 'center',    
        flex: 5,    
    },
    tableName: {
        fontFamily: theme.fonts.Bold700,
        fontSize: 16,
    },
    tableNOfPeople: {
        fontFamily: theme.fonts.Default400,
        fontSize: 14,
    },
    priceContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    price: {
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
    }
})