import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, TouchableOpacity } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  List,
  Provider as PaperProvider,
  Button
} from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

import Parse from 'parse/react-native.js';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uvjIKE4Tr18UMo9AK4CwWKreb3tJZQ21cOl8aVgj', 'bwmjSWPIEWEkNi7qFeJYNJYkAf4HaIjBFyIy5hg1');
Parse.serverURL = 'https://parseapi.back4app.com/'


import { Text, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import OTPTextView from 'react-native-otp-textinput';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const title = 'Hello';
const content = 'world';

const HomeScreen = ({ navigation }) => (
  <TouchableOpacity
    onPress={() =>
      navigation?.push('Details', {
        title,
        content,
      })
    }
  >
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const DetailsScreen = (props) => {
  const { title, content } = props?.route?.params;
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [image, setImage] = useState(null);


  AsyncStorage.setItem(1,2);

  const add = async () => {
    const busDetail = new Parse.Object('BusinessDetail1');
    busDetail.set('name', 'parse test');
    console.log(busDetail.toJSON())
    try {
      const result = await busDetail.save();
      console.log('result.get("objectId"): ' + result)
      AsyncStorage.setItem('objectId', result['id'])
    } catch (error) {
      console.error('Error while creating BusinessDetail1: ', error);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <List.Section>
      <List.Subheader>{title}</List.Subheader>
      <Text>13</Text>
      <View>
        <Button mode='contained' title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      <Text>13</Text>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <OTPTextView
        handleTextChange={i => console.log(i)}
        inputCount={6}
        inputCellLength={1}
        tintColor="#000"
      />
      <Button onPress={add} mode='contained' label='add' ></Button>
    </List.Section>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

