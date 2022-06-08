import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,                  
        marginBottom: 15,    
    },
    text: {
        fontFamily: theme.fonts.Default400,
        fontSize: 15,
    },    
    customerName: {
        fontFamily: theme.fonts.Bold700,
        color: theme.colors.PRIMARY_2,
    },
    toPay: {         
        flex: 1,
        flexDirection: 'row',
    },
    iconArea: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',        
    }
})