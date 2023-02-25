import React, { useState, useRef } from 'react';
import { Button, Card, Text, IconButton, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import * as     ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';
import { Picker } from '@react-native-picker/picker'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
Parse.serverURL = 'https://parseapi.back4app.com/'

export default function BankDetail({ navigation }) {

    const [beneficiaryName, setbeneficiaryName] = useState(null)
    const [bankName, setbankName] = useState(null)
    const [bankAccNumber, setbankAccNumber] = useState('')
    const [bankAccNumber2, setbankAccNumber2] = useState('')
    const [ifscCode, setifscCode] = useState(null)
    const [chequeImage, setChequeImage] = useState(null)

    const banks = ["Select Bank", "Allahabad Bank", "Andhra Bank", "Axis Bank", "Bank of Bahrain and Kuwait", "Bank of Baroda - Corporate Banking", "Bank of Baroda - Retail Banking", "Bank of India", "Bank of Maharashtra", "Canara Bank", "Central Bank of India", "City Union Bank", "Corporation Bank", "Deutsche Bank", "Development Credit Bank", "Dhanlaxmi Bank", "Federal Bank", "ICICI Bank", "IDBI Bank", "Indian Bank", "Indian Overseas Bank", "IndusInd Bank", "ING Vysya Bank", "Jammu and Kashmir Bank", "Karnataka Bank Ltd", "Karur Vysya Bank", "Kotak Bank", "Laxmi Vilas Bank", "Oriental Bank of Commerce", "Punjab National Bank - Corporate Banking", "Punjab National Bank - Retail Banking", "Punjab & Sind Bank", "Shamrao Vitthal Co-operative Bank", "South Indian Bank", "State Bank of Bikaner & Jaipur", "State Bank of Hyderabad", "State Bank of India", "State Bank of Mysore", "State Bank of Patiala", "State Bank of Travancore", "Syndicate Bank", "Tamilnad Mercantile Bank Ltd.", "UCO Bank", "Union Bank of India", "United Bank of India", "Vijaya Bank", "Yes Bank Ltd", "Other"]

    const pickerRef = useRef();

    AsyncStorage.getItem('checkImage').then(i => {
        if (i) { setChequeImage(i); }
    });

    const validate = async () => {
        let s = ''
        if (!(beneficiaryName && beneficiaryName.length > 0)) s += '\n- Benificiary Name'
        if (!(bankAccNumber && bankAccNumber.length > 0)) s += '\n- Bank Number'
        if (!(bankAccNumber2 && bankAccNumber2.length > 0 && bankAccNumber2 === bankAccNumber)) alert('bank account numbers are not same.')
        if (!(ifscCode && ifscCode.length > 0)) s += '\n- IFSC Code'
        if (!chequeImage) s += '\n- Cheque Image'
        if (!(bankName && bankName.length > 0)) s += '\n- Bank'
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
            user.set('bankAccNumber', bankAccNumber)
            user.set('ifscCode', ifscCode)
            console.log(user)
            try {
                const response = await user.save();
                navigation.navigate('ThankScreen');
                console.log('BusinessDetail1 updated', response);
            } catch (error) {
                console.error('Error while updating BusinessDetail1', error);
            }
        } catch (error) {
            console.error('Error while retrieving object BusinessDetail1', error);
        }
    }

    const saveImage = async (userId, imageUri) => {
        const query = new Parse.Query('BusinessDetail1');
        try {
            const user = await query.get(userId);
            console.log('chequeImage', chequeImage.substring(0, 50))
            user.set('checkImage', new Parse.File('img.png', { base64: imageUri }));
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
                await AsyncStorage.setItem('checkImage', result.assets[0].uri);
                setChequeImage(result.assets[0].uri);
                const userId = await AsyncStorage.getItem('objectId')
                console.log('userId / object id: ' + userId)
                saveImage(userId, result.assets[0].base64)
            }
        }
    };


    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return (
        <KeyboardAwareScrollView><View style={styles.container}>
            <View style={{}}>

                <View style={{ marginBottom: 5, marginLeft: 15, marginRight: 10 }}>
                    <Text>Enter Beneficiary Name *</Text>
                    <TextInput
                        placeholder="Enter Beneficiary Name"
                        value={beneficiaryName}
                        onChangeText={t => setbeneficiaryName(t)}
                        mode='flat'
                        style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
                    />
                </View>
                <View style={{ marginBottom: 20, marginLeft: 15, marginRight: 10 }}>
                    <Text>Select Bank *</Text>
                    {/* <PickerButton dataItem={banks} ></PickerButton> */}
                    <Picker
                        style={{ height: 30 }}
                        ref={pickerRef}
                        selectedValue={bankName}
                        onValueChange={(itemValue, itemIndex) =>
                            setbankName(itemValue)
                        }>
                        {
                            banks.map(i => <Picker.Item key={i} label={i} value={i} />)
                        }
                    </Picker>
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
                    (<View style={{ marginTop: 5, alignItems: 'center' }}>
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
                <Button style={{ marginTop: 10, backgroundColor: '#00A197' }} mode="contained" onPress={i => { validate() }}>Submit</Button>
            </View>
        </View></KeyboardAwareScrollView>

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
