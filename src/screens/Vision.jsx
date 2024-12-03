/* eslint-disable react-native/no-inline-styles */
import React,{useRef, useState,useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
} from 'react-native';
import {
    useCameraDevice,
    Camera,
} from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';

function Vision(){
    const [cameraPermission, setCameraPermission] = useState(null);
    const device = useCameraDevice('back');
    const camera = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [position, setPosition] = useState(null);


    const checkCameraPermission = async () => {
      const status = await Camera.getCameraPermissionStatus();

      if (status === 'granted') {
        setCameraPermission(true);
      } else if (status === 'notDetermined') {
        const permission = await Camera.requestCameraPermission();
        setCameraPermission(permission === 'authorized');
      } else {
        setCameraPermission(false);
      }
    };

    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (pos) => {
          setPosition(JSON.stringify(pos));
        },
        (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        { enableHighAccuracy: true }
      );
    };

    useEffect(() => {
      checkCameraPermission();
      getCurrentPosition();
    }, []);

    const takePhoto = async () => {
      try {
        if (!camera.current) {
          console.error('Camera reference not available.', camera);
          return;
        }

        const photo = await camera.current.takePhoto();
        console.log(photo);

        if (photo) {
          setCapturedPhoto(`file://${photo.path}`);
          setShowPreview(true);
        } else {
          console.error('Photo captured is undefined or empty.');
        }
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    };

    const confirmPhoto = () => {
      console.log('Photo confirmed:', capturedPhoto);
      setShowPreview(false);
    };

    const retakePhoto = () => {
      setCapturedPhoto(null);
      setShowPreview(false);
    };

    return (
      <View style={{ flex: 1 }}>
        {cameraPermission && device !== null &&
            <Camera
              style={{ flex: 1 }}
              device={device}
              isActive={true}
              ref={camera}
              photo={true}
              video={true}
            />
        }
        {showPreview && capturedPhoto ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: capturedPhoto }}
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Retake" onPress={retakePhoto} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button title="Take Photo" onPress={takePhoto} />
          <Text>{position}</Text>
      </View>
      )}
    </View>
    );
}

export default Vision;
