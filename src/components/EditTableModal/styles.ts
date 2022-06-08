import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    nameRow: {        
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    nameInput: {
        width: 200,        
    },
    tableName: {
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
    },
    row: {        
        flex: 1,        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',        
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    buttonArea: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})