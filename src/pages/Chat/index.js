import React, { Component } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import ws from '~/services/ws';
import moment from 'moment';
import Sound from 'react-native-sound';
import InvertedFlatList from 'react-native-inverted-flat-list';
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

const som = 'https://testeapp4444.s3-sa-east-1.amazonaws.com/som.mp3';
// Sound.setCategory('Playback');
class Chat extends Component {
  state = {
    data: [],
    content: null,
    chatId: null,
    product: null,
    refreshing: false,
    teste: 'off',
  };

  async componentDidMount() {
    const { auth:{ user: { id } } } = this.props;
    const { navigation } = this.props;
    const chatId = navigation.getParam('chatId');
    const product = navigation.getParam('product');

    if (chatId) {
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

    if (product) {
      this.setState({ product });
    }
    this.notify = ws.getSubscription(`notification:${id}`) || ws.subscribe(`notification:${id}`);
   // this.checkOnline = ws.getSubscription(`online:${id}`) || ws.subscribe(`online:${id}`);
   // data.length
  //  await api.get('online/23');
    this.notify.on('aviso', async (result) => {
      const { data } = this.state;
      if (result) {
        await api.get(`chat-status/${result.id}`);
        this.setState({ data: [result, ...data] });
      }
      this.playSongAlert();
    });

    this.notify.on('aviso_status', async (resultUpdate) => {
      const { data } = this.state;
      const newData = data.map(d => d.id === resultUpdate.id ? resultUpdate : d);
      this.setState({ data: newData });
    });



  }

  componentWillUnmount() {
    if (this.notify) {
      this.notify.close();
    }
  }

  playSongAlert = () => {
    const whoosh = new Sound(som, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.tron.log('failed to load the sound', error);
        return;
      }
      whoosh.play((success) => {
        if (success) {
          console.tron.log('successfully finished playing');
        } else {
          console.tron.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  onPullToRefresh = () => {
    const { refreshing, data } = this.state;

    // Return early if already refreshing
    if (refreshing) return;

    this.setState({ refreshing: true });

    /* // Load more messages
    const moreMessages = ...;

    const copyMessages = messages.slice();
    const newMessages = copyMessages.concat(moreMessages); */

    this.setState({
      refreshing: false,
    });
  }

  handleContentChange = (content) => {
    this.setState({ content });
  }

  handleChatSubmit = async () => {
    const { data, content, chatId, product } = this.state;
    if (content !== null) {
      if (data.length > 0 && chatId !== null) {
        const response = await api.put(`chat/${chatId}`, { content });
        console.tron.log('sub', response.data);
        this.setState({ content: null, data: [response.data, ...data] });
      } else {
        const response = await api.post('chat', { product_id: product.id, content });
        this.setState({
          content: null,
          data: [response.data, ...data],
          chatId: response.data.chat_id,
        });
      }
    }

  };

  render() {
    const { navigation, auth:{ user } } = this.props;
    const { data, content, refreshing, product, teste } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#7CCCE5" />
              <Text>{teste}</Text>
            </Button>
          </Left>
          <Body>
            {data.length < 1 ? (
              <Title>{product !== null && product.name}</Title>
            ) : (
              <>
                {data[0].chat.user_id === user.id ? (
                  <Title>{data[0].chat.product.user.username}</Title>
                ) : (
                  <Title>{data[0].chat.user.username}</Title>
                )}
              </>
            )}
          </Body>
          <Right>
            {data.length < 1 ? (
              product !== null && (
                <Image
                  source={{ uri: product.img }}
                  style={{ height: 50, width: 50 }}
                />
              )
            ) : (
              <>
                {data[0].chat.user_id === user.id ? (
                  <Image
                    source={{ uri: data[0].chat.product.user.avatar }}
                    style={{ height: 50, width: 50 }}
                  />
                ) : (
                  <Image
                    source={{ uri: data[0].chat.user.avatar }}
                    style={{ height: 50, width: 50 }}
                  />
                )}
              </>
            )}
          </Right>
        </Header>
        <BodyChat>
          <ContentChat>
            <InvertedFlatList
              refreshing={refreshing} // required
              data={data} // required
              keyExtractor={item => item.id.toString()} // required
              onPullToRefresh={this.onPullToRefresh}
              renderItem={({ item }) => ( // required
                item.user.id !== user.id ? (
                  <BoxL>
                    <ItemL>
                      <TextL>{item.content}</TextL>
                      <DateL>
                        {`${moment(item.created_at).format('DD/MM')} - ${moment(item.created_at).format('h:mm')}h`}
                      </DateL>
                      <Aba source={aba} />
                    </ItemL>
                  </BoxL>
                ) : (
                  <BoxR>
                    <ItemR>
                      <TextR>{item.content}</TextR>
                      <BoxDate>
                        <DateR>
                          {`${moment(item.created_at).format('DD/MM')} - ${moment(item.created_at).format('h:mm')}h`}
                        </DateR>
                        {item.visualized === 0 ? (
                          <Icon name="check" size={13} color="#ccc" />
                        ) : (
                          <Icon name="check" size={13} color="#265CFF" />
                        )}
                      </BoxDate>
                    </ItemR>
                  </BoxR>
                )
              )}
            />





           {/*  <ScrollView>
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
            </ScrollView> */}
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
