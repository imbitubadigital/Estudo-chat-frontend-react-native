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

class Called extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.loadCalled();
  }

  loadCalled = async () => {
    const { data } = await api.get('called');
    if (data.length > 0) {
      data.map(async (e) => {
        const call = await api.get(`called/${e.product_id}`);
        const { data: dataState } = this.state;
        this.setState({
          data: [...dataState, {
            id: e.id,
            user_id: e.user_id,
            product_id: e.product_id,
            calleds: call.data,
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
      const txt = calleds > 1 ? `${calleds} novos chamado` : '1 novo chamado';
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
            <Button transparent onPress={() => navigation.navigate('Home')}>
              <Icon name="chevron-left" size={20} color="#7CCCE5" />
            </Button>
          </Left>
          <Body>
            <Title>Chamados</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="bullhorn" size={30} color="#7CCCE5" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {data.length > 0
              && data.map(p => (
                <ListItem thumbnail key={p.id}>
                  <Left>
                    <Img source={{ uri: p.product.img }} />
                  </Left>
                  <Body>
                    <Text>{p.product.name}</Text>
                    {this.handleOpenCalled(p.calleds)}
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => navigation.navigate('CalledUsers', { productId: p.product_id })}
                    >
                      <Text>Gerenciar</Text>
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
)(Called);
