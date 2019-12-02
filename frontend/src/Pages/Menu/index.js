import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Container from '../../components/Container';
import { Form, SubmitButton } from './styles';

export default class Menu extends Component {
  state = {
    token: this.props.location.state.token,
    redirect: false,
    pageToRedirect: '',
  };

  handleSubmit = async evt => {
    evt.preventDefault();
  };

  render() {
    const { redirect, token, pageToRedirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{ pathname: `${pageToRedirect}`, state: { token: token } }}
        />
      );
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
            <h1>Menu</h1>
            <Form>
              <SubmitButton
                onClick={() => {
                  this.setState({
                    pageToRedirect: '/calibracao',
                    redirect: true,
                  });
                }}
                style={{
                  marginTop: 25,
                }}
              >
                Calibração
              </SubmitButton>
              <SubmitButton
                onClick={() => {
                  this.setState({
                    pageToRedirect: '/logs',
                    redirect: true,
                  });
                }}
                style={{
                  marginTop: 25,
                }}
              >
                Logs
              </SubmitButton>
            </Form>
          </Container>
        </>
      );
    }
  }
}
