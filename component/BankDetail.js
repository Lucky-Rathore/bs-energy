import React, { useState } from 'react';
import { Button, Card, Text, IconButton, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import * as     ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';
import PickerButton from './PickerButton';


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
Parse.serverURL = 'https://parseapi.back4app.com/'

export default function BankDetail({ navigation }) {

    const [beneficiaryName, setbeneficiaryName] = useState(null)
    const [bankName, setbankName] = useState(null)
    const [bankAccType, setbankAccType] = useState(null)
    const [bankAccNumber, setbankAccNumber] = useState(null)
    const [bankAccNumber2, setbankAccNumber2] = useState(null)
    const [ifscCode, setifscCode] = useState(null)
    const [chequeImage, setchequeImage] = useState(null)

    const banks = ['Allahabad Bank', 'Andhra Bank', 'Other']

    AsyncStorage.getItem('checkImage').then(i => {
        if (i) { setchequeImage(i); }
    });

    const validate = async () => {
        let s = ''
        if (!(beneficiaryName && beneficiaryName.length > 0)) s += '\n- Benificiary Name'
        if (!(bankAccNumber && bankAccNumber.length > 0)) s += '\n- Bank Number'
        if (!(bankAccNumber2 && bankAccNumber2.length > 0 && bankAccNumber2.equals(bankAccNumber))) alert('bank account numbers are not same.')
        if (!(ifscCode && ifscCode.length > 0)) s += '\n- IFSC Code'
        if (!chequeImage) s += '\n- Cheque Image'
        if (s === '') saveBankDetails()
        else alert('please validate' + s)

    };

    const saveBankDetails = async () => {
        const query = new Parse.Query('BusinessDetail1');
        try {
            const userId = await AsyncStorage.getItem('objectId');
            const user = await query.get(userId);
            user.set('beneficiaryName', beneficiaryName)
            user.set('bankName', bankName)
            user.set('bankAccType', bankAccType)
            user.set('bankAccNumber', bankAccNumber)
            user.set('bankAccNumber2', bankAccNumber2)
            user.set('ifscCode', ifscCode)
            console.log(user)
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

    const saveImage = async (userId) => {
        // const query = new Parse.Query('BusinessDetail1');
        // try {
        //     const user = await query.get(userId);
        //     user.set('chequeImage', new Parse.File('img.png', { base64: chequeImage }));
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

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                await AsyncStorage.setItem('checkImage', result.uri);
                const userId = await AsyncStorage.getItem('objectId')
                console.log('userId / object id: ' + userId)
                setchequeImage(result.uri);
                saveImage(userId)
            }
        }
    };

    return (

        <View style={styles.container}>
            <View style={{}}>

                <View style={{ marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                    <Text>Enter Beneficiary Name *</Text>
                    <TextInput
                        placeholder="Enter Beneficiary Name"
                        value={beneficiaryName}
                        onChangeText={t => setbeneficiaryName(t)}
                        mode='flat'
                        style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
                    />
                </View>
                <View style={{ marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                    <Text>Select Bank *</Text>
                    <PickerButton dataItem={banks} ></PickerButton>
                </View>
                <View style={{ marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                    <Text>Enter Current Account Number *</Text>
                    <TextInput
                        placeholder="Enter Current Account Number"
                        value={bankAccNumber}
                        onChangeText={t => setbankAccNumber(t)}
                        mode='flat'
                        style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
                    />
                </View>
                <View style={{ marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                    <Text>Confirm Current Account Number *</Text>
                    <TextInput
                        placeholder="Confirm Current Account Number"
                        value={bankAccNumber2}
                        onChangeText={t => setbankAccNumber2(t)}
                        mode='flat'
                        style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
                    />
                </View>
                <View style={{ marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                    <Text>Enter IFSC Code *</Text>
                    <TextInput
                        placeholder="Enter IFSC Code"
                        value={ifscCode}
                        onChangeText={t => setifscCode(t)}
                        mode='flat'
                        style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
                    />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Button
                        textColor='#274384'
                        mode='text'
                        style={{ alignSelf: 'flex-start', color: 'black' }}
                        labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
                        icon="file-document-outline"
                    >
                        Security cheque copy
                    </Button>
                    <Button textColor='#274384' icon="radiobox-marked" mode="text">Should be same as above</Button>
                </View>
                {chequeImage ?
                    (<View style={{ marginTop: 5, alignItems:'center'}}>
                        {/* <Card >
                            <Card.Cover style={{ flexWrap: 'wrap' }}  source={{ uri: chequeImage }} />
                        </Card> */}
                        <Image style={{
                            width: 300,
                            height: 200,
                            resizeMode: 'contain',
                        }} source={{ uri: chequeImage }} ></Image>
                        <View style={{ marginTop: 5, alignItems: 'center' }} >
                            <Text onPress={i => pickImage()} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>

                        </View>
                    </View>)
                    :
                    (<View style={{ alignItems: 'center' }}>
                        <View style={styles.box}>
                            <View>
                                <IconButton
                                    iconColor='#274384'
                                    icon="cloud-upload"
                                    size={30}
                                    onPress={() => pickImage()}
                                />
                            </View>
                            <View>
                                <Text onPress={i => pickImage()} style={{ color: '#274384', fontWeight: 'bold' }} >Click here to upload Again</Text>
                                <Text style={{ color: '#B8BCCA', alignSelf: 'flex-start' }} >Max File Size: 5 Mb</Text>
                            </View>

                        </View>
                    </View>)}

            </View>
            <View>
                <Button style={{ marginTop: 10, backgroundColor: '#00A197' }} mode="contained" onPress={i => { navigation.navigate('ThankScreen') }}>Submit</Button>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        height: 100,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
