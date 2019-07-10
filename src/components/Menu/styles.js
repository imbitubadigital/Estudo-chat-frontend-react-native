import styled from 'styled-components';

// import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;
export const TopLinks = styled.View`
  height: 160px;
  background-color: #3E4862;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  margin: 10px;
  font-size: 15px;
`;

export const BoxImg = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
export const Img = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;

export const BottomLinks = styled.View`
  flex: 1;
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 40px;
`;

export const BoxBottom = styled.TouchableOpacity`
  background-color: #555e7b;
  padding: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  border-radius: 20px;
`;
export const TextBtnBottom = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const BtnLink = styled.TouchableOpacity`
  height: 40px;
`;

export const BoxLink = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;
export const TextLinks = styled.Text`
  font-size: 18px;
  padding: 0px;
  margin-left: 10px;
`;
export const TextOff = styled.Text`
  font-size: 18px;
  padding: 0px;
  margin-left: 10px;
  color: #bdbebd;
`;
