import React, { Component } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import api from '~/services/api';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  Title,
  Card,
  CardItem,
} from 'native-base';

import {
  CustonButton, BodyCustom, CardItemCustom, TextBtn,
} from './styles';


class Product extends Component {
  state = {
    product: null,
  };

  async componentDidMount() {
    const { navigation, auth } = this.props;
    const product = navigation.getParam('product');
    console.tron.log('DID', auth);
    this.setState({ product });
  }

  render() {
    const { navigation, auth:{ user } } = this.props;
    const { product } = this.state;
  //console.tron.log('RENDER', auth);
   console.tron.log('RENDER2', product);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Products')}>
              <Icon name="chevron-left" size={20} color="#7CCCE5" />
            </Button>
          </Left>
          <Body>
            <Title>Detalhes do Produto</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="product-hunt" size={30} color="#7CCCE5" />
            </Button>
          </Right>
        </Header>
        <Content>
          {product && (
            <Card>
              <CardItem>
                <Left>
                  <Icon name="product-hunt" size={30} color="#7CCCE5" />
                  <Body>
                    <Text>{product.name}</Text>
                    <Text note>{`Dono: ${product.user.username}`}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <BodyCustom>
                  <Image
                    source={{ uri: product.img }}
                    style={{ height: 200, width: 200 }}
                  />
                </BodyCustom>
              </CardItem>
              {user.id !== product.user_id && (
                <CardItemCustom>
                  <CustonButton onPress={() => navigation.navigate('Chat', { product })}>
                    <Icon name="comments" size={20} color="#FFF" />
                    <TextBtn>Falar com Anunciante</TextBtn>
                  </CustonButton>
                </CardItemCustom>
              )}
            </Card>
          )}
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
)(Product);
