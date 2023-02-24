import React, { useState, useEffect } from 'react';
import OTPTextView from 'react-native-otp-textinput'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OTPScreen2 = ({ navigation, route }) => {

    const { phoneNumber } = route.params

    const [checked, setChecked] = React.useState(false)
    const [isValidOtp, setIsValidOtp] = React.useState(false)
    const [secondsRemaining, setSecondsRemaining] = useState(60);

    useEffect(() => {
        if (secondsRemaining > 0) {
            const intervalId = setInterval(() => {
                setSecondsRemaining(seconds => seconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [secondsRemaining]);


    const validateOtp = async (otp) => {
        if (!(otp && otp.length == 6)) return
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QUM0ZjM3NmU1MTg1MTE1OTRmZTY5Nzg4MGEyNDc4YWRmZjo5YjExOTU2MDBjMzg0NTk2MDczNjIwMmE4ODU5NjZjOA==");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("To", "+91" + phoneNumber);
        urlencoded.append("Code", otp);
        console.log('otp', otp)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        console.log('validating otp')
        fetch("https://verify.twilio.com/v2/Services/VAc1a9097271a22e709588ebc0b9d0e161/VerificationCheck", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('VerificationCheck otp: ', result)
                console.log(result['status'])
                if (result['status'] === 'approved') {
                    console.log('isValidOtp', isValidOtp)
                    setIsValidOtp(true)
                }
            })
            .catch(error => console.log('error', error));
        // if (otp === '123456') {
        //     setIsValidOtp(true)
        //     console.log('otp equals 123456')
        // }
    }

    const submit = () => {

        navigation.navigate('KycForm')
    };

    async function sendOtp() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QUM0ZjM3NmU1MTg1MTE1OTRmZTY5Nzg4MGEyNDc4YWRmZjo5YjExOTU2MDBjMzg0NTk2MDczNjIwMmE4ODU5NjZjOA==");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("To", '+91' + phoneNumber);
        urlencoded.append("Channel", "sms");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://verify.twilio.com/v2/Services/VAc1a9097271a22e709588ebc0b9d0e161/Verifications", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 1, margin: 50 }} >
            <View>
                <Text
                    style={{
                        "fontWeight": "900",
                        "fontSize": 30,
                        "color": "#274384"
                    }}
                >
                    Verify Code
                </Text>
                <Text
                    style={{
                        marginTop: 30,


                        "fontWeight": "400",
                        "fontSize": 17,
                        "color": "#274384"
                    }}
                >
                    Check your SMS inbox, we have sent you the verification code at +91 {phoneNumber}
                </Text>
                <View style={{ marginTop: 50, marginHorizontal: 50, alignItems: 'center' }}>
                    {/* <OTPTextInput inputCount={6}  ></OTPTextInput> */}
                    <OTPTextView
                        handleTextChange={i => validateOtp(i)}
                        containerStyle={styles.textInputContainer}
                        textInputStyle={styles.roundedTextInput}
                        inputCount={6}
                        inputCellLength={1}
                        tintColor="#000"
                    />

                </View>
                {
                    isValidOtp ?

                        <Text style={{
                            "height": 19,
                            "fontWeight": "400",
                            "fontSize": 13,
                            "color": "#274384"
                        }}>OTP validated</Text> :
                        <Text style={{
                            "height": 19,
                            "fontWeight": "400",
                            "fontSize": 13,
                            "color": "#274384"
                        }}>(00:{secondsRemaining})</Text>
                }

                <Text style={{
                    marginTop: 50,
                    "fontWeight": "400",
                    "fontSize": 13,
                    "color": "#486484"
                }}>
                    This session will end in 60 seconds.{'\n'}Didn’t receive a code?
                    <Text
                        mode='text'
                        style={{
                            "fontWeight": "400",
                            "fontSize": 13,
                            "color": "#486484",
                            fontWeight: 'bold'
                        }}
                        onPress={i => sentOtp()}
                    > Resend Code.
                    </Text>
                </Text>

                <Text style={{
                    "fontWeight": "400",
                    "fontSize": 13,
                    "color": "#486484"
                }}></Text>
            </View>

            {isValidOtp ?
                (<View style={{
                    alignSelf: 'flex-end',
                    marginTop: 50

                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                console.log('checked', checked)
                                setChecked(!checked);
                            }}
                        />

                        <Text style={{
                            "fontWeight": "400",
                            "fontSize": 11,
                            "color": "#6F7482"
                        }}>I hereby authorize Reekords to collect, store and share my personal information, business details and other details with third parties to enable them to provide me the services.
                        </Text>
                    </View>

                </View>) :
                (null)}

            <Button disabled={!checked || !isValidOtp} style={{ margin: 30, backgroundColor: '#00A197' }} mode="contained" onPress={submit} >Submit</Button>

        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, margin: 20 },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
        shadowColor: 'grey',
        color: 'black',
        backgroundColor: 'white',
        shadowOpacity: 5
    }
});

export default OTPScreen2;
