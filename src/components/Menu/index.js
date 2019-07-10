import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import perfil from '~/images/perfil-default.png';

import {
  Container,
  Title,
  TopLinks,
  BoxImg,
  Img,
  BottomLinks,
  TextLinks,
  BoxBottom,
  TextBtnBottom,
  BtnLink,
  BoxLink,
  TextOff,
} from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';
import ProfileActions from '~/store/ducks/profile';
import MessageActions from '~/store/ducks/message';

class Menu extends Component {
  static propTypes = {
    logoutRequest: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    auth: PropTypes.shape({
      isLogged: PropTypes.bool,
      loader: PropTypes.bool,
      data: PropTypes.PropTypes.shape({
        id: PropTypes.number,
        avatarUrl: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
        username: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
        lastname: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      }),
    }).isRequired,
    profile: PropTypes.shape({
      data: PropTypes.PropTypes.shape({
        id: PropTypes.number,
        avatarUrl: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
        username: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
        lastname: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      }),
    }).isRequired,
  };

  navLinks = (nav, text, icon) => {
    const { navigation } = this.props;
    return (
      <BtnLink onPress={() => {
        navigation.navigate(nav);
        navigation.closeDrawer();
      }}
      >
        <BoxLink>
          <Icon name={icon} size={28} />
          <TextLinks>{text}</TextLinks>
        </BoxLink>
      </BtnLink>
    );
  };

  navOff = (text, icon) => {
    const { setMessage } = this.props;
    return (
      <BtnLink onPress={() => setMessage(`Para acessar "${text}" você precisa estar logado!`, 'w')}>
        <BoxLink>
          <Icon name={icon} size={28} color="#bdbebd" />
          <TextOff>{text}</TextOff>
        </BoxLink>
      </BtnLink>
    );
  };

  setUsername = () => {
    const { auth: { user }, profile } = this.props;
    let nameUser = '';
    if (profile.data) {
      nameUser = `${profile.data.username} ${profile.data.lastname}`;
    } else if (user) {
      nameUser = `${user.username} ${user.lastname}`;
    } else {
      nameUser = '';
    }
    return <Title>{nameUser}</Title>;
  }

  setAvatarMenu = () => {
    const { auth: { user }, profile } = this.props;
    let avatar = perfil;
    if (profile.data && profile.data.avatarUrl !== null && profile.data.avatarUrl !== '') {
      avatar = { uri: profile.data.avatarUrl };
    } else if (user && user.avatarUrl !== null && user.avatarUrl !== '') {
      avatar = { uri: user.avatarUrl };
    } else {
      avatar = perfil;
    }
    return <Img source={avatar} />;
  }

  redirectPerfil = () => {
    const { navigation } = this.props;
    navigation.navigate('Perfil');
  }

  render() {
    const { logoutRequest, navigation, auth: { isLogged } } = this.props;

    return (
      <Container>
        <TopLinks>
          <BoxImg onPress={() => navigation.navigate('SignUp')}>
            <Img source={perfil} />
            <Title>Cadastre-se</Title>
          </BoxImg>
        </TopLinks>
        <ScrollView>
          <BottomLinks>
            {this.navLinks('Home', 'Home', 'home')}
            {isLogged ? this.navLinks('Products', 'Produtos', 'product-hunt') : this.navOff('Produtos', 'product-hunt')}
            {isLogged ? this.navLinks('Called', 'Chamados', 'bullhorn') : this.navOff('Chamados', 'bullhorn')}

            {isLogged ? this.navLinks('Message', 'Conversas', 'comments') : this.navOff('Conversas', 'comments')}
            {isLogged ? this.navLinks('Modelo', 'Modelo', 'id-card') : this.navOff('Modelo', 'comments')}
            {isLogged ? (
              <BoxBottom onPress={() => logoutRequest()}>
                <TextBtnBottom>Sair</TextBtnBottom>
              </BoxBottom>
            ) : (
              <BoxBottom onPress={() => navigation.navigate('SignIn')}>
                <TextBtnBottom>Logar</TextBtnBottom>
              </BoxBottom>
            )}
          </BottomLinks>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  users: state.avatar,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...AuthActions,
    ...ProfileActions,
    ...MessageActions,
  }, dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
