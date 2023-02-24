import React, { useEffect, useState } from 'react';
import { Card, IconButton, MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';

import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';



export default function ThankScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Card style={{margin:20}} elevation={5}>
                <Card.Cover style={{ height: 300 }} source={require('../assets/thanks.png')} />
            </Card>
            <Text style={{
                marginTop: 50,
                "fontStyle": "normal",
                "fontWeight": "400",
                "fontSize": 14,
                // "lineHeight": 25,
                "textAlign": "center",
                //"letterSpacing": -0.5,
                "color": "#3B4256"
            }}>Your application has been successfully submitted.</Text>
            <Text style={{
                "fontWeight": "700",
                "fontSize": 20,
                "color": "#274384",
                marginTop:20,
                alignSelf:'center'
            }}>Kindly check after sometime</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor:'#DADDDF'
    }
});
