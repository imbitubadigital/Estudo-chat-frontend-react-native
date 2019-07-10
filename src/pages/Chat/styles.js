import styled from 'styled-components';
import { Input } from 'native-base';

export const BodyChat = styled.View`
  justify-content: center;
  flex: 1;
  background-color: #e6f7ff;
  padding: 10px;
`;

export const ContentChat = styled.View`
  justify-content: flex-start;
  flex: 1;
  padding: 10px;
`;

export const BoxL = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 8px 0;
`;

export const ItemL = styled.View`
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  flex-basis: 85%;
  padding: 10px;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;

export const Aba = styled.Image`
  width: 21px;
  height: 22px;
  position: absolute;
  bottom: -18px;
  left: -2px;
  z-index: 100;
`;
export const TextL = styled.Text`
  color: #666;
  font-size: 15px;
`;

export const DateL = styled.Text`
  color: #999;
  font-size: 10px;
  text-align: right;
`;

export const ContentForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;
export const InputCustom = styled(Input)`
  flex: 1;
  height: 40px;
  border: 1px solid #666;
  color: #333;
  background-color: #fff;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Send = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #048b7c;
`;

export const BoxR = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin: 8px 0;
`;

export const ItemR = styled.View`
  justify-content: center;
  background-color: #c3ffc3;
  border-radius: 5px;
  flex-basis: 85%;
  padding: 10px;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const TextR = styled.Text`
  color: #666;
  font-size: 15px;
`;

export const BoxDate = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
export const DateR = styled.Text`
  color: #999;
  font-size: 10px;
  text-align: right;
  margin-right: 15px;
`;
