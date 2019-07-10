import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import ws from '~/services/ws';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import chat from '~/images/chat.png';
import aba from '~/images/aba.png';
import api from '~/services/api';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
} from 'native-base';

import {
  BodyChat, ContentChat, ContentForm, InputCustom, Send,
  BoxL, Aba, ItemL, TextL, DateL,
  BoxR, ItemR, TextR, BoxDate, DateR,
} from './styles';


class Chat extends Component {
  state = {
    data: null,
    content: null,
    chatId: null,
    teste: null,
  };

  async componentDidMount() {
    const { auth:{ user: { id } } } = this.props;

    this.notify = ws.subscribe(`notification:${id}`);

    this.notify.on('aviso', async (result) => {
      const { data } = this.state;
      await api.get(`chat-status/${result.id}`);
      this.setState({ data: [...data, result] });
      console.tron.log('foi', result);
    });

    const { navigation } = this.props;
    const chatId = navigation.getParam('chatId');
    this.setState({ chatId });
    const response = await api.get(`chat/${chatId}`);
    if (response) {
      const { auth:{ user } } = this.props;
      response.data.map(async (s) => {
        if (s.user.id !== user.id) {
          await api.get(`chat-status/${s.id}`);
        }
      });
      this.setState({ data: response.data });
    }
  }

  handleContentChange = (content) => {
    this.setState({ content });
  }

  handleChatSubmit = async () => {
    const { data, content, chatId } = this.state;
    if (content !== null) {
      const response = await api.put(`chat/${chatId}`, { content });
      this.setState({ content: null, data: [...data, response.data] });
      console.tron.log('response', response.data);
    }
  };

  render() {
    const { navigation, auth:{ user } } = this.props;
    const { data, content } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#7CCCE5" />
            </Button>
          </Left>
          <Body>
            {data === null ? (
              <Title>Carregando...</Title>
            ) : (
              <Title>{data[0].chat.user.username}</Title>
            )}
          </Body>
          <Right>
            {data === null  ? (
              <Image
                source={chat}
                style={{ height: 50, width: 50 }}
              />
            ) : (
              <Image
                source={{ uri: data[0].chat.user.avatar }}
                style={{ height: 50, width: 50 }}
              />
            )}
          </Right>
        </Header>
        <BodyChat>
          <ContentChat>
            <ScrollView>
              {data !== null && data.map(c => (
                c.user.id !== user.id ? (
                  <BoxL key={c.id}>
                    <ItemL>
                      <TextL>{c.content}</TextL>
                      <DateL>
                        {`${moment(c.created_at).format('DD/MM')} - ${moment(c.created_at).format('h:mm')}h`}
                      </DateL>
                      <Aba source={aba} />
                    </ItemL>
                  </BoxL>
                ) : (
                  <BoxR key={c.id}>
                    <ItemR>
                      <TextR>{c.content}</TextR>
                      <BoxDate>
                        <DateR>
                          {`${moment(c.created_at).format('DD/MM')} - ${moment(c.created_at).format('h:mm')}h`}
                        </DateR>
                        {c.visualized === 0 ? (
                          <Icon name="check" size={13} color="#ccc" />
                        ) : (
                          <Icon name="check" size={13} color="#265CFF" />
                        )}
                      </BoxDate>
                    </ItemR>
                  </BoxR>
                )
              ))}
            </ScrollView>
          </ContentChat>

          <ContentForm>
            <InputCustom
              value={content}
              onChangeText={this.handleContentChange}
            />
            <Send onPress={this.handleChatSubmit}>
              <Icon name="paper-plane" size={20} color="#fff" />
            </Send>
          </ContentForm>
        </BodyChat>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(Chat);
