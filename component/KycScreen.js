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


const KycScreen = ({ route, navigation }) => {
    const [image, setImage] = useState(null);
    const { heading, imageKey } = route.params;

    AsyncStorage.getItem(heading).then(i => {
        if (i) {
            console.log('setting image: ' + heading);
            setImage(i);
        }
    });

    const saveImage = async (userId, image) => {
        const query = new Parse.Query('BusinessDetail1');
        try {
            const user = await query.get(userId);
            user.set(imageKey, new Parse.File('img.png', { base64: image }));
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

    const pickImage = async () => {
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
                await AsyncStorage.setItem(heading, result.assets[0].uri);
                const userId = await AsyncStorage.getItem('objectId')
                console.log('userId / object id: ' + userId)
                saveImage(userId, result.assets[0].base64)
                setImage(result.assets[0].uri);
            }
        }
    };


    return (
        <View >
            <View style={{ alignSelf: 'center' }} >
                <Button
                    textColor='#274384'
                    mode='text'
                    style={{ alignSelf: 'flex-start', marginTop: 20, color: 'black' }}
                    labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
                    icon="file-document-outline">
                    {heading}
                </Button>
                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-around' }} >
                    <Button textColor='#274384' icon="radiobox-blank" mode="text">{heading} Number</Button>
                    <Button textColor='#274384' style={{fontWeight:'bold'}} icon="radiobox-marked" mode="text">Upload Image</Button>
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
                <Button style={{ marginTop: 200, backgroundColor: '#00A197' }} mode="contained" onPress={() => navigation.navigate("KycForm")}>Proceed</Button>
            </View>
        </View>
    );
};


export default KycScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    box: {
        backgroundColor: '#ffffff',
        elevation: 5, // or use shadowColor and shadowOffset
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
    }
});