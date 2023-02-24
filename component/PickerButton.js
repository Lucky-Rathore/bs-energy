import React, { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export default function PickerButton(dataItem) {
    const [selectedLanguage, setSelectedLanguage] = useState(dataItem['dataItem'][0]);
    console.log('dataItem', dataItem) 
    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return <Picker
        style={{height:30}}
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
        }>
        {
            dataItem['dataItem'].map( i => <Picker.Item label={i} value={i} />)
        }
    </Picker>
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
