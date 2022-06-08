import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,        
        padding: 20,        
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.SECONDARY,
    },
    tableInfoContainer: {                
        padding: 20,
        marginVertical: '10%',
        borderRadius: 10,        
        minHeight: '15%',        
        minWidth: 250,
        backgroundColor: theme.colors.PRIMARY_2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 10,        
    },
    tableName: {
        fontFamily: theme.fonts.Bold700,
        fontSize: 28,
        color: 'white',
    },
    tableInfoArea: {        
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,           
    },
    tableInfoRow: {
        flexDirection: 'row',
    },
    tableInfo: {
        flex: 1,                    
        height: 120,                
        alignItems: 'center',            
    },
    infoCircle: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderTopLeftRadius: 0,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.PRIMARY_2,
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 10,
    },
    infoText: {
        fontFamily: theme.fonts.Bold700,
        fontSize: 16,
    },
    infoIconText: {
        fontFamily: theme.fonts.Default400,
        color: 'white',
        fontSize: 24,
    },
    tableCards: {
        flexDirection: 'row',      
        marginBottom: '5%',       
    },
    list: {                
        marginBottom: 20,  
        height: 150,
        padding: 10,      
    },
    settings: {        
        position: 'absolute',
        top: 10,
        right: 10,        
    },
    settingsOptions: {
        position: 'absolute',    
        minWidth: 120,                  
        borderRadius: 5,        
        backgroundColor: 'white',
        right: 5,       
        top: 5,         
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
