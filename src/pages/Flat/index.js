import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import InvertedFlatList from 'react-native-inverted-flat-list';

import { Box, Btn } from './styles';

export default class Flat extends Component {
  state = {
    refreshing: false,
    // NOTE: The messages should be in reverse order
    messages: [
      { id: '15', text: 'Me too!' },
      { id: '14', text: 'I am fine thanks! How are you?' },
      { id: '13', text: 'How is it going?' },
      { id: '12', text: 'Hey' },
      { id: '11', text: 'Hello' },
      { id: '10', text: 'Me too!' },
      { id: '9', text: 'I am fine thanks! How are you?' },
      { id: '8', text: 'How is it going?' },
      { id: '7', text: 'Hey' },
      { id: '6', text: 'Hello' },
      { id: '5', text: 'Me too!' },
      { id: '4', text: 'I am fine thanks! How are you?' },
      { id: '3', text: 'How is it going?' },
      { id: '2', text: 'Hey' },
      { id: '1', text: 'Hello' },
    ],
  };

  handleSub = () => {
    const teste = { id: '16', text: 'PERSONAL' };
    const { messages } = this.state;
    this.setState({ messages: [teste, ...messages] });
  }

  onPullToRefresh = () => {
    const { refreshing, messages } = this.state;

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

  render() {
    const { messages, refreshing } = this.state;
    return (
      <>
        <InvertedFlatList
        refreshing={refreshing} // required
        data={messages} // required
        keyExtractor={item => item.id} // required
        onPullToRefresh={this.onPullToRefresh}
        renderItem={({ item }) => ( // required
          <Box>
            <Text>{item.id} - {item.text}</Text>
          </Box>
        )}
      />
        {refreshing && <ActivityIndicator />}

        <Btn onPress={() => this.handleSub()}>
        <Text>Enviar</Text>
      </Btn>
      </>
    );
  }
}
