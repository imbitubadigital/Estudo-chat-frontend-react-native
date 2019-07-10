import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Title,
} from 'native-base';

export default class Products extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const { data } = await api.get('products');
    this.setState({ data });
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
            <Title>Produtos</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="product-hunt" size={30} color="#7CCCE5" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {data.length > 0 && data.map(p => (
              <ListItem thumbnail key={p.id}>
                <Left>
                  <Thumbnail square source={{ uri: p.img }} />
                </Left>
                <Body>
                  <Text>{p.name}</Text>
                  <Text note numberOfLines={1}>{`Dono: ${p.user.username}`}</Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => navigation.navigate('Product', { product: p })}>
                    <Text>Ver +</Text>
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
