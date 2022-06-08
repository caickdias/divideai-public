import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',            
    },
    logoContainer: {        
        height: 80,
        width: 80,       
        transform: [{rotate: "-45deg" }]
    },
    row: {
        flex: 1,   
        flexDirection: 'row',        
    },
    button: {
        backgroundColor: theme.colors.SECONDARY,        
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        transform: [{rotate: "45deg" }]
    },
    divideai: {
        flexDirection: 'row',
        position: 'absolute',
        right: 50,        
        alignSelf: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 48,        
        color: 'white',
        fontWeight: 'bold',        
    },
    exclamationMark: {
        color: theme.colors.SECONDARY
    }
})