import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
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
})