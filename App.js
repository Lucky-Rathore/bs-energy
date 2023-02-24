import React, { useEffect, useState } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

import UserForm from './component/UserForm';
import KycForm from './component/KycForm';
import KycScreen from './component/KycScreen';
import SelfieScreen from './component/SelfieScreen';
import OTPScreen2 from './component/OTPScreen2';
import BankDetail from './component/BankDetail';
import AppBar from './component/AppBar';
import ThankScreen from './component/ThankScreen';
import AadharScreen from './component/AadharScreen';
import CameraTest from './component/CameraTest';
import PickerButton from './component/PickerButton';
import SelfieScreen2 from './component/SelfieScreen2';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'grey',
    secondary: 'green',
  },
};

function CustomNavigationBar({ navigation, back}) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content />
    </Appbar.Header>
  );
}



export default function Main() {
  return (
    <PaperProvider theme={theme}  >
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="UserForm"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}>
          <Stack.Screen name="UserForm" component={UserForm} options={{ header: (props) => <AppBar progress={1}/>}}/>
          <Stack.Screen name="KycForm" component={KycForm} options={{ header: (props) => <AppBar progress={2}/>}}/>
          <Stack.Screen name="BankDetail" component={BankDetail} options={{ header: (props) => <AppBar progress={3}/>}}/>
          <Stack.Screen name="ThankScreen" component={ThankScreen} options={{ header: (props) => <AppBar progress={4}/>}}/>
          
          <Stack.Screen name="KycScreen" component={KycScreen}  />
          <Stack.Screen name="SelfieScreen2" component={SelfieScreen2} />
          <Stack.Screen name="OTPScreen2" component={OTPScreen2} />
          <Stack.Screen name="AppBar" component={AppBar} />
          <Stack.Screen name="AadharScreen" component={AadharScreen} />
          <Stack.Screen name="CameraTest" component={CameraTest} />
          <Stack.Screen name="PickerButton" component={PickerButton} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}