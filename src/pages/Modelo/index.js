import React, { Component } from 'react';

import ws from '~/services/ws';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import {
  Container, ContentChat, Form, BoxInput, TextSpan, Input,
  InputMsg, Btn, BtnText, Item, User, Mkg,
} from './styles';

export default class Home extends Component {
  state = {
    msg: [],
    txt: null,
    ms: null,
  };

  componentDidMount() {
    this.chat = ws.subscribe('chat');

   // chat.emit('message', { text: 'Minha mensagem', name: 'Tony' });
  //  const { msg } = this.state;

    ws.on('open', () => {
      console.tron.log('conectou');
    });

    ws.on('error', () => {
      console.tron.log('deu ruim');
    });

    ws.on('close', () => {
      console.tron.log('fechou');
    });
  }

  handleSubmit = () => {
    const { msg, txt, ms } = this.state;
    if (txt !== null && ms !== null) {
      this.chat.emit('message', { text: ms, name: txt });
      this.chat.on('message', data => this.setState({ msg: [...msg, data] }));
      this.setState({ txt: null, ms: null });
    }
  }

  render() {
    const { msg, txt, ms } = this.state;
   // console.tron.log('RENDER', msg);
    return (
      <Container>
        <ContentChat>
          {msg.length > 0 && msg.map(m => (
            <Item key={m.text}>
              <User>{m.name}</User>
              <Mkg>{m.text}</Mkg>

            </Item>
          ))}
        </ContentChat>
        <Form>
          <BoxInput>
            <TextSpan>Seu nome:</TextSpan>
            <Input onChangeText={txt => this.setState({ txt })} value={txt} />
          </BoxInput>
          <BoxInput>
            <TextSpan>Mensagem:</TextSpan>
            <InputMsg onChangeText={ms => this.setState({ ms })} value={ms} />
          </BoxInput>
          <Btn onPress={() => this.handleSubmit()}>
            <BtnText>Enviar</BtnText>
          </Btn>
        </Form>
      </Container>
    );
  }
}
