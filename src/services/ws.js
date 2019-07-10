import AsyncStorage from '@react-native-community/async-storage';
import Ws from '@adonisjs/websocket-client';

const ws = Ws('ws://10.0.3.2:3333');

const getToken = async () => {
  const token = await AsyncStorage.getItem('@Socket:token');
  if (token) {
    ws.withApiToken(token).connect();
  } else {
    ws.connect();
  }
};

getToken();

export default ws;
