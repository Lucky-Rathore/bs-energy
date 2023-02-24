import React, { useState } from 'react';
import { Avatar, Button, Card, RadioButton, Text, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
Parse.serverURL = 'https://parseapi.back4app.com/'



const SelfieScreen = ({ route, navigation }) => {
    const [selfie, setSelfie] = useState(null);
    const [propertyImage, setPropertyImage] = useState(null);

    const { toCapture, selfieKey, propertyImageKey } = route.params;
    

    const saveImage = async (userId, image) => {
        // const query = new Parse.Query('BusinessDetail1');
        // try {
        //     const user = await query.get(userId);
        //     user.set(toCapture, new Parse.File(toCapture + userId + '.png', { base64: image }));
        //     try {
        //         const response = await user.save();
        //         console.log('BusinessDetail1 updated', response);
        //     } catch (error) {
        //         console.error('Error while updating BusinessDetail1', error);
        //     }
        // } catch (error) {
        //     console.error('Error while retrieving object BusinessDetail1', error);
        // }
    }

    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                if (toCapture == selfieKey) setSelfie(result.uri);
                else setPropertyImage(result.uri)
                const userId = await AsyncStorage.getItem('objectId')
                AsyncStorage.setItem(JSON.stringify(toCapture), result.uri);
                saveImage(userId, result.uri)
            }
        }

    };

    if(!selfie) {
        AsyncStorage.getItem(JSON.stringify(selfieKey)).then( i => {
            console.log('getting selfie from async storage: ' + i)
            i ? setSelfie(i) : takePicture();
        }).catch(e => console.error(e));
    }

    if(!propertyImage) {
        AsyncStorage.getItem(JSON.stringify(propertyImageKey)).then( i => {
            console.log('getting property images from async storage: ' + i)
            i ? setPropertyImage(i) : takePicture()                        
        }).catch(e => console.error(e));
        if (!(selfie && propertyImage)) takePicture();
    }


    return (
        <View>
            <View>
                {selfie ?
                    (
                        <View style={[{ marginTop: 30 }]}>
                            <Text style={{
                                "fontStyle": "normal",
                                "fontSize": 14,
                                // "lineHeight": 32,
                                "textTransform": "capitalize",
                                "color": "#6E717C"
                            }}>
                                Selfie *
                            </Text>
                            <Card style={{ margin: 10 }} elevation={5} mode='elevated'>
                                <Card.Cover source={{ uri: selfie }} />
                            </Card>
                            <View style={{ marginTop: 30, alignItems: 'center' }} >
                                <Text onPress={i => takePicture()} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>

                            </View>
                        </View>
                    ) :
                    (null)
                }

                {propertyImage ?
                    (

                        <View style={[{ marginTop: 30 }]}>
                            <Text style={{
                                "fontStyle": "normal",
                                "fontSize": 14,
                                // "lineHeight": 32,
                                "textTransform": "capitalize",
                                "color": "#6E717C"
                            }}>
                                Business Site Photo *
                            </Text>
                            <Card style={{ margin: 10 }} elevation={5} mode='elevated'>
                                <Card.Cover source={{ uri: propertyImage }} />
                            </Card>
                            <View style={{ marginTop: 30, alignItems: 'center' }} >
                                <Text onPress={i => takePicture()} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>

                            </View>
                        </View>
                    ) :
                    (null)
                }
            </View>
        </View>
    );
};


export default SelfieScreen;