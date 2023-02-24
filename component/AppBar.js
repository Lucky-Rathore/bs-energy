import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AppBar = ({ progress }) => {
    const p = progress
    return (
        <View style={styles.container}>

            <View style={{ alignItems: 'center', marginLeft: 10 }}>
                <View style={p == 1 ? styles.circle2 : styles.circle} >
                    {
                        p == 1 ?
                        <Text style={styles.text2}>&#10003;</Text>
                        :
                        <Text style={styles.text}>1</Text>
                    }
                </View>
                <View style={{ fontSize: 10, alignSelf: 'center', marginTop: 5 }} ><Text style={{color: '#274384'}} >Basic Info</Text></View>
            </View>
            <View style={{ paddingBottom: 10 }}><Text>--------</Text></View>

            <View style={{ alignItems: 'center', marginLeft: 10 }}>
                <View style={p == 2 ? styles.circle2 : styles.circle}>
                    {
                        p == 2 ?
                        <Text style={styles.text2}>&#10003;</Text>
                        :
                        <Text style={styles.text}>2</Text>
                    }
                </View>
                <View style={{ color: 'grey', fontSize: 10, alignSelf: 'center', marginTop: 5 }} ><Text style={{color: '#274384'}} >KYC</Text></View>
            </View>

            <View style={{ paddingBottom: 10 }}><Text>--------</Text></View>

            <View style={{ alignItems: 'center', marginLeft: 10 }}>
                <View style={p == 3 ? styles.circle2 : styles.circle}>
                    {
                        p == 3 ?
                        <Text style={styles.text2}>&#10003;</Text>
                        :
                        <Text style={styles.text}>3</Text>
                    }
                </View>
                <View style={{ color: 'grey', fontSize: 10, alignSelf: 'center', marginTop: 5 }} ><Text style={{color: '#274384'}} >Bank Details</Text></View>
            </View>

            <View style={{ paddingBottom: 10 }}><Text>--------</Text></View>

            <View style={{ alignItems: 'center', marginRight: 10 }}>
                <View style={p == 4 ? styles.circle2 : styles.circle}>
                    {
                        p == 4 ?
                        <Text style={styles.text2}>&#10003;</Text>
                        :
                        <Text style={styles.text}>4</Text>
                    }
                </View>
                <View style={{ color: 'grey', fontSize: 10, alignSelf: 'center', marginTop: 5 }} ><Text style={{color: '#274384'}} >T&C</Text></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#fff',
        marginVertical: 20
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle2: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#274384',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
    },
});

export default AppBar;
