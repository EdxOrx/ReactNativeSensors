import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import type { CameraPermissionStatus } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';



function Permissions(): React.ReactElement {

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to{'\n'}Vision Camera.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Permissions;
