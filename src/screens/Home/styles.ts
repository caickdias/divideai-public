import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';
//import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container: {
        flex: 1,                       
    },
    appLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 2,                 
    },
    body: {
        flex: 5,                
        justifyContent: 'space-between',
        paddingHorizontal: 20,        
    },
    showCurrentTable: {
        flex: 3,
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    tableInfo1: {
        flex: 5,        
        justifyContent: 'flex-end',
        paddingLeft: 20,            
    },
    tableInfo2: {
        flex: 3, 
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,       
        paddingBottom: 15,                
    },
    tableName: {
        fontFamily: theme.fonts.Default400,
        fontSize: 30,        
        opacity: 0.7,        
        color: 'white',
    },
    tableNOfPeople: {
        fontFamily: theme.fonts.Default400,
        fontSize: 14,
        color: 'white',
    },
    currentPriceText: {
        fontFamily: theme.fonts.Default400,        
        color: 'white',
        fontSize: 14,
        opacity: 0.9,
    },
    tableTotalValue: {
        fontFamily: theme.fonts.Default400,
        color: 'white',
        fontSize: 24,
    },
    text: {
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
    },    
    tablesList: {
        flex: 1,
        margin: 10,        
        marginLeft: 20,
    },
    sectionName: {
        paddingVertical: 20,        
        backgroundColor: theme.colors.GREY_BACKGROUND,                
    },
    sectionNameText: {
        fontFamily: theme.fonts.Bold700,
        color: theme.colors.PRIMARY_2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginBottom: '10%',
    },    
    footerCardsArea: {
        flexDirection: 'row',
    },    
});