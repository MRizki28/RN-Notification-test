import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';

export default function App() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [token, setToken] = useState('');
  // const bearerToken = 'Bearer 11|iOddnbdWT4HdTOwDEnWdvwYsAcwenGRmqDLEAFRnb61445c3';

  const requestUserPermission = () => {
    messaging().requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
          setIsPermissionGranted(true);
        } else {
          setIsPermissionGranted(false);
        }
      })
      .catch(error => {
        console.error('Error requesting user permission:', error);
        setIsPermissionGranted(false);
      });
  }

  // const saveTokenToAPI = (token: any) => {
  //   const formData = new FormData();
  //   formData.append('device_token', token);

  //   fetch('https://backend.karyaku.penakuofficial.com/api/v1/get-device-token', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': bearerToken,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Token saved to API:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error saving token to API:', error);
  //     });
  // };

  useEffect(() => {
    requestUserPermission();

    if (isPermissionGranted) {
      messaging().getToken()
        .then(token => {
          setToken(token);
          console.log('Token:', token);
          // saveTokenToAPI(token);
        })
        .catch(error => {
          console.error('Error getting token:', error);
        });
    } else {
      console.log('Permission not granted.');
    }

  }, [isPermissionGranted]);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Token: {token}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
