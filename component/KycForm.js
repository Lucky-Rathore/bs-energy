import React, { useEffect, useState } from 'react';
import { IconButton, MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
Parse.serverURL = 'https://parseapi.back4app.com/'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'grey',
    secondary: 'green',
  },
};

export default function KycForm({ navigation, route }) {

  const [pan, setPan] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [bizPan, setBizPan] = useState(null);
  const [gst, setGst] = useState(null);

  const validate = async () => {
    let s = ''
    let storageKeys = await AsyncStorage.getAllKeys()

    if (!(pan)) s += '\n - Pan Number'
    if (!(gst)) s += '\n - GST Number'
    if (!(aadhar)) s += '\n - Aadhar Number'
    if (!(bizPan)) s += '\n - Pan Number(Business)'

    if (!storageKeys.includes('selfieImage')) s += '\n - Selfie'
    if (!storageKeys.includes('propertyImage')) s += '\n - Business Site photo'
    if (!storageKeys.includes('Pan (Personal)')) s += '\n - Pan (Personal) image'
    if (!storageKeys.includes('aadharImage') || !storageKeys.includes('aadharImageBack')) s += '\n - Aadhar Number image'
    if (!storageKeys.includes('Pan Business')) s += '\n - PAN (Business) image'
    if (!storageKeys.includes('GST Certificate')) s += '\n - GST Certificate image'

    if (s) alert('please provide' + s)
    else {
      saveBizDetails()
      navigation.navigate('BankDetail');
    }

  }

  const saveBizDetails = async () => {
    const query = new Parse.Query('BusinessDetail1');
    try {
      const userId = await AsyncStorage.getItem('objectId');
      const user = await query.get(userId);
      user.set('panNumber', pan);
      user.set('gstNumber', gst);
      user.set('aadharNumber', aadhar);
      user.set('bizAadharNumber', bizPan);
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


  return (

    <KeyboardAwareScrollView>

      <View style={styles.container}>

        <View>
          <Button
            textColor='#274384'
            style={[{ alignSelf: 'flex-start' }]}
            icon="camera"
            mode="text"
            labelStyle={{ fontSize: 16, "fontWeight": "bold", }}
            onPress={() => navigation.navigate('SelfieScreen2', { isProperty: false })}>
            Selfie*
          </Button>
          <Button
            labelStyle={{ fontSize: 16, "fontWeight": "bold", }}
            textColor='#274384'
            style={{ alignSelf: 'flex-start' }}
            icon="camera"
            mode="text"
            onPress={() => navigation.navigate('SelfieScreen2', { isProperty: true })}>
            Business Site Photo*
          </Button>

          <View >
            <Button
              textColor='#274384'
              mode='text'
              style={{ alignSelf: 'flex-start', marginTop: 10, color: 'black' }}
              labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
              icon="file-document-outline">
              PAN (Personal)
            </Button>
            <View style={{ flexDirection: 'row' }} >
              <Button textColor='#274384' style={{ fontWeight: 'bold' }} icon="radiobox-marked" mode="text">PAN Number</Button>
              <Button textColor='#274384' icon="radiobox-blank" style={{ marginLeft: 40 }} mode="text" onPress={() => {
                navigation.navigate('KycScreen', {
                  heading: 'Pan (Personal)',
                  imageKey: 'panImage'
                });
              }}>Upload PAN</Button>
            </View>
            <TextInput style={{ marginLeft: 15, height: 40 }} onChangeText={i => setPan(i)} placeholder="AXTBZ8777R" ></TextInput>

            <Button
              textColor='#274384'
              mode='text'
              style={{ alignSelf: 'flex-start', marginTop: 10, color: 'black' }}
              labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
              icon="file-document-outline">
              Addhar Card*
            </Button>
            <View style={{ flexDirection: 'row' }} >
              <Button textColor='#274384' icon="radiobox-marked" style={{ fontWeight: 'bold' }} mode="text">Aadhar Number</Button>
              <Button textColor='#274384' icon="radiobox-blank" style={{ marginLeft: 25 }} mode="text" onPress={() => {
                navigation.navigate('AadharScreen', {
                  heading: 'Aadhar Number',
                  imageKey: 'aadharImage'
                });
              }}>Upload Aadhar</Button>
            </View>
            <TextInput style={{ marginLeft: 15, height: 40 }} onChangeText={i => setAadhar(i)} placeholder="1234 1234 1234 1234" ></TextInput>

            <Button
              textColor='#274384'
              mode='text'
              style={{ alignSelf: 'flex-start', marginTop: 10, color: 'black' }}
              labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
              icon="file-document-outline">
              PAN (Business)
            </Button>
            <View style={{ flexDirection: 'row' }} >
              <Button textColor='#274384' icon="radiobox-marked" style={{ fontWeight: 'bold' }} mode="text">PAN Number</Button>
              <Button textColor='#274384' icon="radiobox-blank" style={{ marginLeft: 40 }} mode="text" onPress={() => {
                navigation.navigate('KycScreen', {
                  heading: 'Pan Business',
                  imageKey: 'bizAadharImage'
                });
              }}>Upload PAN</Button>
            </View>
            <TextInput style={{ marginLeft: 15, height: 40 }} onChangeText={i => setBizPan(i)} placeholder="AQZPA3587H" ></TextInput>

            <Button
              textColor='#274384'
              mode='text'
              style={{ alignSelf: 'flex-start', marginTop: 10, color: 'black' }}
              labelStyle={{ fontSize: 16, "fontWeight": "bold" }}
              icon="file-document-outline">
              GST Certificate
            </Button>
            <View style={{ flexDirection: 'row' }} >
              <Button textColor='#274384' icon="radiobox-marked" style={{ fontWeight: 'bold' }} mode="text">GST Number</Button>
              <Button textColor='#274384' icon="radiobox-blank" style={{ marginLeft: 40 }} mode="text" onPress={() => {
                navigation.navigate('KycScreen', {
                  heading: 'GST Certificate',
                  imageKey: 'gstImage'
                });
              }}>Upload GST</Button>
            </View>
            <TextInput style={{ marginLeft: 15, height: 40 }} onChangeText={i => setGst(i)} placeholder="AXTBZ8777R" ></TextInput>
          </View>
        </View>
        <View >
          <Button style={{ backgroundColor: '#00A197', marginTop: 10 }} mode="contained" onPress={validate}>Continue</Button>
          <Button icon='lock' style={styles.text01}>Your Information is safe with us.</Button>
        </View>
      </View>

    </KeyboardAwareScrollView>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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