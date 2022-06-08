import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,       
        justifyContent: 'space-between',         
    },
    header: {        
        flexDirection: 'row',        
        height: 50,        
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerName: {
        fontFamily: theme.fonts.Default400,
        fontSize: 20,
    },
    flatList: {
        margin: 10,        
    },
    mathRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mathArea: {
        marginVertical: 10,        
    },
    rowName: {
        fontFamily: theme.fonts.Default400,
    },
    rowValue: {
        fontFamily: theme.fonts.Default400,
    },
    consumed: {
        fontFamily: theme.fonts.Default400,
        fontSize: 18,
    },
    itemsContainer: {
        height: 150,
        width: '100%',        
        marginTop: 10,
        marginBottom: 20,
    },
    buttonArea: {
        alignItems: 'flex-end',        
    },
    headerTextContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settings: {        
        flexDirection: 'row',        
        alignItems: 'center',
        justifyContent: 'flex-end',        
        width: 50,
        height: 50,        
        flex: 1,
    },
    settingsOptions: {
        position: 'absolute',              
        borderRadius: 5,        
        backgroundColor: 'white',
        right: 20,       
        top: 20,         
        zIndex: 1,        
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    settingsRow: {                
        justifyContent: 'center',        
        marginHorizontal: 15,
        height: 50,                
    }
})