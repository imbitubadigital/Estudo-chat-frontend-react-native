import styled from 'styled-components';
import { Item, Button } from 'native-base';

const ContainerMain = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #555e7b;
`;

const BoxLogo = styled.View`
  padding: 10px 30px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Logo = styled.Image`
  flex: 1;
  height: 600%;
`;

const CustonItem = styled(Item)`
  background-color: #f5f5f5;
  margin: 11px 30px;
  padding-left: 10px;
`;

const CustonButton = styled(Button)`
  background-color: #7CCCE5;
  margin: 11px 30px;
`;

const SignUpLink = styled.TouchableOpacity`
  padding: 10px;
  margin-top: 10px;
`;

const SignUpLinkText = styled.Text`
  color: #999;
  font-size: 14px;
  text-align: center;
`;

export {
  ContainerMain, BoxLogo, Logo, CustonItem, CustonButton, SignUpLink, SignUpLinkText,
};
