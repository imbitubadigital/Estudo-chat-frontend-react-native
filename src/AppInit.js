import React, { Component } from 'react';

import { connect } from 'react-redux';

import Routes from './routes';
import NavigationService from './services/navigation';

class AppInit extends Component {
  registerService = (ref) => {
    NavigationService.setTopLevelNavigation(ref);
  };

  render() {
    return <Routes ref={this.registerService} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(AppInit);
