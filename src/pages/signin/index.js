import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, TouchableOpacity, View } from 'react-native';

import { Input, Text, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  ContainerMain,
  BoxLogo,
  Logo,
  CustonItem,
  CustonButton,
  SignUpLink,
  SignUpLinkText,
} from './styles';
import logo from '~/images/chat.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';
import MessageActions from '~/store/ducks/message';

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
    auth: PropTypes.shape({
      isLogged: PropTypes.bool,
      loader: PropTypes.bool,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleRecoveryPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Recovery');
  };

  handleCreateAccountPress = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    const { email, password } = this.state;
    const { signInRequest, setMessage } = this.props;
    if (email === '' || password === '') {
      setMessage('Informe seu e-mail e senha para entrar!', 'w');
    } else {
      signInRequest(email, password);
    }
  };

  render() {
    const { email, password } = this.state;
    const { navigation, auth: { loader } } = this.props;
    return (
      <ContainerMain>
        <StatusBar hidden />
        <BoxLogo>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-left" size={18} color="#fff" />
          </TouchableOpacity>
          <Logo source={logo} resizeMode="contain" />
          <View />
        </BoxLogo>
        <CustonItem rounded>
          <Icon name="envelope-open" size={22} color="#999" />
          <Input
            placeholder="Seu e-mail"
            value={email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </CustonItem>
        <CustonItem rounded>
          <Icon name="lock" size={22} color="#999" />
          <Input
            placeholder="Sua senha"
            secureTextEntry
            value={password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </CustonItem>
        {loader ? (
          <CustonButton rounded block onPress={() => {}}>
            <Spinner color="#fff" />
          </CustonButton>
        ) : (
          <CustonButton rounded block onPress={this.handleSignInPress}>
            <Text>Entrar</Text>
          </CustonButton>
        )}

        <SignUpLink onPress={this.handleRecoveryPress}>
          <SignUpLinkText>Esqueceu sua senha?</SignUpLinkText>
        </SignUpLink>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Ainda não tem conta? Cadastre-se agora!</SignUpLinkText>
        </SignUpLink>
      </ContainerMain>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...AuthActions,
    ...MessageActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
