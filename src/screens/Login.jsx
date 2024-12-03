//*****Please  install the following dependencies before running this project
//npm install react-native-biometrics react-native-linear-gradient     **********


import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

function Login(props){
  const [isFingerEnabled, setIsFingerEnabled] = useState(false);
  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Ingresa tu huella' });

      if (success) {
        props.setLogin(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Fallo el inicio de sesion');
      return false;
    }
  };

  useEffect(() => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;

        if (available && biometryType === BiometryTypes.Biometrics) {
          setIsFingerEnabled(true);
        } else {
          setIsFingerEnabled(false);
        }
      })
      .catch((_error) => {
        setIsFingerEnabled(false);
      });
  }, []);

  return (
    <View style={styles.container}>
        <Button
          title="Iniciar sesion con huella"
          onPress={handleBiometricAuth}/>
        <Text style={styles.fingerAvailableText}>
          {isFingerEnabled ?
            'Lector de huella disponible' :
            'Lector the huella NO disponible'}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  fingerAvailableText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default Login;
