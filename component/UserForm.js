import React, { useEffect, useState } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
// import { TextInput, Text } from 'react-native';

import { Alert, StyleSheet } from 'react-native';

import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';


//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
//Point to Back4App Parse API address 
Parse.serverURL = 'https://parseapi.back4app.com/'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'grey',
    secondary: 'green',
  },
};



export default function UserForm({ navigation }) {
  const [name, setName] = React.useState("");
  const [busName, setBusName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [add1, setadd1] = React.useState("");
  const [add2, setadd2] = React.useState("");
  const [countryState, setCountryState] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [bizType, setBizType] = React.useState("");

  // function testFeed() {
  //   setName('name' + Math.random())
  //   setBusName('busName' + Math.random())
  //   setPhone('7769940498')
  //   setEmail('email@' + Math.random())
  //   setadd1('add1' + Math.random())
  //   setadd2('add2' + Math.random())
  //   setCountryState('KA')
  //   setPin('560066')
  //   setBizType('Pvt Ltd')
  // }

  // testFeed()


  async function sendOtp() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QUM0ZjM3NmU1MTg1MTE1OTRmZTY5Nzg4MGEyNDc4YWRmZjo5YjExOTU2MDBjMzg0NTk2MDczNjIwMmE4ODU5NjZjOA==");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("To", '+91' + phone);
    urlencoded.append("Channel", "sms");
    console.log(phone)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    // fetch("https://verify.twilio.com/v2/Services/VAc1a9097271a22e709588ebc0b9d0e161/Verifications", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  }

  async function validate() {
    let s = ''
    // if (name.length < 1) s += '\n- Name'
    // if (busName.length < 1) s += '\n - Business Name'
    // if (!(parseInt(phone) >= 1000000000 && parseInt(phone) <= 9999999999)) s += '\n - Phone Number'
    // if (!(email.includes('@') && email.includes('.'))) s += '\n - Email'
    // if (add1.length < 1) s += '\n - Address Line 1'
    // if (countryState.length < 1) s += '\n - State'
    // if (!(parseInt(pin) >= 100000 && parseInt(pin) <= 999999)) s += '\n - Pin'
    // if (bizType.length < 1) s += '\n - Business Type'
    if (s == '') {
      AsyncStorage.setItem('phone', phone)
      sendOtp()
      add()
    }
    else {
      console.log('s: ' + s)
      alert('Please enter valid value for: ' + s)
    }
  }

  async function add() {
    const busDetail = new Parse.Object('BusinessDetail1');
    busDetail.set('name', name);
    busDetail.set('busName', busName);
    busDetail.set('add1', add1);
    busDetail.set('add2', add2);
    busDetail.set('state', countryState);
    busDetail.set('email', email);
    busDetail.set('phone', parseInt(phone));
    busDetail.set('busType', bizType);
    busDetail.set('pin', parseInt(pin));
    console.log(busDetail.toJSON())
    try {
      const result = await busDetail.save();
      console.log('result.get("objectId"): ' + result)
      AsyncStorage.setItem('objectId', result['id'])
    } catch (error) {
      console.error('Error while creating BusinessDetail1: ', error);
    }
    navigation.navigate("OTPScreen2")
  }


  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', marginHorizontal: 20, flexWrap: 'wrap' }}>

        <View style={{ marginBottom: 10 }}>
          <Text>Full Name*</Text>
          <TextInput
            placeholder="Enter full name ( as per PAN )"
            value={name}
            onChangeText={t => setName(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>Full Business Name*"</Text>
          <TextInput
            placeholder="Enter full business name ( as per PAN )"
            value={busName}
            onChangeText={t => setBusName(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>Mobile Number*</Text>
          <TextInput
            value={phone}
            onChangeText={t => setPhone(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>Email ID*</Text>
          <TextInput
            value={email}
            onChangeText={t => setEmail(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Business Address*</Text>
          <TextInput
            placeholder="Address Line 1"
            value={add1}
            onChangeText={t => setadd1(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>Address Line 2</Text>
          <TextInput
            value={add2}
            onChangeText={t => setadd2(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>State*</Text>
          <TextInput
            value={countryState}
            onChangeText={t => setCountryState(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>Pincode*</Text>
          <TextInput
            value={pin}
            onChangeText={t => setPin(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>


        <View style={{ marginBottom: 10 }}>
          <Text>Business Type*</Text>
          <TextInput
            value={bizType}
            placeholder="Sole proprietorship / partnership / Pvt Ltd"
            onChangeText={t => setBizType(t)}
            mode='flat'
            style={{ marginBottom: 5, marginLeft: 5, height: 35, marginTop: 5 }}
          />
        </View>

      </View>
      <View>
        <Button style={{ marginBottom: 10, backgroundColor: '#00A197' }} mode="contained" onPress={validate}>Confirm Details</Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    padding: 5
  }
});
