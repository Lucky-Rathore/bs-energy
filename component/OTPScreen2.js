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
        console.log('validating text')
        // WARNING: For POST requests, body is set to null by browsers.
        var data = "To=%2B91" + phoneNumber + "&Code=" + otp;
        console.log(' validation otp data', data)
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const resp = JSON.parse(this.responseText)
                console.log('validation resp', resp)
                if (resp['status'] === 'approved') {
                    console.log('isValidOtp', isValidOtp)
                    setIsValidOtp(true)
                }
            }
        });

        xhr.open("POST", "https://verify.twilio.com/v2/Services/VAc1a9097271a22e709588ebc0b9d0e161/VerificationCheck");
        xhr.setRequestHeader("Authorization", "Basic QUM0ZjM3NmU1MTg1MTE1OTRmZTY5Nzg4MGEyNDc4YWRmZjo5YjExOTU2MDBjMzg0NTk2MDczNjIwMmE4ODU5NjZjOA==");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);

    }

    const submit = () => {

        navigation.navigate('KycForm')
    };

    async function sendOtp() {
        console.log('resend otp called')
        var data = "To=%2B91" + phoneNumber + "&Channel=sms";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "https://verify.twilio.com/v2/Services/VAc1a9097271a22e709588ebc0b9d0e161/Verifications");
        xhr.setRequestHeader("Authorization", "Basic QUM0ZjM3NmU1MTg1MTE1OTRmZTY5Nzg4MGEyNDc4YWRmZjo5YjExOTU2MDBjMzg0NTk2MDczNjIwMmE4ODU5NjZjOA==");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
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
                        onPress={i => sendOtp()}
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
