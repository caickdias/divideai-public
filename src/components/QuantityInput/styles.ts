import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',        
        backgroundColor: 'white',
        width: 100,    
        height: 30,        
        borderRadius: 30,        
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,   
    },    
    changeQuantity: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityArea: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: theme.fonts.Default400,
        fontSize: 20,
    }
})