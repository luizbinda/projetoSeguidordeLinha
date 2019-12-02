import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Container from '../../components/Container';
import { SubmitButton } from './styles';

export default class Menu extends Component {
  state = {
    token: this.props.location.state.token,
    redirect: false,
  };

  handleSubmit = async evt => {
    evt.preventDefault();
  };

  render() {
    const { redirect, token } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: '/menu', state: { token: token } }} />;
    } else {
      return (
        <>
          <SubmitButton
            onClick={() => {
              this.setState({
                pageToRedirect: '/',
                redirect: true,
              });
            }}
            style={{
              background: 'white',
              border: 0,
              padding: '15px 5px',
              marginLeft: '10px',
              borderRadius: ' 4px',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              width: '100px',
            }}
          >
            Voltar
          </SubmitButton>
          <Container>
            <h1>Logs</h1>
          </Container>
        </>
      );
    }
  }
}
