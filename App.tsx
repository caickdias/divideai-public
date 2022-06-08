import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';

import { AppProvider } from './src/context/Providers/AppProvider';

import AppLoading from 'expo-app-loading';
import { useFonts, RobotoSlab_400Regular, RobotoSlab_700Bold } from '@expo-google-fonts/roboto-slab';

import { SplashLottie } from './src/screens/SplashLottie';
import { Routes } from './src/routes';

export default function App() {

  const [splash, setSplash] = useState(false);

  let [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
  })

  if(!fontsLoaded) {
    return <></>;
  } 

  return (     
    <AppProvider>  
      <SplashLottie />          
      <Routes />    
    </AppProvider>    
  );
}