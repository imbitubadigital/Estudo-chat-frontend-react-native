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

import { Img, TextAlert } from './styles';

class message extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.loadCalled();
  }

  loadCalled = async () => {
    const { data } = await api.get('conversations');

    if (data.length > 0) {
      const { auth: { user } } = this.props;
      let qtd = 0;
      data.map(async (e) => {
        const { data: dataState } = this.state;
        qtd = e.items.filter(q => q.user_id !== user.id && q.visualized === 0);

        this.setState({
          data: [...dataState, {
            id: e.id,
            user_id: e.user_id,
            product_id: e.product_id,
            calleds: qtd.length,
            created_at: e.product_id,
            updated_at: e.product_id,
            product: e.product,
            user: e.user,
            items: e.items,
          }],
        });
      });
    }
  }

  handleOpenCalled = (calleds) => {
    if (calleds > 0) {
      const txt = calleds > 1 ? `${calleds} nova resposta` : '1 nova resposta';
      return <TextAlert>{txt}</TextAlert>;
    }
    return true;
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Home')}>
              <Icon name="chevron-left" size={20} color="#7CCCE5" />
            </Button>
          </Left>
          <Body>
            <Title>Minhas conversas</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="comments" size={30} color="#7CCCE5" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {data.length > 0
              && data.map(c => (
                <ListItem thumbnail key={c.id}>
                  <Left>
                    <Img source={{ uri: c.product.img }} />
                  </Left>
                  <Body>
                    <Text>{c.product.name}</Text>
                    {this.handleOpenCalled(c.calleds)}
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => navigation.navigate('Chat', { chatId: c.items[0].chat_id })}
                    >
                      <Text>Ver</Text>
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
)(message);

