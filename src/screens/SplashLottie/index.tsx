import React, {useState } from 'react';
import { Modal } from 'react-native';
import LottieView from 'lottie-react-native';

import { styles } from './styles';

export const SplashLottie = () => {

    const [hasAnimationFinished, setHasAnimationFinished] = useState(false);
    
    const animationFinishedHandler = () => setHasAnimationFinished(true);

    return(
        <Modal             
            visible={!hasAnimationFinished} 
            animationType='fade'
            style={{flex: 1, backgroundColor: 'red'}}
        >
            <LottieView 
                autoPlay
                loop={false}
                style={styles.container}             
                onAnimationFinish={animationFinishedHandler}
                source={require('../../assets/animated-splash.json')}
            />

        </Modal>
    )
}