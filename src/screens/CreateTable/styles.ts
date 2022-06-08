import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 28,
    },
    containerTop: {        
        flexDirection: 'column',        
        alignItems: 'flex-start',
        height: 173,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',        
    },
    topRow: {
        flex: 1,                
        justifyContent: 'center',
        width: '100%',
    },
    midRow: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',                
    },
    nameInput: {        
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
    },
    text: {
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
    },
    inputArea: {
        flexDirection: 'row',      
        alignItems: 'center',          
    },
    buttonArea: {
        flexDirection: 'row',
        alignItems: 'center',        
        justifyContent: 'space-between',
    },
    flatList: {                                       
        margin: 10,                         
    },
    addCustomer: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-between',
    },
    addCustomerInputArea: {
        flex: 1,        
        justifyContent: 'space-around',
    },
    addCustomerButtonArea: {        
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',        
    },
})