import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraTest() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });

      if (!result.canceled) {
        setSelectedImage(result.base64);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Image Picker Camera Example</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Button title="Take a picture" onPress={openCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
