import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  Title,
} from 'native-base';

import { Img, TextAlert, ImgTop } from './styles';

class CalledUsers extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.loadCalledUsers();
  }

  loadCalledUsers = async () => {
    const { navigation } = this.props;
    const productId = navigation.getParam('productId');

    const { data } = await api.post('called-users', { productId });

    if (data.length > 0) {
      data.map(async (e) => {
        const call = await api.get(`called-users/${e.chat_id}`);
        const { data: dataState } = this.state;
        this.setState({
          data: [...dataState, {
            id: e.id,
            chat_id: e.chat_id,
            calleds: call.data,
            created_at: e.product_id,
            updated_at: e.product_id,
            product: e.product,
            user: e.user,
          }],
        });
      });
    }
  }

  handleOpenCalled = (calleds) => {
    if (calleds > 0) {
      const txt = calleds > 1 ? `${calleds} novas mensagens` : '1 nova mensagem';
      return <TextAlert>{txt}</TextAlert>;
    }
    return true;
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    console.tron.log('RENDER', data);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#7CCCE5" />
            </Button>
          </Left>
          <Body>
            {data.length < 1 ? (
              <Title>Carregando...</Title>
            ) : (
              <Title>{data[0].product.name}</Title>
            )}
          </Body>
          <Right>
            {data.length < 1 ? (
              <Button transparent>
                <Icon name="bullhorn" size={30} color="#7CCCE5" />
              </Button>
            ) : (
              <ImgTop source={{ uri: data[0].product.img }} />
            )}

          </Right>
        </Header>
        <Content>
          <List>
            {data.length > 0
              && data.map(u => (
                <ListItem thumbnail key={u.id}>
                  <Left>
                    <Img source={{ uri: u.user.avatar }} />
                  </Left>
                  <Body>
                    <Text>{u.user.username}</Text>
                    {this.handleOpenCalled(u.calleds)}
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => navigation.navigate('Chat', { chatId: u.chat_id })}
                    >
                      <Text>Responder</Text>
                    </Button>
                  </Right>
                </ListItem>
              ))}
          </List>
        </Content>
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
)(CalledUsers);
