import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import chat from '~/images/chat.png';
import { TouchableOpacity, Text } from 'react-native';
import Sound from 'react-native-sound';


import {
  Container, BoxIconMenu, BoxLogo, Title, Logo,
} from './styles';

const som = 'https://testeapp4444.s3-sa-east-1.amazonaws.com/som.mp3';

Sound.setCategory('Playback');
export default class Home extends Component {
  state = {};

  playSong = () => {
    console.tron.log('aquii');
    const whoosh = new Sound(som, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.tron.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
     // console.tron.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.tron.log('tocou');
        } else {
          console.tron.log('playback failed due to audio decoding errors');
        }
      });
    });

  //  whoosh.setVolume(0.5);
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <BoxIconMenu>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="bars" size={32} color="#7CCCE5" />
          </TouchableOpacity>
        </BoxIconMenu>
        <BoxLogo>
          <Title>ESTUDO CHAT</Title>
          <TouchableOpacity onPress={() => this.playSong()}>
            <Text>Tocar</Text>
          </TouchableOpacity>
          <Logo source={chat} />
        </BoxLogo>
      </Container>
    );
  }
}
