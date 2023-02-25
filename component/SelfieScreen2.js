import React, { useState } from 'react';
import { Avatar, Button, Card, RadioButton, Text, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
Parse.serverURL = 'https://parseapi.back4app.com/'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const SelfieScreen2 = ({ route, navigation }) => {
    const [image, setImage] = useState(null);
    const [imageBack, setImageBack] = useState(null);


    AsyncStorage.getItem('selfieImage').then(i => {
        if (i) {
            console.log('setting image: ' + 'aadharImage');
            setImage(i);
        }
    });

    AsyncStorage.getItem('propertyImage').then(i => {
        if (i) {
            console.log('setting image: ' + 'aadharImageBack');
            setImageBack(i);
        }
    });

    const saveImage = async (imageKey, userId, image) => {
        const query = new Parse.Query('BusinessDetail1');
        try {
            const user = await query.get(userId);
            // console.log('image', image)
            user.set(imageKey, new Parse.File('img.jpeg', { base64: image }));
            try {
                const response = await user.save();
                console.log('BusinessDetail1 updated', response);
            } catch (error) {
                console.error('Error while updating BusinessDetail1', error);
            }
        } catch (error) {
            console.error('Error while retrieving object BusinessDetail1', error);
        }
    }

    const pickImage = async (backImage = false) => {
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
                console.log(' result.assets[0].uri', result.assets[0].uri )
                console.log(' result.assets[0].base64', result.assets[0].base64.substring(0,50))
                await AsyncStorage.setItem(backImage ? 'propertyImage' : 'selfieImage', result.assets[0].uri);
                const userId = await AsyncStorage.getItem('objectId')
                console.log('userId / object id: ' + userId)
                saveImage(backImage ? 'propertyImage' : 'selfieImage', userId, result.assets[0].base64)
                backImage ? setImageBack(result.assets[0].uri) : setImage(result.assets[0].uri)
            }
        }


    };


    return (
        <View >
            <View style={{ alignSelf: 'center' }} >
                {/* <Button
                    textColor='#274384'
                    mode='text'
                    style={{ alignSelf: 'flex-start', marginTop: 20, color: 'black' }}
                    labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
                    icon="file-document-outline">
                    Aadhar Image
                </Button> */}
                {/* <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-around' }} >
                    <Button textColor='#274384' icon="radiobox-blank" mode="text">Aadhar Number</Button>
                    <Button textColor='#274384' style={{ fontWeight: 'bold' }} icon="radiobox-marked" mode="text">Upload Image</Button>
                </View> */}
                <View>
                    <Text style={{
                        "fontStyle": "normal",
                        "fontWeight": "400",
                        "fontSize": 16,
                        "color": "#6E717C",
                        marginTop: 10
                    }}>Slefie *</Text>
                </View>
                {image ?
                    (<View style={{ marginTop: 30 }}>

                        <Card>
                            <Card.Cover source={{ uri: image }} />
                        </Card>
                        <View style={{ marginTop: 30, alignItems: 'center' }} >
                            <Text onPress={i => pickImage()} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>

                        </View>
                    </View>)
                    :
                    (<View style={styles.container}>
                        <View style={styles.box}>
                            <View>
                                <IconButton
                                    iconColor='#274384'
                                    icon="cloud-upload"
                                    size={70}
                                    onPress={() => pickImage()}
                                />
                            </View>
                            <View>
                                <Text onPress={i => pickImage()} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>
                                <Text style={{ color: '#B8BCCA', alignSelf: 'flex-start' }} >Max File Size: 5 Mb</Text>
                            </View>

                        </View>
                    </View>)}

                <View  >
                    <Text style={{
                        "fontStyle": "normal",
                        "fontWeight": "400",
                        "fontSize": 16,
                        "color": "#6E717C"
                    }}>Business Site Photo *</Text>
                </View>
                {imageBack ?
                    (<View style={{ marginTop: 30 }}>

                        <Card>
                            <Card.Cover source={{ uri: imageBack }} />
                        </Card>
                        <View style={{ marginTop: 30, alignItems: 'center' }} >
                            <Text onPress={i => pickImage(true)} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>
                        </View>
                    </View>)
                    :
                    (<View style={styles.container}>
                        <View style={styles.box}>
                            <View>
                                <IconButton
                                    iconColor='#274384'
                                    icon="cloud-upload"
                                    size={70}
                                    onPress={() => pickImage(true)}
                                />
                            </View>
                            <View>
                                <Text onPress={i => pickImage(true)} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>
                                <Text style={{ color: '#B8BCCA', alignSelf: 'flex-start' }} >Max File Size: 5 Mb</Text>
                            </View>

                        </View>
                    </View>)}
                <Button style={{ marginTop: 50, backgroundColor: '#00A197' }} mode="contained" onPress={() => navigation.navigate("KycForm")}>Proceed</Button>
                <Button icon='lock' style={styles.text01}>Your Information is safe with us.</Button>
            </View>
        </View>
    );
};


export default SelfieScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    box: {
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        height: 200,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text01: {
        marginTop: 5,
        alignSelf: 'center',
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontSize": 10,
        "color": "#6F7482"
    }
});