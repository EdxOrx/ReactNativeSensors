import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
} from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import RNFS from 'react-native-fs';

function Gallery() {
  const navigation = useNavigation();
  const cacheDir = RNFS.CachesDirectoryPath;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const files = await RNFS.readDir(cacheDir);
        const imageFiles = files.filter((file) => file.isFile() && file.name.endsWith('.jpg'));
        setImages(imageFiles.map((file) => `file://${file.path}`));
      } catch (error) {
        console.error('Error reading cache directory:', error);
      }
    };

    fetchImages();
  }, [cacheDir]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No images found</Text>}
      />
      <View style={styles.buttonFloat}>
        <Button
          title="Camera"
          color="#2a9df4"
          accessibilityLabel="Camera"
          onPress={() => navigation.navigate('Vision')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonFloat: {
    position:'absolute',
    bottom:0,
    alignSelf:'flex-end',
    marginBottom: 100,
    paddingRight: 30,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default Gallery;
