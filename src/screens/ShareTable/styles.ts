import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,   
        backgroundColor: theme.colors.GREY_BACKGROUND,     
        justifyContent: 'space-between',
    },
    selectArea: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',        
        marginTop: 20,
    },
    cards: {
        height: 250,        
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardsRow: {
        flex: 1,
        flexDirection: 'row',        
        marginVertical: 20,
    },
    flatList: {
        padding: 10,
    },
    shareButton: {
        flexDirection: 'row',
        backgroundColor: theme.colors.PRIMARY,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom: 20,
    },
    shareButtonText: {
        color: 'white',
        fontFamily: theme.fonts.Default400,
        fontSize: 16,
        marginLeft: 20,
    }
});