import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    inputName: {
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
        height: 30,        
    },
    itemType: {        
        height: 40,                
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',        
        flexDirection: 'row',
    },
    priceArea: {        
        height: 40,                
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
    },
    addItemButtonArea: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flatList: {
        margin: 10,
    },
    aboveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})