import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    header: {
        flex: 2,                               
    },
    body: {
        flex: 5,
        backgroundColor: theme.colors.GREY_BACKGROUND,        
    },
    division1: {
        position: 'absolute',
        top: 60,
        right: 20,
        fontSize: 60,
        color: theme.colors.SECONDARY,
        opacity: 0.2,
    },
    division2: {
        position: 'absolute',
        top: 20,
        left: 30,
        fontSize: 40,
        color: theme.colors.SECONDARY,
        opacity: 0.2,
    },
    dots: {
        position: 'absolute',
        top: 130,
        left: 80,
        fontSize: 40,
        color: theme.colors.SECONDARY,
        opacity: 0.3,
    },
    circle1: {
        position: 'absolute',
        top: -135,
        right: -65,
        backgroundColor: 'black',
        height: 200,
        width: 200,
        borderRadius: 100,
        opacity: 0.1,
    },
    circle2: {
        position: 'absolute',
        top: 120,
        left: -80,
        backgroundColor: 'black',
        height: 200,
        width: 200,
        borderRadius: 100,
        opacity: 0.15,
    },
    circle3: {
        position: 'absolute',
        top: 150,
        left: -90,
        backgroundColor: 'black',
        height: 300,
        width: 300,
        borderRadius: 150,
        opacity: 0.15,
    },
    logo: {
        position: 'absolute',
        top: 20,
        left: '40%',
        opacity: 0.3,
    },    
    content: {
        position: 'absolute',
        //flex: 1,
        width: '100%',
        height: '100%',        
    }
})