import styled from 'styled-components';
import { Button, Body, CardItem } from 'native-base';

export const BodyCustom = styled(Body)`
  flex-direction: row;
  justify-content: center;
  flex: 1;
`;
export const CardItemCustom = styled(CardItem)`
  align-items: center;
  justify-content: center;
`;

export const CustonButton = styled.TouchableOpacity`
  background-color: #555e7b;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const TextBtn = styled.Text`
  color: #fff;
  margin-left: 10px;
  font-size: 18px;
`;
