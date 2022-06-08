import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,        
        margin: 28,
        justifyContent: 'space-between',
    },
    header: {
        flex: 2,        
        paddingHorizontal: 20,
    },
    body: {
        flex: 5,
    },
    headerSection1: {
        flex: 7,
        flexDirection: 'row',
        //backgroundColor: 'red',
    },
    headerSection2: {
        flex: 4,
        flexDirection: 'row',
        //backgroundColor: 'green',
    },
    tableNameArea: {
        flex: 4,        
        justifyContent: 'center',
    },
    tableName: {
        fontFamily: theme.fonts.Default400,
        color: 'white',        
        fontSize: 28,
        marginTop: 20,
    },
    tableInfo: {
        fontFamily: theme.fonts.Default400,
        color: 'white',
        fontSize: 12,
    },
    tableInfoArea: {
        flex: 1,        
    },
    tableValueCard: {
        flex: 1,        
        paddingVertical: 10,        
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tableValueCardTitle: {
        fontFamily: theme.fonts.Default400,
        color: 'white',
    },
    tableValueCardValue: {
        fontFamily: theme.fonts.Default400,
        color: theme.colors.SECONDARY,
        fontSize: 16,
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10%',
        paddingHorizontal: 20,
    },
    settings: {
       justifyContent: 'center',       
    }
    

})