import React, {useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Modal} from 'react-native';
import { Button } from '../../components/Button';

import { styles } from './styles';

export const AnimatedSplash = () => {

    const [activated, setActivated] = useState(false);
    const [activated2, setActivated2] = useState(false);
    const [activated3, setActivated3] = useState(false);
    const [activated4, setActivated4] = useState(false);
    const [activated5, setActivated5] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));    
    const [animatedValue2, setAnimatedValue2] = useState(new Animated.Value(0));    
    const [animatedValue3, setAnimatedValue3] = useState(new Animated.Value(0));    
    const [animatedValue5, setAnimatedValue5] = useState(new Animated.Value(0));    
    const [endAnimation, setEndAnimation] = useState(false);

    const [vis, setVis] = useState(true);

    useEffect(() => {                
        setActivated2(!activated2);
        setActivated3(!activated2);
        firstAnim();        
        setActivated4(!activated4);        
    },[]);

    useEffect(() => {
        setTimeout(() => {
            setActivated3(!activated3);
            secondAnim();            
        }, 2000);
        setTimeout(() => {
            setVis(false);
        }, 4000);
    }, [activated4]);

    const firstAnim = () => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: activated ? 0 : 1,
                duration: 700,
                useNativeDriver: false,
            }),
            Animated.timing(animatedValue2, {
                toValue: activated2 ? 0 : 1,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(animatedValue3, {
                toValue: activated3 ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
            })
        ]).start();
    }

    const secondAnim = () => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: activated ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
            }),            
            Animated.timing(animatedValue3, {
                toValue: activated3 ? 0 : 1,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(animatedValue5, {
                toValue: activated5 ? 0 : 1,
                duration: 2500,
                useNativeDriver: false,
            })
        ]).start();        
    }

    const animatedStyles = {
        transform: [{
            rotate: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['135deg', '675deg']
            })
        }],
        scale: [{
            scale: animatedValue2.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.3, 1],
            })
        }],
        thirdStep: {
            opacity: animatedValue3.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }),
            transform: [{
                translateX: animatedValue3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100]    
                })
            }]
        },
        fourthStep: {
            opacity: animatedValue3.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
        }, 
        endScale: [{
            scale: animatedValue5.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 300],
            })
        }],
    }

    return(
        <Modal visible={vis} animationType='fade'>
            <Animated.View style={[styles.container, {transform: animatedStyles.endScale}]}>
                <Animated.View style={ {transform: animatedStyles.thirdStep.transform}}>
                    <Animated.View style={[styles.logoContainer, {transform: animatedStyles.transform}]}>
                        <View style={styles.row}>
                            <Animated.View style={[styles.button, {transform: animatedStyles.scale}]}>
                                <Text style={styles.buttonText}>÷</Text>
                            </Animated.View>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>x</Text>
                            </View>                    
                        </View>                
                        <View style={styles.row}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </View>
                            <Animated.View style={[styles.button, {opacity: animatedStyles.thirdStep.opacity}]}>
                                <Text style={styles.buttonText}>-</Text>
                            </Animated.View>                    
                        </View>                                            
                    </Animated.View>
                </Animated.View>

                <Animated.View style={[styles.divideai, animatedStyles.fourthStep]}>
                    <Text style={styles.title}>
                        Divide aí
                    </Text>
                    <Text style={[styles.title, styles.exclamationMark]}>
                        !
                    </Text>                
                </Animated.View>
            </Animated.View>
        </Modal>
    )
}